import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MoviePageComponent } from './movies/movie-page/movie-page.component';
import { MoviesComponent } from './movies/movies.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ScreeningsComponent } from './screenings/screenings.component';
import { AddScreeningComponent } from './screenings/add-screening/add-screening.component'

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'screenings', component: ScreeningsComponent },
  { path: 'screenings/new', component: AddScreeningComponent },

  { path: 'movie/:id', component: MoviePageComponent },
  { path: 'buyTicket/:screeningID', component: BuyTicketComponent },

  /* Wszystkie ścieżki trzeba dawać przed tą ścieżką. */
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
