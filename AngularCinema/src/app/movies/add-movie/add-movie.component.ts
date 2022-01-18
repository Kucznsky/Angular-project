import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { IFilm } from 'src/models/IFilm';
import { FilmService } from 'src/services/film.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  formGroup: FormGroup

  constructor(
      private _filmService: FilmService,
    ) {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      // screeningTime: new FormControl(null, [Validators.required, screeningTimeValidator()]),
      screeningTime: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
  }

  get isInvalid() {
    return this.formGroup.invalid
  }

  onSubmit(): void {
    if(this.formGroup.invalid)
      return;

    let title = this.formGroup.value.title
    let screeningTime = this.formGroup.value.screeningTime

    this._filmService.postFilms([{
        id: 0,
        title: title,
        screeningTime: screeningTime,
        isShowing: true
      }])

    history.back()
  }
}

// function screeningTimeValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     let value = control.value
//     // const forbidden = nameRe.test(control.value);
//     return null;
//   };
// }
