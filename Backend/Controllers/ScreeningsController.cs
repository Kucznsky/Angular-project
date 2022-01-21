using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScreeningsController : ControllerBase
    {
        private readonly ILogger<ScreeningsController> _logger;
        private readonly AppDBContext _context;

        public ScreeningsController(ILogger<ScreeningsController> logger, AppDBContext context)
            => (_logger, _context) = (logger, context);

        [HttpGet]
        public IEnumerable<Screening> GetAll()
        {
            return _context.Screenings
                .Where(item => item.BeginsAt > DateTime.Now)
                .Include(item => item.Film)
                .Include(item => item.Room);
        }
        [HttpGet("/Screening/{index}")]
        public Screening Get(int index)
        {
            return _context.Screenings.Where(item => item.ID == index)
                    .Include(item => item.Film)
                    .Include(item => item.Room)
                    .First();
        }
        [HttpGet("/FilmScreenings/{filmID}")]
        public IEnumerable<Screening> GetFilmScreenings(int filmID)
        {
            return _context.Screenings
                    .Where(screening => screening.FilmID == filmID && screening.BeginsAt > DateTime.Now);
        }

        [HttpPost]
        public ActionResult<IEnumerable<Screening>> AddRange([FromBody] IEnumerable<Screening> screenings)
        {
            if (screenings is null || screenings.Any() is false)
                return BadRequest(new ArgumentNullException("There was no screenings provided to add to database."));

            // Filter invalid screenings.
            var screenings_filtered = screenings.Where(item =>
                            _context.Rooms.Find(item.RoomID) is not null
                            && _context.Films.Find(item.FilmID) is not null);

            foreach (var screening in screenings_filtered)
            {
                screening.Film = null;
                screening.Room = null;
            }
            _context.AddRange(screenings_filtered);
            _context.SaveChanges();

            return Ok(screenings_filtered);
        }

        [HttpPut]
        public ActionResult<IEnumerable<Screening>> Update([FromBody] Screening screening)
        {
            if (screening is null)
                return BadRequest(new ArgumentNullException("There is no screening provided to update."));

            var screeningToUpdate = _context.Screenings.Find(screening.ID);
            if (screeningToUpdate is null)
                return NotFound(new NullReferenceException($"There is no screening with provided id: {screening.ID}"));
            if (_context.Films.Any(item => item.ID == screening.FilmID) is false)
                return NotFound(new NullReferenceException($"There is no film with provided id: {screening.FilmID}"));
            if (_context.Rooms.Any(item => item.ID == screening.RoomID) is false)
                return NotFound(new NullReferenceException($"There is no room with provided id: {screening.RoomID}"));

            screeningToUpdate.FilmID = screening.FilmID;
            screeningToUpdate.RoomID = screening.RoomID;
            _context.SaveChanges();

            return Ok(Get(screeningToUpdate.ID));
        }

        /// wyświetlanie seansów w danym dniu, wyświetlanie aktualnie trwających seansów (zaczynamy od bieżącego dnia i bieżącej godziny) - 2pkt

        // Gives list of screenings happening provided day.
        [HttpGet("ScreeningsInDay")]
        public ActionResult<IEnumerable<Screening>> GetByDay(DateTime? day)
        {
            if (day.HasValue is false)
                return BadRequest(new ArgumentNullException("You have to provide viable day as argument."));

            return Ok(_context.Screenings
                    .Where(item => item.BeginsAt.Date == day.Value.Date)
                    .Include(item => item.Film)
                    .Include(item => item.Room));
        }
        [HttpGet("ScreeningNow")]
        public IEnumerable<Screening> GetNow()
        {
            return _context.Screenings
                    .Include(item => item.Film)
                    .Include(item => item.Room)
                    .AsEnumerable()
                    .Where(item => item.BeginsAt > DateTime.Now
                            && (item.BeginsAt - new TimeSpan(0, _context.Films.Find(item.FilmID).ScreeningTime, 0)) < DateTime.Now);
        }

        [HttpPost("DEBUG_AddScreenings")]
        public ActionResult DEBUG_GetScreenings()
        {
            // var film = _context.Films.Find(1);
            // var room = _context.Rooms.Find(1);
            _context.AddRange(
                new List<Screening> {
                    new Screening { FilmID= 1, RoomID= 1, SoldTickets= 0, BeginsAt= DateTime.Now },
                    new Screening { FilmID= 1, RoomID= 1, SoldTickets= 0, BeginsAt= DateTime.Now + new TimeSpan(12, 0, 0) },
                    new Screening { FilmID= 1, RoomID= 1, SoldTickets= 0, BeginsAt= DateTime.Now + new TimeSpan(1, 6, 0, 0) },
                }.ToArray()
            );
            _context.SaveChanges();
            // return 
            return Ok();
        }
    }
}
