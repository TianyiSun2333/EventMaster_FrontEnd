import { Component } from '@angular/core';
import {EventsService} from '../services/events.service';
// import Events = NodeJS.Events;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HW08FrontEnd';
  clear = false;
  search = false;
  private _events: object;
  mode = 'Results';
  error = false;
  // constructor(private eventsService: EventsService) { }
  constructor() { }
  onLoaded(events: object[]) {
    // if (events && events.length > 0) {
      this._events = events;
      // this.eventsService.events = events;
      console.log('app get events from form', this._events);
    // }
  }

  get events() {
    return this._events;
  }

  changeMode(mode) {
    console.log('app get change mode from nav', mode);
    this.mode = mode;
  }

  onClear() {
    this.clear = !this.clear;
    this.error = false;
  }

  onSearch() {
    this.search = !this.search;
    this.error = false;
  }

  onError() {
    this.error = true;
  }
}
