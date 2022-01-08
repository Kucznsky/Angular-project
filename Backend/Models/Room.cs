using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Room
    {
        [Key]
        public int ID { get; set; }
        public int Capacity { get; set; }
    }
}