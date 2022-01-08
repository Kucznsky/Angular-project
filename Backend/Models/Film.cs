using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Film
    {
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        // In minutes.
        public int ScreeningTime { get; set; }

        public bool IsShowing { get; set; }

        public Film()
        {
            IsShowing = true;
        }
    }
}