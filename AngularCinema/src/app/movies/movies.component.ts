import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/services/film.service';
import { IFilm } from 'src/models/IFilm';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  title = 'movie'
  films: IFilm[] = [];

  constructor(private _filmService: FilmService) { }

  ngOnInit(): void {
    this._filmService.getFilms().subscribe(
      response => {console.log("Fetched films from API", response); this.films = response ?? []},
      error => console.error(error)
    )
    // this.films = this._filmService.Films
  }

}
