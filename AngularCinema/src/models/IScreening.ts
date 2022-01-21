import { IFilm } from "./IFilm";
import { IRoom } from "./IRoom";
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export interface IScreening {
  id: number
  filmID: number
  film: IFilm
  roomID: number
  room: IRoom
  soldTickets: number
  beginsAt: Date
}

export function IScreening_beginsAt_Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value: Date = new Date(control.value)

    let test: Date = new Date()
    test.setUTCHours(1,0,0);
    if(value.getTime() === test.getTime())
      value.setUTCHours(23,59);
    const isTooEarly = value < new Date()

    console.log("value: ", value)
    return isTooEarly ? { tooEarlyDate: { value: value } } : null;
  };
}