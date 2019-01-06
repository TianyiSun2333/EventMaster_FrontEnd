import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  versionCheck = false;
  private _events: object[];
  eventsUpdated: Subject<object[]> = new Subject<object[]>();
  eventsUpdatedCheck: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  set events(events: object[]) {
    this._events = events;
    this.eventsUpdated.next(this._events);
    this.versionCheck = !this.versionCheck;
    console.log('set events in events service ', this._events);
  }

  get events() {
    // this.eventsUpdated.next(this._events);
    return this._events;
  }
}
