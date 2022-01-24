import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilm } from 'src/models/IFilm';
import { FilmService } from 'src/services/film.service';
import { IRoom } from 'src/models/IRoom';
import { RoomService } from 'src/services/room.service';
import { IScreening_beginsAt_date_Validator } from 'src/models/IScreening'
import { ScreeningService } from 'src/services/screening.service';
import { IFilmPopularity } from 'src/models/IFilmPopularity';

@Component({
  selector: 'app-popularity',
  templateUrl: './popularity.component.html',
  styleUrls: ['./popularity.component.scss']
})
export class PopularityComponent implements OnInit {

  formGroup: FormGroup
  filmOptions: IFilm[] = []
  popularity: IFilmPopularity[] = []

  constructor(private _filmService: FilmService) {
    this.formGroup = new FormGroup({
      film: new FormControl(null, Validators.required),
      // day: new FormControl(null, Validators.required)
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required)
    })
    this.fetchFilms()
  }

  ngOnInit(): void {
  }

  fetchFilms(): void {
    this._filmService.getFilms().subscribe(
      response => this.filmOptions = response,
      error => console.error(error)
    )
  }

  get isInvalid() {
    return this.formGroup.invalid
  }
  onSubmit(): void {
    if(this.formGroup.invalid)
      return;
    
    // let days = [new Date(this.formGroup.value.day)]
    var getDaysArray = (start:Date, end:Date) => {
      for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
    };
    let days = getDaysArray(new Date(this.formGroup.value.start), new Date(this.formGroup.value.end))
    let filmID = this.formGroup.value.film
    this._filmService.getFilm_Popularity(filmID, days).subscribe(
      response => this.popularity = response,
      error => console.error(error)
    )
  }
}
