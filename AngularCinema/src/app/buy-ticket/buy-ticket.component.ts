import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IScreening } from 'src/models/IScreening';
import { ReservationService } from 'src/services/reservation.service';
import { ScreeningsComponent } from '../screenings/screenings.component';
// import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.scss']
})
export class BuyTicketComponent implements OnInit {

  screening: IScreening
  seats: { num: number, free: boolean }[] = []

  constructor(private _reservationService: ReservationService) {
    // console.warn("HERE")
    this.screening = history.state.data.screening
    this.seats = Array.from({length: this.screening.room.capacity}, (_, index) => ({ num: index + 1, free: true}))
    // this.seats = Array.from({length: 60}, (_, index) => ({ num: index + 1, free: true}))
    // this.seats[0].free = false
  }

  ngOnInit(): void {
    // console.warn("HERE")
    if(this.screening)
      this.fetchFreeSeats()
    // else

  }

  fetchFreeSeats(): void {
    console.warn("HERE")
    this._reservationService.getAllTakenSeats(this.screening!.id).subscribe(
      response => this.takeSeats(response),
      error => console.error(error)
    )
  }

  private takeSeats(takenSeats: number[]): void {
    takenSeats.forEach(seat => this.seats!.find(item => item.num == seat)!.free = false)
  }

  isSelected = (num: number): boolean => num == this.currSeat

  currSeat: number|undefined
  onSelectSeat(ticketNum: number): void {
    if(this.seats.find(item => item.num == ticketNum)!.free)
      this.currSeat = this.isSelected(ticketNum) ? undefined : ticketNum;
  }

  onBuyTicket(): void {
    this._reservationService.postReservation(this.screening.id, this.currSeat!).subscribe(
      response => console.log(response),
      error => console.error(error)
    )
    this.screening.soldTickets += 1
    history.back()
  }
}
