import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
// import {Debounce} from 'angular2-debounce';



import { AppComponent } from './app.component';
import { EventSearchFormComponent } from './event-search-form/event-search-form.component';
import { HttpService } from '../services/http.service';
import { ResTableComponent } from './result/res-table/res-table.component';
import { ResultComponent } from './result/result.component';
import { FavoriteComponent } from './result/favorite/favorite.component';
import { FavoritesComponent } from './result/favorites/favorites.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NorecordComponent } from './result/norecord/norecord.component';
import { DetailComponent } from './result/detail/detail.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import { ErrorComponent } from './result/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    EventSearchFormComponent,
    ResTableComponent,
    ResultComponent,
    FavoriteComponent,
    FavoritesComponent,
    NavbarComponent,
    NorecordComponent,
    DetailComponent,
    ErrorComponent,
    // Debounce,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    RoundProgressModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCqfqVTo2vW9gZu6jF6yFMxza7OB610_g4'
    }),
    BrowserAnimationsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
export class YourModule {}





