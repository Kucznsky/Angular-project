import { Component, OnInit } from '@angular/core';
import { IRoom } from 'src/models/IRoom';
import { RoomService } from 'src/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  title = 'room';
  rooms: IRoom[] = [];
  
  constructor(private _roomService: RoomService) { 
  }
  
  ngOnInit(): void {
    this._roomService.getRooms().subscribe(
      response => this.rooms = response,
      error => console.error(error)
    )
  }

}
