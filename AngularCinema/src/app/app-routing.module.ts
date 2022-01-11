import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MoviesComponent } from './movies/movies.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ShowingsComponent } from './showings/showings.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'showings', component: ShowingsComponent },
  /* Wszystkie ścieżki trzeba dawać przed tą ścieżką. */
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
