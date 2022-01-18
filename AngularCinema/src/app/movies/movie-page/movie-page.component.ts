import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilm } from 'src/models/IFilm';
import { FilmService } from 'src/services/film.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {

  id?: number
  movie?: IFilm

  constructor(private _activatedRoute: ActivatedRoute,
    private _filmService: FilmService,
    private _router: Router,
  ) {
    this._activatedRoute.paramMap.subscribe(params => {
        this.id = params.get('id') as unknown as number ?? null;
        this.fetchFilm()
      });
  }

  ngOnInit(): void {
  }

  fetchFilm() {
    if(this.id)
      this._filmService.getFilm(this.id).subscribe(
        response => this.movie = response,
        error => console.error(error)
      )
  }
  deleteMovie() {
    this._filmService.deleteFilm(this.movie!.id)

    this._router.navigateByUrl('/movies')
  }
}
