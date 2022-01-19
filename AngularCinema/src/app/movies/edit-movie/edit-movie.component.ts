import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IFilm } from 'src/models/IFilm';
import { FilmService } from 'src/services/film.service';
@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  movie: IFilm

  formGroup!: FormGroup

  constructor(
      private _activatedRoute: ActivatedRoute,
      private _filmService: FilmService,
      private _router: Router,
    ) {
    this.movie = history.state.data?.movie
    if(!this.movie)
      this._activatedRoute.paramMap.subscribe(params => {
        let id = params.get('id') as unknown as number ?? null;
        this.fetchFilm(id)
      })
    else
      this.initializeForm()
  }

  ngOnInit(): void {
  }

  private initializeForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl(this.movie.title, Validators.required),
      // screeningTime: new FormControl(null, [Validators.required, screeningTimeValidator()]),
      screeningTime: new FormControl(this.movie.screeningTime, Validators.required),
    })
  }

  fetchFilm(id: number): void {
    this._filmService.getFilm(id).subscribe(
      response => {
          this.movie = response
          this.initializeForm()},
      error => console.error(error)
    )
  }

  get isInvalid() {
    return this.formGroup.invalid
  }

  onSubmit(): void {
    if(this.formGroup.invalid)
      return;

    let title = this.formGroup.value.title
    let screeningTime = this.formGroup.value.screeningTime

    this.movie.title = title
    this.movie.screeningTime = screeningTime
    this._filmService.putFilm(this.movie)

    this._router.navigateByUrl('/movies')
  }
}
