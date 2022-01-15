namespace Backend.Models
{
    public class TakenSeat
    {
        public int ScreeningID { get; set; }
        public virtual Screening Screening { get; set; }
        public short SeatID { get; set; }

        public TakenSeat()
            { }

        public TakenSeat(int screeningID, short seatID)
            => (ScreeningID, SeatID) = (screeningID, seatID);
    }
}