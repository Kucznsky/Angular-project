import { Component, Input, OnInit } from '@angular/core';
import { ScreeningService } from 'src/services/screening.service';
import { IScreening } from 'src/models/IScreening';
import { DatePipe } from '@angular/common'
import { LiteralExpr } from '@angular/compiler';

@Component({
  selector: 'app-screenings',
  templateUrl: './screenings.component.html',
  styleUrls: ['./screenings.component.scss'],
  providers: [DatePipe]
})
export class ScreeningsComponent{
  // title = 'screening'
  @Input() screenings: IScreening[] = [];

  today = new Date;
  constructor(private _screeningService: ScreeningService, public datePipe: DatePipe) { }

  getAvailableTickets(screening: IScreening) {
    return screening.room.capacity - screening.soldTickets
  }

  ngOnInit(): void {
    this._screeningService.getScreenings().subscribe(
      response => this.screenings = response,
      error => console.error(error)
    )
  }

  todayScreenings(): void {
    this._screeningService.getScreenings_InDay(this.today).subscribe(
      response => this.screenings = response,
      error => console.error(error)
    )
  }

  currentScreenings(): void {
    this._screeningService.getScreenings_Now().subscribe(
      response => this.screenings = response,
      error => console.error(error)
    )
  }

  allScreenings():void {
    this._screeningService.getScreenings().subscribe(
      response => this.screenings = response,
      error => console.error(error)
    )
  }

}
