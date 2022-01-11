import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MoviesComponent } from './movies/movies.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ShowingsComponent } from './showings/showings.component';
import { AddMoviesComponent } from './add-movies/add-movies.component';
import { AddShowingsComponent } from './add-showings/add-showings.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { EditMoviesComponent } from './edit-movies/edit-movies.component';
import { EditShowingsComponent } from './edit-showings/edit-showings.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationComponent,
    MoviesComponent,
    RoomsComponent,
    ShowingsComponent,
    AddMoviesComponent,
    AddShowingsComponent,
    BuyTicketComponent,
    EditMoviesComponent,
    EditShowingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
