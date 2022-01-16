import { Component, OnInit, Input} from '@angular/core';
import { IScreening } from 'src/models/IScreening';

@Component({
  selector: 'app-screening-element',
  templateUrl: './screening-element.component.html',
  styleUrls: ['./screening-element.component.scss']
})
export class ScreeningElementComponent implements OnInit {
  @Input() screenings: IScreening[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
