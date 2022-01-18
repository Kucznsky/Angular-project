import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreeningService } from './screening.service';
import { IScreening } from 'src/models/IScreening';

const ApiURL: string = "https://localhost:5001/"
const Credentials = {
    mode: 'cors',
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  })}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private _http: HttpClient, private _screeningService: ScreeningService) { }

  getAllTakenSeats(screeningID: number): Observable<number[]> {
    return this._http.get<number[]>(`${ApiURL}Reservation/${screeningID}`, Credentials)
  }
  getAllFreeSeats(screeningID: number): Observable<number[]> {
    return this._http.get<number[]>(`${ApiURL}Reservation/${screeningID}/free`, Credentials)
  }
  postReservation(screeningID: number, seatNum: number): void {
    this._http.post(`${ApiURL}Reservation?screeningID=${screeningID}&seatNum=${seatNum}`, null, Credentials).subscribe(
      success => {
          this._screeningService.updateScreening(<IScreening>success);
          console.log("Posted reservation for screening: ", success, "and seat:", seatNum) },
      error => console.error(error)
    )
  }
}
