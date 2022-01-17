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
}