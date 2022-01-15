import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MoviesComponent } from './movies/movies.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ScreeningsComponent } from './screenings/screenings.component';
import { AddMoviesComponent } from './add-movies/add-movies.component';
import { AddShowingsComponent } from './add-showings/add-showings.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { EditMoviesComponent } from './edit-movies/edit-movies.component';
import { EditShowingsComponent } from './edit-showings/edit-showings.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviePageComponent } from './movies/movie-page/movie-page.component';
import { MovieComponent } from './movies/movie/movie.component';
import { ScreeningPageComponent } from './screenings/screening-page/screening-page.component';
import { MatListModule } from '@angular/material/list';
import { ScreeningElementComponent } from './screenings/screening-element/screening-element.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationComponent,
    MoviesComponent,
    RoomsComponent,
    ScreeningsComponent,
    AddMoviesComponent,
    AddShowingsComponent,
    BuyTicketComponent,
    EditMoviesComponent,
    EditShowingsComponent,
    MoviePageComponent,
    MovieComponent,
    ScreeningPageComponent,
    ScreeningElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
