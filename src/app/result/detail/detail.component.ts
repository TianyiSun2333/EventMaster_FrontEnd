import {Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes, query, stagger,
} from '@angular/animations';


@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  animations: [
    trigger('fade', [
        state('less', style({
          display: 'none'
        })),
        state('more', style({
          display: 'block'
        })),
      transition('less => more', [
        query('.img-card', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(30, [
            animate(
              '500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({
                opacity: 1,
                transform: 'none'
              })
            )
          ])
        ])
      ]),
      transition('more => less', [
        query('.img-card', [
          style({opacity: 1, transform: 'translateY(100px)'}),
          stagger(-30, [
            animate(
              '500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({
                opacity: 0,
                transform: 'none'
              })
            )
          ])
        ])
      ])
    ])
  ]
})
export class DetailComponent implements OnInit, OnChanges {
  @HostBinding('@fade')
  private _details: object = {};
  private _mode = 'Event';
  private _artists: object[] = [];
  private _venue: object;
  private _upComingEvents: object[] = [];
  private _images: object[] = [];
  private _isMusic = false;
  private _teams: string[];
  showMore = true;
  screen = window.screen;
  keyword = 'index';
  order = 1;

  @Input() error: boolean;
  @Input() clear: boolean;
  @Input() search: boolean;
  @Output() venueGot = new EventEmitter();

  constructor(private http: HttpService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (const propName in changes) {
      if (propName === 'clear') {
        this.reset();
        this._images = [];
        this._details = {};
        this._artists = [];
        this._venue = undefined;
        this._upComingEvents = [];
        this._isMusic = false;
        this._teams = undefined;
      } else if (propName === 'search') {
        this.reset();
      }
    }
  }

  reset() {
    this.keyword = 'index';
    this.order = 1;
    this.showMore = true;
    this._mode = 'Event';
  }

  unsetFavorite(id) {
    console.log('un set Fav in detail table ', id);
  }

  @Input()
  set teams(teams) {
    this._teams = teams;
  }

  get teams() {
    return this._teams;
  }

  @Input()
  set details(details) {
    this._details = details;
    this._mode = 'Event';
    if (this._details['venue']) {
      console.log('details in detail component: ', this._details);
      this.http.getVenue(this._details['venue']).subscribe((response) => {
        console.log('detail get response from backend ,', response);
        this._venue = response;
        this.venueGot.next();
      });
    }
  }

  get details() {
    return this._details;
  }

  onNavigate(url) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  @Input()
  set artists(artists) {
    this._artists = artists;
    console.log('detail table get artists from result table, ', this._artists);
  }

  get artists() {
    return this._artists;
  }

  @Input()
  set venue(venue) {
    this._venue = venue;
  }

  get venue() {
    return this._venue;
  }

  @Input()
  set mode(mode) {
    this._mode = mode;
  }

  get mode() {
    return this._mode;
  }

  getLat() {
    console.log(parseFloat(this._venue['lat']));
    return parseFloat(this._venue['lat']);
  }

  getLng() {
    console.log(parseFloat(this._venue['lng']));
    return parseFloat(this._venue['lng']);
  }

  @Input()
  set upComingEvents(events) {
    this._upComingEvents = events;
  }

  get upComingEvents() {
    return this._upComingEvents;
  }

  @Input()
  set images(images) {
    console.log('detail table get images from result, ', this._images);
    this._images = images;
  }

  get images() {
    return this._images;
  }

  @Input()
  set isMusic(isMusic) {
    this._isMusic = isMusic;
  }

  get isMusic() {
    return this._isMusic;
  }

  sort() {
    const keyword = this.keyword;
    const order = this.order;
    const compare = this.compare;
    this._upComingEvents = this._upComingEvents.sort(function(e1, e2) {
      if (keyword !== 'time' && keyword !== 'index') {
        const o1 = e1[keyword];
        const o2 = e2[keyword];
        return compare(o1, o2, order);
      } else if (keyword === 'time') {
        const time1 = e1['time'] ? e1['time'] : '00:00:00';
        const time2 = e2['time'] ? e2['time'] : '00:00:00';
        const d1 = new Date(e1['date'] + 'T' + time1);
        const d2 = new Date(e2['date'] + 'T' + time2);
        return compare(d1, d2, order);
      } else {
        const o1 = e1[keyword];
        const o2 = e2[keyword];
        return compare(o1, o2, 1);
      }
    });
  }

  compare(o1, o2, order) {
    if (o1 < o2) {
      return -1 * order;
    } else if (o1 > o2) {
      return 1 * order;
    } else {
      return 0;
    }
  }
}
