using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilmsController : ControllerBase
    {
        private readonly ILogger<FilmsController> _logger;
        private readonly AppDBContext _context;

        public FilmsController(ILogger<FilmsController> logger, AppDBContext context)
            => (_logger, _context) = (logger, context);

        [HttpGet]
        public IEnumerable<Film> GetAll()
        {
            // throw new NotImplementedException();
            return _context.Films.Where(film => film.IsShowing);
            // return _context.Films.
        }
        [HttpGet("/Film/{index}")]
        public Film Get(int index)
        {
            return _context.Films.Find(index);
        }
        // Pseudo GraphQL
        [HttpPost("List")]
        public ActionResult<IEnumerable<Film>> GetList([FromBody] IEnumerable<int> filmsToFetch)
        {
            filmsToFetch ??= new List<int>();
            // Remove duplicates.
            filmsToFetch = new HashSet<int>(filmsToFetch);

            HashSet<Film> result = new();
            foreach (int id in filmsToFetch)
                result.Add(_context.Films.Find(id));
            result.Remove(null);

            return Ok(result);
        }
        [HttpPost]
        public ActionResult<IEnumerable<Film>> AddRange([FromBody] IEnumerable<Film> films)
        {
            if (films is null || films.Any() is false)
                return BadRequest(new ArgumentNullException("There was no films provided to add to database."));


            // Filter invalid screenings.
            // var screenings_filtered = films.Where(item =>
            //                 _context.Rooms.Find(item.RoomID) is not null
            //                 && _context.Films.Find(item.FilmID) is not null);


            _context.AddRange(films);
            _context.SaveChanges();

            // return Ok($"Added {screenings_filtered.Count()} out of {screenings.Count()} screenings.");
            return Ok(films);
        }
        [HttpPost("DEBUG")]
        public void PostDebug()
        {
            _context.Films.Add(new Film { Title = "DEBUG", ScreeningTime = 1337 });
            _context.SaveChanges();
        }


        [HttpPut]
        public ActionResult<Film> Update([FromBody] Film film)
        {
            if (film is null)
                return BadRequest(new ArgumentNullException("There is no film provided to update."));

            var filmToUpdate = _context.Films.Find(film.ID);
            if (filmToUpdate is null)
                return BadRequest(new NullReferenceException($"There is no film with given id in database (id: {film.ID})"));

            // TODO: Do we add checks for if film's screenings overlap with other film's screenings?
            //  We could also solve it not allowing to change screening time of films.
            filmToUpdate.ScreeningTime = film.ScreeningTime;
            filmToUpdate.Title = film.Title;
            _context.SaveChanges();

            return Ok(filmToUpdate);
        }

        [HttpDelete]
        public ActionResult Delete(int index)
        {
            var film = _context.Films.Find(index);
            if (film is null)
                return NotFound(new ArgumentException("There is no film with this ID."));

            film.IsShowing = false;
            _context.SaveChanges();

            // Clean up database:
            // var screenings = _context.Screenings.Where(item => item.FilmID == film.ID);

            return Ok();
        }

        [HttpGet("FilmPopularity")]
        public ActionResult<int> GetPopularity(DateTime? day)
        {
            if (day.HasValue is false)
                return BadRequest(new ArgumentNullException("You have to provide viable day as argument."));

            var screeningsThatDay = _context.Screenings.Where(item => item.BeginsAt.Date == day.Value.Date);

            return screeningsThatDay.AsEnumerable().Aggregate(0, (sum, item) => sum + item.SoldTickets);
        }
        [HttpPost("FilmPopularity/list")]
        public ActionResult<ICollection<(DateTime day, int popularity)>> GetPopularityList([FromBody] IEnumerable<DateTime> days)
        {
            if (days is null)
                return BadRequest(new ArgumentNullException("You have to provide viable day as argument."));

            List<(DateTime day, int popularity)> result = new();
            foreach (var day in days)
            {
                var screeningsThatDay = _context.Screenings.Where(item => item.BeginsAt.Date == day.Date).AsEnumerable();
                int popularity = screeningsThatDay.Aggregate(0, (sum, item) => sum + item.SoldTickets);
                result.Add((day, popularity));
            }
            return Ok(result);
        }
    }
}
