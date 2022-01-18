import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRoom } from 'src/models/IRoom';

// const ApiURL: string = "localhost:4200/api/"
const ApiURL: string = "https://localhost:5001/"
const Credentials = {
    mode: 'cors',
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  })}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms_Subject: BehaviorSubject<IRoom[]> = new BehaviorSubject<IRoom[]>([])
  private wasDataFetched: boolean = false

  constructor(private _http: HttpClient) { }

  private fetchRooms(): void {
    this._http.get<IRoom[]>(`${ApiURL}Rooms`, Credentials).subscribe(
      response => { console.log("Fetched rooms off of API:", response); this.rooms_Subject.next(response) },
      error => console.error(error)
    )
  }
  public getRooms(): Observable<IRoom[]> {
    if (!this.wasDataFetched) {
      this.fetchRooms()
      this.wasDataFetched = true
    }
    return this.rooms_Subject;
  }
  public getRoom(id: number): Observable<IRoom> {
    // If film is loaded locally, serve it.
    let result: IRoom | undefined
    if(this.wasDataFetched && (result = this.rooms_Subject.value.find(item => item.id == id)) != undefined)
      return new Observable(subscriber => subscriber.next(result))

    // Otherwise try to get it off of API.
    return this._http.get<IRoom>(`${ApiURL}Room/${id}`, Credentials)
  }
}
