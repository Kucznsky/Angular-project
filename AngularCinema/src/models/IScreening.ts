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
    const isTooEarly = value < new Date()
    return isTooEarly ? { tooEarlyDate: { value: value } } : null;
  };
}