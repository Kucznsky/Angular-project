import { Component, Input, OnInit } from '@angular/core';
import { ScreeningService } from 'src/services/screening.service';
import { IScreening } from 'src/models/IScreening';

@Component({
  selector: 'app-screenings',
  templateUrl: './screenings.component.html',
  styleUrls: ['./screenings.component.scss']
})
export class ScreeningsComponent implements OnInit {
  // title = 'screening'
  @Input() screenings: IScreening[] = [];


  constructor(private _screeningService: ScreeningService) { }

  getAvailableTickets(screening: IScreening) {
    return screening.room.capacity - screening.soldTickets
  }

  ngOnInit(): void {
    this._screeningService.getScreenings().subscribe(
      response => this.screenings = response,
      error => console.error(error)
    )
  }

}
