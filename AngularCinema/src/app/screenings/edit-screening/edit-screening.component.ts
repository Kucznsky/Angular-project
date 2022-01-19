import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { DatePipe } from '@angular/common'
import { IFilm } from 'src/models/IFilm';
import { FilmService } from 'src/services/film.service';
import { IRoom } from 'src/models/IRoom';
import { RoomService } from 'src/services/room.service';
import { IScreening, IScreening_beginsAt_Validator } from 'src/models/IScreening';
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

  formGroup!: FormGroup

  constructor(
      private _activatedRoute: ActivatedRoute,
      private _filmService: FilmService,
      private _roomService: RoomService,
      private _screeningService: ScreeningService,
      private _datePipe: DatePipe,
    ) {
    // this.film = { id: 1, title: "TITle", screeningTime: 120, isShowing: true }
    this.screening = history.state.data?.screening
    if(!this.screening)
      this._activatedRoute.paramMap.subscribe(params => {
        let id = params.get('id') as unknown as number ?? null;
        this.fetchScreening(id)
      });
    else
      this.initializeForm()
  }

  ngOnInit(): void {
    this.fetchFilms()
    this.fetchRooms()
  }

  private initializeForm(): void {
    let date = this._datePipe.transform(this.screening!.beginsAt, 'yyyy-MM-dd')
    let time = this._datePipe.transform(this.screening!.beginsAt, 'H:mm')
    console.warn("Screening:", this.screening)
    this.formGroup = new FormGroup({
      film: new FormControl(this.screening?.filmID, Validators.required),
      room: new FormControl(this.screening?.roomID, Validators.required),
      beginsAt_date: new FormControl(date, [Validators.required, IScreening_beginsAt_Validator()]),
      beginsAt_time: new FormControl(time, [Validators.required, IScreening_beginsAt_Validator()]),
      // beginsAt_date: new FormControl('', Validators.required),
      // beginsAt_time: new FormControl('', Validators.required),
    })
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
  fetchScreening(id: number): void {
    this._screeningService.getScreening(id).subscribe(
      response => {
          this.screening = response
          this.initializeForm()},
      error => console.error(error)
    )
  }

  onSubmit(): void {
    if(this.formGroup.invalid)
      return;

    let film = this.filmOptions.find(item => item.id == this.formGroup.value.film)
    let room = this.roomOptions.find(item => item.id == this.formGroup.value.room)
    let beginsAt = new Date(`${this.formGroup.value.beginsAt_date} ${this.formGroup.value.beginsAt_time}`)

    this._screeningService.putScreening({
      id: this.screening!.id,
      filmID: film!.id,
      film: film!,
      roomID: room!.id,
      room: room!,
      soldTickets: 0,
      beginsAt: beginsAt
    })

    history.back()
  }
}
