import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilm } from 'src/models/IFilm';
import { FilmService } from 'src/services/film.service';
import { IRoom } from 'src/models/IRoom';
import { RoomService } from 'src/services/room.service';
import { IScreening } from 'src/models/IScreening';
import { ScreeningService } from 'src/services/screening.service';

@Component({
  selector: 'app-edit-screening',
  templateUrl: './edit-screening.component.html',
  styleUrls: ['./edit-screening.component.scss']
})
export class EditScreeningComponent implements OnInit {

  screening: IScreening | undefined
  filmOptions: IFilm[] = []
  roomOptions: IRoom[] = []

  formGroup: FormGroup

  constructor(
      private _filmService: FilmService,
      private _roomService: RoomService,
      private _screeningService: ScreeningService,
    ) {
    // this.film = { id: 1, title: "TITle", screeningTime: 120, isShowing: true }
    this.screening = history.state.data?.film
    let date = this.screening!.beginsAt
    let time = this.screening!.beginsAt
    this.formGroup = new FormGroup({
      film: new FormControl(this.screening!.film.id, Validators.required),
      room: new FormControl(this.screening!.room, Validators.required),
      beginsAt_date: new FormControl(date, Validators.required),
      beginsAt_time: new FormControl(time, Validators.required),
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
