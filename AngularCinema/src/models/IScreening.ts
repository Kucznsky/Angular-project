import { IFilm } from "./IFilm";
import { IRoom } from "./IRoom";

export interface IScreening {
  id: number
  filmID: number
  film: IFilm
  roomID: number
  room: IRoom
  soldTickets: number
  beginsAt: Date
  
        // public int ID { get; set; }
        // public int FilmID { get; set; }
        // public int RoomID { get; set; }
        // public int SoldTickets { get; set; }
        // // public ICollection<int> TakenSeats { get; set; }

        // public DateTime BeginsAt { get; set; }
}