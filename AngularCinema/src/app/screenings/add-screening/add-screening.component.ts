import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilm } from 'src/models/IFilm';
import { FilmService } from 'src/services/film.service';
import { IRoom } from 'src/models/IRoom';
import { RoomService } from 'src/services/room.service';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.scss']
})
export class AddScreeningComponent implements OnInit {

  film: IFilm | undefined
  filmOptions: IFilm[] = []
  roomOptions: IRoom[] = []

  formGroup: FormGroup

  constructor(
      private _filmService: FilmService,
      private _roomService: RoomService,
      // private _formBuilder: FormBuilder,
    ) {
    // this.film = { id: 1, title: "TITle", screeningTime: 120, isShowing: true }
    this.formGroup = new FormGroup({
      film: new FormControl(this.film?.id, Validators.required),
      room: new FormControl(null, Validators.required),
      beginsAt: new FormGroup({
        date: new FormControl(null, Validators.required),
        // date: this._formBuilder.control(''),
        hour: new FormControl(null, Validators.required),
      })
    })
  }

  ngOnInit(): void {
    this.fetchFilms()
    this.fetchRooms()
  }

  fetchFilms(): void {
    this._filmService.getFilms().subscribe(
      response => this.filmOptions = response,
      error => console.error(error)
    )
  }
  fetchRooms(): void {
    this._roomService.getRooms().subscribe(
      response => { console.log("Fetched rooms off of API:", response); this.roomOptions = response },
      error => console.error(error)
    )
  }

  onSubmit(): void {
    console.warn("Clicked submit!")
  }
}
