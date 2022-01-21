import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilm } from 'src/models/IFilm';
import { FilmService } from 'src/services/film.service';
import { IRoom } from 'src/models/IRoom';
import { RoomService } from 'src/services/room.service';
import { IScreening_beginsAt_Validator } from 'src/models/IScreening'
import { ScreeningService } from 'src/services/screening.service';

@Component({
  selector: 'app-popularity',
  templateUrl: './popularity.component.html',
  styleUrls: ['./popularity.component.scss']
})
export class PopularityComponent implements OnInit {

  formGroup: FormGroup
  popularity: [Date, number][] = []

  constructor(private _filmService: FilmService) {
    this.formGroup = new FormGroup({
      day: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  get isInvalid() {
    return this.formGroup.invalid
  }
  onSubmit(): void {
    if(this.formGroup.invalid)
      return;
    
    let days = [this.formGroup.value.day]
    this._filmService.getFilm_Popularity(days).subscribe(
      response => this.popularity = response,
      error => console.error(error)
    )
  }
}
