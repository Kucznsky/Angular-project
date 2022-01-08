using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    // [EnableCors]
    public class RoomsController : ControllerBase
    {
        private readonly ILogger<RoomsController> _logger;
        private readonly AppDBContext _context;

        public RoomsController(ILogger<RoomsController> logger, AppDBContext context)
            => (_logger, _context) = (logger, context);

        [HttpGet]
        public IEnumerable<Room> GetAll()
        {
            return _context.Rooms;
        }
        [HttpGet("/Room/{index}")]
        public Room Get(int index)
        {
            return _context.Rooms.Find(index);
        }

        [HttpGet("DEBUG/Mock_types")]
        public IEnumerable<object> DEBUG_MockGet_Types()
        {
            return new List<object> { new { ID = "It's a string", Capacity = 420 } };
        }
    }
}
