import { Component, OnInit } from '@angular/core';
import { ScreeningService } from 'src/services/screening.service';
import { IScreening } from 'src/models/IScreening';

@Component({
  selector: 'app-showings',
  templateUrl: './showings.component.html',
  styleUrls: ['./showings.component.scss']
})
export class ShowingsComponent implements OnInit {
  title = 'screening'
  screenings: IScreening[] = [];

  constructor(private _screeningService: ScreeningService) { }

  getAvailableTickets(screening: IScreening) {
    return screening.room.capacity - screening.soldTickets
  }

  ngOnInit(): void {
    this._screeningService.getScreenings().subscribe(
      response => { console.log("Fetched rooms off API.", response); this.screenings = response ?? []},
      error => console.error(error)
    )
  }

}
