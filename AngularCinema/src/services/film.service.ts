import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilm } from 'src/models/IFilm';

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
export class FilmService {

  constructor(private _http: HttpClient) { }

  public getFilms(): Observable<IFilm[]> {
    console.warn("DEBUG: Using mock-ups")
    return new Observable( function subscribe(subscriber){ subscriber.next([
            { id: 1, title: "Motywacja", screeningTime: 600, isShowing: true },
            { id: 2, title: "The Room", screeningTime: 120, isShowing: true },
          ]) })
    return this._http.get<IFilm[]>(`${ApiURL}Films`, Credentials)
  }
  public getFilm(id: number): Observable<IFilm> {
    return this._http.get<IFilm>(`${ApiURL}Film/${id}`, Credentials)
  }
  public getList(ids: number[]): Observable<IFilm> {
    return this._http.get<IFilm>(`${ApiURL}Film/List`, Object.assign(Credentials, { body: ids }))
  }
  public postFilms(films: IFilm[]): Observable<object> {
    return this._http.post(`${ApiURL}Film/List`, films, Credentials)
  }
  public putFilms(film: IFilm): Observable<object> {
    return this._http.put(`${ApiURL}Films`, film, Credentials)
  }
  public deleteFilm(id: number): Observable<object> {
    return this._http.delete(`${ApiURL}Films?index=${id}`, Credentials)
  }

  public getFilm_Popularity(day: Date): Observable<number> {
    return this._http.get<number>(`${ApiURL}Films/FilmPopularity?day=${day}`, Credentials)
  }
}
