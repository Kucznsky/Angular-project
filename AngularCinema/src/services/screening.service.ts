import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class ScreeningService {

  constructor(private _http: HttpClient) { }

  public getScreenings(): Observable<IScreening[]> {
    // console.warn("DEBUG: Using mock-ups")
    // return new Observable( function subscribe(subscriber){ subscriber.next([
    //         {id: 1, filmID: 1, film: { id: 1, title: "Motywacja", screeningTime: 600, isShowing: true }, roomID: 1, room: { id: 1, capacity: 60 }, soldTickets: 0, beginsAt: new Date(2022, 2, 1) },
    //         {id: 2, filmID: 2, film: { id: 2, title: "The Room", screeningTime: 120, isShowing: true }, roomID: 1, room: { id: 1, capacity: 60 }, soldTickets: 0, beginsAt: new Date(2022, 3, 1) }
    //       ]) })
    return this._http.get<IScreening[]>(`${ApiURL}Screenings`)
  }
  public getScreening(id: number): Observable<IScreening> {
    // console.warn("DEBUG: Using mock-ups")
    // return new Observable( function subscribe(subscriber){ subscriber.next(
    //   {id: id, filmID: 1, roomID: 1, soldTickets: 0, beginsAt: new Date(2022, 3, 1) }
    // ) })
    return this._http.get<IScreening>(
        `${ApiURL}Screening/${id}`,
        Credentials)
  }
  public getFilmScreenings(filmID: number): Observable<IScreening[]> {
    return this._http.get<IScreening[]>(
      `${ApiURL}FilmScreenings/${filmID}`,
      Credentials)
  }
  public postScreenings(screenings: IScreening[]): Observable<object> {
    return this._http.post(
      `${ApiURL}Screenings`,
      screenings,
      Credentials)
  }
  public putScreening(screenings: IScreening): Observable<object> {
    return this._http.put(
      `${ApiURL}Screenings`,
      screenings,
      Credentials)
  }

  public getScreenings_InDay(day: Date): Observable<IScreening[]> {
    return this._http.get<IScreening[]>(
      `${ApiURL}Screenings/ScreeningsInDay?day=${day}`,
      Credentials)
  }
  public getScreenings_Now(): Observable<IScreening[]> {
    return this._http.get<IScreening[]>(
      `${ApiURL}Screenings/ScreeningNow`,
      Credentials)
  }
}
