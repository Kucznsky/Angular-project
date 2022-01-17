import { Component, OnInit, Input} from '@angular/core';
import { IScreening } from 'src/models/IScreening';

@Component({
  selector: 'app-screening-element',
  templateUrl: './screening-element.component.html',
  styleUrls: ['./screening-element.component.scss']
})
export class ScreeningElementComponent implements OnInit {
  @Input() screening!: IScreening;
  constructor() { }

  ngOnInit(): void {
  }

  getAvailableTickets(screening: IScreening) {
    return screening.room.capacity - screening.soldTickets
  }
  
}
