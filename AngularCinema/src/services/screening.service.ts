import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, BehaviorSubject } from 'rxjs';
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

  private screenings_Subject: BehaviorSubject<IScreening[]> = new BehaviorSubject<IScreening[]>([])
  private wasDataFetched: boolean = false

  constructor(private _http: HttpClient) { }

  private fetchScreenings(): void {
    this._http.get<IScreening[]>(`${ApiURL}Screenings`, Credentials).subscribe(
      response => { console.log("Fetched screenings off of API:", response); this.screenings_Subject.next(response) },
      error => console.error(error)
    )
  }

  public getScreenings(): Observable<IScreening[]> {
    if (!this.wasDataFetched) {
      this.fetchScreenings()
      this.wasDataFetched = true
    }
    return this.screenings_Subject;
  }
  public getScreening(id: number): Observable<IScreening> {
    // If film is loaded locally, serve it.
    let result: IScreening | undefined
    if(this.wasDataFetched && (result = this.screenings_Subject.value.find(item => item.id == id)) != undefined)
      return new Observable(subscriber => subscriber.next(result))

    // Otherwise try to get it off of API.
    
    return this._http.get<IScreening>(`${ApiURL}Screening/${id}`, Credentials)
        .pipe(tap(fetch => console.log("Fetched screening off of API: ", fetch)))
  }
  public getFilmScreenings(filmID: number): Observable<IScreening[]> {
    return this._http.get<IScreening[]>(
      `${ApiURL}FilmScreenings/${filmID}`,
      Credentials)
  }
  public postScreenings(screenings: IScreening[]): void {
    this._http.post(`${ApiURL}Screenings`, screenings, Credentials).subscribe(
      success => { this.screenings_Subject.next([...this.screenings_Subject.value, ...<IScreening[]>success]); console.log("Successfully posted new screening!", success) },
      error => console.error(error)
    )
  }

  public updateScreening(screening: IScreening): void {
    this.screenings_Subject.value[this.screenings_Subject.value.findIndex(item => item.id == screening.id)]=screening
    this.screenings_Subject.next(this.screenings_Subject.value);
  }
  public putScreening(screening: IScreening): void {
    this._http.put(`${ApiURL}Screenings`, screening, Credentials).subscribe(
      success => { 
          this.updateScreening(<IScreening>success);
          console.log("Successfully put updated screening!", success) },
      error => console.error(error)
    )
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
