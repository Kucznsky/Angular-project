import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRoom } from 'src/models/IRoom';

const ApiURL: string = "localhost:4200/api/"
const Credentials = {
    mode: 'cors',
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  })}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private _http: HttpClient) { }

  public getRooms(): Observable<IRoom[]> {
    console.warn("DEBUG: Using mock-ups")
    return new Observable( function subscribe(subscriber){ subscriber.next([{id: 1, capacity: 60}, {id: 2, capacity: 120}]) })
    return this._http.get<IRoom[]>(`${ApiURL}Rooms`);
  }
  public getRoom(id: number): Observable<IRoom> {
    console.warn("DEBUG: Using mock-ups")
    return new Observable( function subscribe(subscriber){ subscriber.next({id: 1, capacity: 60}) })
    return this._http.get<IRoom>(
        `${ApiURL}Room/${id}`,
        Credentials);
  }

  public getRooms_CORS(): Observable<IRoom[]> {
    return this._http.get<IRoom[]>(`${ApiURL}Rooms`, Credentials);
  }
}
