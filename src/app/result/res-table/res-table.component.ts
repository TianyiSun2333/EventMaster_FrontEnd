import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked, AfterViewInit,
  Component,
  DoCheck, EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Output, SimpleChange
} from '@angular/core';
import {EventsService} from '../../../services/events.service';

@Component({
  selector: 'res-table',
  templateUrl: './res-table.component.html',
  styleUrls: ['./res-table.component.css']
})
export class ResTableComponent implements OnInit, OnChanges {

  private _events: object[];
  private storage;
  private _currentId = '';
  @Output() favorite = new EventEmitter<{ event: object, index: number}>();
  @Output() reqDetail = new EventEmitter<{
    id: string,
    index: number,
  }>();
  @Output() reqArtists = new EventEmitter<string[]>();
  @Output() reqUpComingEvents = new EventEmitter<string>();
  @Output() reqImages = new EventEmitter<string[]>();
  // versionCheck: boolean;
  // @Input() index: number;
  // date: string;
  // name: string;
  // url: string;
  // genre: string;
  // segment: string;
  // venue: string;
  @Input() currentDetailIsFav: boolean;
  @Input() favIdFromDetail: string;
  @Input() flag: boolean;

  constructor() {
    this.storage = window.localStorage;
  }
  // constructor(private eventsService: EventsService) {
  //   console.log('table on construct');
  // }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (const propName in changes) {
      if (propName === 'currentDetailIsFav') {
        if (this._events) {
          for (let i = 0; i < this._events.length; i++) {
            if (this._events[i]['id'] === this.favIdFromDetail) {
              this._events['isFavorited'] = this.currentDetailIsFav;
            }
          }
        }
      } else if (propName === 'flag') {
        console.log('change mode to results');
        console.log(this.currentDetailIsFav);
        console.log(this.favIdFromDetail);
        if (this._events) {
          for (let i = 0; i < this._events.length; i++) {
            if (this._events[i]['id'] === this.favIdFromDetail) {
              this._events['isFavorited'] = this.currentDetailIsFav;
              console.log(this.currentDetailIsFav);
            }
          }
        }
      }
    }
  }

  ngOnInit() {

    // console.log('table on init');
    // if (this.eventsService.events) {
    //   this._events = this.eventsService.events;
    // }
    // if (this.versionCheck === undefined && this.eventsService.events) {
    //   this._events = this.eventsService.events;
    //   this.versionCheck = true;
    // } else {
    //   this.eventsService.eventsUpdated
    //     .subscribe((events) => {
    //       console.log('events table get events from service', events);
    //       this._events = events;
    //       console.log('events table get events from service', events);
        // });
    // }
  }

  @Input()
  set currentId(id) {
    this._currentId = id;
  }

  get currentId() {
    return this._currentId;
  }

  get events() {
    return this._events;
  }

  @Input()
  set events(events: object[]) {
    this._events = events;
    console.log('table gets events from app component', this._events);
    let ids = JSON.parse(this.storage.getItem('ids'));
    if (ids !== null) {
      console.log('get ids in table', ids);
      for (let index in this._events) {
        const id = this._events[index]['id'];
        if (ids[id] === '1') {
          this._events[index]['isFavorited'] = 'true';
        }
      }
    }
    console.log('set favorite', this._events);
    // console.log('table gets events from app component', events);


    // this.date = event['date'];
    // this.name = event['name'];
    // this.url = event['url'];
    // this.genre = event['genre'];
    // this.segment = event['segment'];
    // this.venue = event['venue'];
  }

  setFavorite(isFavorited: boolean, index: number) {
    console.log(index, 'th element favorited:', isFavorited, this._events[index]);
    this.favorite.emit({ event: this._events[index], index: index });
  }

  // @Output()

  trackEvent(index, event) {
    return event ? event['id'] : undefined;
  }

  cutName(name: string) {
    let cut = 35;
    if (name.length <= cut) {
      return name;
    } else {
      const suffix = '...';
      let prefix = name.substring(0, cut);
      const checkPoint = name.charAt(cut - 1);
      if (checkPoint === ' ') {
        return prefix + suffix;
      } else {
        for (let i = cut - 2; i >= 0; i--) {
          if (prefix.charAt(i) === ' ') {
             cut = i;
             break;
          }
        }
        prefix = prefix.substring(0, cut);
        return prefix + suffix;
      }
    }
  }

  reqDetailHandler(event, index) {
    const id = event['id'];
    console.log('request event detail from res table ', id);
    this.reqDetail.emit({ id: id, index: index});
    let artists = [];
    if (event['teams']) {
      for (let i = 0; i < event['teams'].length; i++) {
        artists.push(event['teams'][i]['name']);
      }
    }
    this.reqImages.emit(artists);
    if (event['segment'] === 'Music') {
      this.reqArtists.emit(artists);
    }
    // if (event['segment'] === 'Music') {
    //   let artists = [];
    //   for (let i = 0; i < event['teams'].length; i++) {
    //     artists.push(event['teams'][i]['name']);
    //   }
    //   this.reqArtists.emit(artists);
    //
    // }
    // console.log('get request for: ',event);
    this.reqUpComingEvents.emit(event['venue']);
    console.log('request upcoming events from res table, ', event['venue']);
  }
}
