using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Screening
    {
        [Key]
        public int ID { get; set; }
        public int FilmID { get; set; }
        public virtual Film Film { get; set; }
        public int RoomID { get; set; }
        public virtual Room Room { get; set; }
        public int SoldTickets { get; set; }
        // public ICollection<int> TakenSeats { get; set; }

        public DateTime BeginsAt { get; set; }
    }
}