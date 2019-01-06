import {AfterContentChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
// import {EventsService} from '../../services/events.service';
import {HttpService} from '../../services/http.service';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes, query, stagger,
} from '@angular/animations';


@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  animations: [
    trigger('inOutDetail', [
      state('inDetail', style({
        // transform: 'translateX(0px)',
        opacity: 1
      })),
      state('outDetail', style({
        // position: 'relative',
        // left: '1000px'
        // opacity: 0,
        transform: 'translateX(-100%)'
      })),
      // transition('in => out', [
      //   animate(1000)
      // ]),
      transition('outDetail => inDetail', [
        animate(500)
      ])
    ]),
    trigger('inOutEvents', [
      state('inEvents', style({
        transform: 'translateX(0px)',
        opacity: 1
      })),
      state('outEvents', style({
        // position: 'relative',
        // left: '1000px'
        // opacity: 0,
        transform: 'translateX(100%)'
      })),
      transition('outEvents => inEvents', [
        animate(500)
      ]),
      // transition('out => in', [
      //   animate(1000)
      // ])
    ])
  ]
})
export class ResultComponent implements OnInit, OnChanges {
  dataGot = true;
  private _events: object[];
  private _artists: object[] = [];
  private _upComingEvents: object[];
  images: object[] = [];
  currentDetails: object;
  currentEvent: object;
  isMusic = false;
  flag = false;
  private detailClickable = false;
  private _prevMode: string;
  private _teams: string[];
  @Input() error: boolean;
  venueGot = false;
  onFlyInDetail = false;
  onFlyInEvents = true;
  // @Input() clear = false;
  @Input() mode = 'Results';
  @Input() clear: boolean;
  @Input() search: boolean;
  currentDetailIsFav: boolean;
  favoritedId: string;

// [
      // {
      //   "name": "Los Angeles Rams vs. Green Bay Packers",
      //   "date": "2018-10-28",
      //   "genre": "Football",
      //   "segment": "Sports",
      //   "venue": "Los Angeles Memorial Coliseum",
      //   "id": "vvG1IZ4kDLZPsv"
      // },
      // {
      //   "name": "Los Angeles Rams vs. Seattle Seahawks",
      //   "date": "2018-11-11",
      //   "genre": "Football",
      //   "segment": "Sports",
      //   "venue": "Los Angeles Memorial Coliseum",
      //   "id": "vvG1IZ4kDLkgs2"
      // },
      // {
      //   "name": "Los Angeles Rams vs. Philadelphia Eagles",
      //   "date": "2018-12-16",
      //   "genre": "Football",
      //   "segment": "Sports",
      //   "venue": "Los Angeles Memorial Coliseum",
      //   "id": "vvG1IZ4kDLdAs6"
      // },
      // {
      //   "name": "Los Angeles Rams vs. San Francisco 49ers",
      //   "date": "2018-12-30",
      //   "genre": "Football",
      //   "segment": "Sports",
      //   "venue": "Los Angeles Memorial Coliseum",
      //   "id": "vvG1IZ4kDLAPsu"
      // }
    // ];
  constructor(private dataService: HttpService, private http: HttpService) { }
  // constructor(private route: ActivatedRoute) { }
  // constructor(private eventsService: EventsService) { }
  ngOnInit() {
    console.log('result on init');
    // console.log('');
    // this.route.paramMap
    //   .subscribe((params) => {
    //     console.log('response table getting params from nav', params.get('events'));
    // this.events = JSON.parse(params['params']['events']);
    // });
    // this.eventsService.eventsUpdated
    //   .subscribe((events) => {
    //     console.log('results get events from service', events);
    //     console.log('events table get events from service', events);
      // });

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (const propName in changes) {
      console.log('clear from nav ', propName);
      if (propName === 'clear') {
        this.reset();
        this._events = undefined;
      } else if (propName === 'search') {
        this.reset();
      } else if (propName === 'mode') {
        if (this.mode === 'Results') {
          this.onFlyInDetail = false;
          this.onFlyInEvents = true;
          this.flag = !this.flag;
        }
      } else if (propName === 'Favorites') {
        this.onFlyInEvents = true;
      }
    }
  }

  reset() {
    this.detailClickable = false;
    this.currentDetails = {};
    this.currentEvent = undefined;
    this.mode = 'Results';
    this._artists = [];
    this.isMusic = false;
    this.onFlyInEvents = true;
    this.onFlyInDetail = false;
    this.images = [];
    this.venueGot = false;
    this.error = undefined;
    this.flag = false;
  }

  get teams() {
    return this._teams;
  }

  @Input()
  set events(events: object[]) {
    this._events = events;
    console.log('result get events from app', this._events);
    this.dataService.gettingData.subscribe((dataGot) => {
      this.dataGot = dataGot;
    });
  }

  get events() {
    return this._events;
  }

  setFavorite(event: object) {
    console.log('result get set favorite index', event['index'], 'is favorite ', event['event']);
    const index = event['index'];
    const isFavorited = event['event']['isFavorited'];
    this._events[index]['isFavorited'] = isFavorited;
    console.log(this._events);
  }

  unsetFavorite(id) {
    for (let i = 0; i < this._events.length; i++) {
      if (this._events[i]['id'] === id) {
        console.log('result unset fav ', id);
        this._events[i]['isFavorited'] = false;
      }
    }
    console.log(this._events);
  }

  get artists() {
    return this._artists;
  }

  // ngAfterContentChecked() {
  //   console.log('on content checked');
  // }
  // ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
  //   console.log('clear');
  //   this.mode = 'Results';
  //   // let log: string[] = [];
  //   for (let propName in changes) {
  //     let changedProp = changes[propName];
  //     // let to = JSON.stringify(changedProp.currentValue);
  //     if (changedProp.isFirstChange()) {
  //       console.log('clear change');
  //
  //       // log.push(`Initial value of ${propName} set to ${to}`);
  //       // } else {
  //       // let from = JSON.stringify(changedProp.previousValue);
  //       // log.push(`${propName} changed from ${from} to ${to}`);
  //     }
  //   }
  //   // this.changeLog.push(log.join(', '));
  // }

  getDetail(params) {
    this.onFlyInDetail = true;
    this.onFlyInEvents = false;
    this.http.gettingData.next(false);
    this.mode = 'Details';
    this._prevMode = 'Results';
    this.venueGot = false;
    console.log('result get request for detail ', params['id']);
    this.http.getDetail(params['id']).subscribe((details) => {
      this.currentDetails = details;
      console.log('request from http service', this.currentDetails);
      this.detailClickable = true;
      this.http.gettingData.next(true);
    },
      (error) => {
      console.log(error);
      this.error = true;
      this.http.gettingData.next(true);
      });
    console.log('details stored in in result is', this.currentDetails);
    // this.currentDetails = {"name":"Los Angeles Rams vs. San Francisco 49ers","teams":[{"name":"Los Angeles Rams"},{"name":"San Francisco" +
    //     " 49ers"}],"seatmap":"https://s1.ticketm.net/tmimages/venue/maps/wes/70057s.gif","id":"vvG1IZ4kDLAPsu","buy":"https://www.ticketmaster.com/los-angeles-rams-vs-san-francisco-los-angeles-california-12-30-2018/event/0A00546EDF165C4D","status":"onsale","min":40,"max":275,"venue":"Los Angeles Memorial Coliseum","genre":"Football","segment":"Sports","localDate":"2018-12-30","localTime":"13:25:00"};
    // this.detailClickable = true;
    // this.http.gettingData.next(true);


    this.currentEvent = this._events[params['index']];
    console.log(this.currentEvent);
  }

  getDetailForFav(event) {
    this.onFlyInDetail = true;
    this.onFlyInEvents = false;
    this.http.gettingData.next(false);
    this.mode = 'Details';
    this._prevMode = 'Favorites';
    console.log('result get request for detail ', event['id']);
    this.http.getDetail(event['id']).subscribe((details) => {
      this.currentDetails = details;
      console.log('request from http service', this.currentDetails);
      this.detailClickable = true;
      this.http.gettingData.next(true);
    });
    console.log('details stored in in result is', this.currentDetails);
    // this.currentDetails = {"name":"Los Angeles Rams vs. San Francisco 49ers","teams":[{"name":"Los Angeles Rams"},{"name":"San Francisco" +
    //     " 49ers"}],"seatmap":"https://s1.ticketm.net/tmimages/venue/maps/wes/70057s.gif","id":"vvG1IZ4kDLAPsu","buy":"https://www.ticketmaster.com/los-angeles-rams-vs-san-francisco-los-angeles-california-12-30-2018/event/0A00546EDF165C4D","status":"onsale","min":40,"max":275,"venue":"Los Angeles Memorial Coliseum","genre":"Football","segment":"Sports","localDate":"2018-12-30","localTime":"13:25:00"};
    // this.detailClickable = true;
    // this.http.gettingData.next(true);


    this.currentEvent = event;
    console.log(this.currentEvent);
  }

  getArtists(artistNames) {
    this.isMusic = true;
    for (let i = 0; i < artistNames.length; i++) {
      console.log('request for ', artistNames[i]);
      this.http.getArtist(artistNames[i]).subscribe((response) => {
        console.log('get artist response from http service, ', response);
        this._artists[i] = {'artist': response};
        console.log(this._artists[i]['artist']);
      });
    }
    // console.log('result get request for artists', artists);
  }

  getImages(names) {
    this._teams = names;
    console.log('get request for images, ', names);
    for (let i = 0; i < names.length; i++) {
      console.log('request for ', names[i]);
      this.http.getImages(names[i]).subscribe((response) => {
        console.log('get images response from http service, ', response);
        this.images[i] = {'artist': response['images']};
        console.log(this.images[i]['artist']);
      });
    }
  }

  getUpComingEvents(venue) {
    console.log('get upcoming events request from res table ,', venue);
    this.http.getUpComingEvents(venue).subscribe((response) => {
      this._upComingEvents = response['events'];
      console.log('get upcoming events from http service ', this._upComingEvents);
    });
  }

  get upComingEvents() {
    return this._upComingEvents;
  }

  onClickFavFromDetail(isFavorited, detail) {
    console.log('result table get fav icon click from detail control panel, ', detail['id'], isFavorited);
    this.favoritedId = detail['id'];
    this.currentDetailIsFav = isFavorited;
    // this.clickFavFromDetail.emit({id: detail['id'], isFavorited: isFavorited});
    // console.log('dataGot, ', this.dataGot);
    // console.log('mode, ', this.mode);
    // console.log('events === undefined, ', this._events === undefined);
  }

  set prevMode(mode) {
    this._prevMode = mode;
  }

  get prevMode() {
    return this._prevMode;
  }

  reformat(inputStr: string) {
    inputStr = inputStr.replace(/(\s|#)+/g, '%20');
    return inputStr.replace(/&+/g, '%26');
  }

  venueOnGet() {
    this.venueGot = true;
  }
}
