import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ShowingsComponent } from './components/showings/showings.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { TodayShowingsComponent } from './components/today-showings/today-showings.component';
import { BuyTicketsComponent } from './components/buy-tickets/buy-tickets.component';
import { MoviePopularityComponent } from './components/movie-popularity/movie-popularity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MoviesComponent,
    ShowingsComponent,
    RoomsComponent,
    TodayShowingsComponent,
    BuyTicketsComponent,
    MoviePopularityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
