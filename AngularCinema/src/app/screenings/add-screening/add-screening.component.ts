import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilm } from 'src/models/IFilm';
import { FilmService } from 'src/services/film.service';
import { IRoom } from 'src/models/IRoom';
import { RoomService } from 'src/services/room.service';
import { IScreening_beginsAt_date_Validator, IScreening_beginsAt_time_Validator } from 'src/models/IScreening'
import { ScreeningService } from 'src/services/screening.service';

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
      private _screeningService: ScreeningService,
      // private _formBuilder: FormBuilder,
    ) {
    // this.film = { id: 1, title: "TITle", screeningTime: 120, isShowing: true }
    this.film = history.state.data?.film
    this.formGroup = new FormGroup({
      film: new FormControl(this.film?.id, Validators.required),
      room: new FormControl(null, Validators.required),
      beginsAt_date: new FormControl(null, [Validators.required, IScreening_beginsAt_date_Validator()]),
      beginsAt_time: new FormControl(null, [Validators.required, IScreening_beginsAt_time_Validator()]),
      // beginsAt: new FormGroup({
      //   // date: this._formBuilder.control(''),
      // })
    })
  }

  ngOnInit(): void {
    this.fetchFilms()
    this.fetchRooms()
  }

  get isInvalid() {
    return this.formGroup.invalid
  }

  fetchFilms(): void {
    this._filmService.getFilms().subscribe(
      response => this.filmOptions = response,
      error => console.error(error)
    )
  }
  fetchRooms(): void {
    this._roomService.getRooms().subscribe(
      response => this.roomOptions = response,
      error => console.error(error)
    )
  }

  onSubmit(): void {
    if(this.formGroup.invalid)
      return;

    let film = this.filmOptions.find(item => item.id == this.formGroup.value.film)
    let room = this.formGroup.value.room
    let beginsAt = new Date(`${this.formGroup.value.beginsAt_date} ${this.formGroup.value.beginsAt_time}`)

    this._screeningService.postScreenings([{
        id: 0,
        filmID: film!.id,
        film: film!,
        roomID: room.id,
        room: room,
        soldTickets: 0,
        beginsAt: beginsAt
      }])

    history.back()
  }
}
