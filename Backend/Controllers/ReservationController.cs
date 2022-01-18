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
    public class ReservationController : ControllerBase
    {
        private readonly ILogger<ReservationController> _logger;
        private readonly AppDBContext _context;

        public ReservationController(ILogger<ReservationController> logger, AppDBContext context)
            => (_logger, _context) = (logger, context);

        /// <summary>
        /// Gets all reserved seats for given screening.
        /// </summary>
        /// <returns></returns>
        [HttpGet("{index}")]
        public IEnumerable<short> GetAllTakenSeats(int index)
        {
            return _context.TakenSeats
                    .Where(seat => seat.ScreeningID == index)
                    .Select(seat => seat.SeatID);
        }
        [HttpGet("{index}/free")]
        public IEnumerable<short> GetAllFreeSeats(int index)
        {
            int roomCapacity = _context.Rooms.Find(_context.Screenings.Find(index).RoomID).Capacity;
            HashSet<short> takenSeats = new(GetAllTakenSeats(index));
            return Enumerable.Range(1, roomCapacity)
                    .Where(seat => takenSeats.Contains((short)seat) is false)
                    .Select(num => (short)num);
        }

        [HttpPost]
        public ActionResult<Screening> PostReservation(int? screeningID, short? seatNum)
        {
            if (screeningID.HasValue is false)
                return BadRequest(new ArgumentException("Expected value for screening parameter."));
            if (seatNum.HasValue is false)
                return BadRequest(new ArgumentException("Expected value for seat parameter."));

            var screening = _context.Screenings.Find(screeningID);
            if (screening is null)
                return NotFound(new NullReferenceException($"There is no screening with id: {screeningID}"));
            if (screening.BeginsAt <= DateTime.Now)
                return BadRequest($"Requested reservation was for already started screening (screening started at: {screening.BeginsAt})");

            var room = _context.Rooms.Find(screening.RoomID);
            if (screening.SoldTickets >= room.Capacity)
                return BadRequest("Tickets are already sold!");

            var film = _context.Films.Find(screening.FilmID);
            if (film.IsShowing is false)
                return BadRequest("Screening of requested film was put off listings.");

            var takenSeat = _context.TakenSeats.Find(screeningID, seatNum);
            if (takenSeat is not null)
                return BadRequest("Chosen seat is already taken.");


            _context.TakenSeats.Add(new TakenSeat(screeningID.Value, seatNum.Value));
            screening.SoldTickets++;
            _context.SaveChanges();
            return Ok(screening);
        }
    }
}
