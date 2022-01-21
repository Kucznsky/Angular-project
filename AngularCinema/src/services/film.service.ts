import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, Subject, BehaviorSubject } from 'rxjs';
import { IFilm } from 'src/models/IFilm';

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
export class FilmService {

  // private films: IFilm[] = []
  private films_Subject: BehaviorSubject<IFilm[]> = new BehaviorSubject<IFilm[]>([])
  private wasDataFetched: boolean = false
  // public get Films(): IFilm[] { return this.films }

  constructor(private _http: HttpClient) { }

  public getFilms(): Observable<IFilm[]> {
    if (!this.wasDataFetched) {
      this.fetchFilms()
      this.wasDataFetched = true
    }
    return this.films_Subject;
  }
  private fetchFilms(): void {
    this._http.get<IFilm[]>(`${ApiURL}Films`, Credentials).subscribe(
      response => { console.log("Fetched films off of API:", response); this.films_Subject.next(response) },
      error => console.error(error)
    )
  }
  public getFilm(id: number): Observable<IFilm> {
    // If film is loaded locally, serve it.
    let result: IFilm | undefined
    if(this.wasDataFetched && (result = this.films_Subject.value.find(item => item.id == id)) != undefined)
      return new Observable(subscriber => subscriber.next(result))

    // Otherwise try to get it off of API.
    return this._http.get<IFilm>(`${ApiURL}Film/${id}`, Credentials)
        .pipe(tap(fetch => console.log("Fetched movie off of API: ", fetch)))
  }
  public getList(ids: number[]): Observable<IFilm> {
    return this._http.get<IFilm>(`${ApiURL}Film/List`, Object.assign(Credentials, { body: ids }))
  }
  public postFilms(films: IFilm[]): void {
    this._http.post(`${ApiURL}Films`, films, Credentials).subscribe(
      success => { this.films_Subject.next([...this.films_Subject.value, ...<IFilm[]>success]); console.log("Successfully posted new film!", success) },
      error => console.error(error)
    )
  }
  private updateFilm(film: IFilm) {
    this.films_Subject.value[this.films_Subject.value.findIndex(item => item.id == film.id)]=film
    this.films_Subject.next(this.films_Subject.value);
  }
  public putFilm(film: IFilm): void {
    this._http.put(`${ApiURL}Films`, film, Credentials).subscribe(
      success => {
          this.updateFilm(<IFilm>success);
          console.log("Successfully put updated film!", success) },
      error => console.error(error)
    )
  }
  public deleteFilm(id: number): void {
    this._http.delete(`${ApiURL}Films?index=${id}`, Credentials).subscribe(
      success => {
          console.log("Successfully deleted film!", success);
          this.films_Subject.value.splice(this.films_Subject.value.findIndex(item => item.id == id), 1);
          this.films_Subject.next(this.films_Subject.value) },
      error => console.error(error)
    )
  }

  public getFilm_Popularity(days: Date[]): Observable<[Date, number][]> {
    // return this._http.get<number>(`${ApiURL}Films/FilmPopularity?day=${day}`, Credentials)
    return this._http.get<[Date, number][]>(`${ApiURL}Films/FilmPopularity/list`, Object.assign(Credentials, { body: days }))
  }
}


