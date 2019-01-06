import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  private storage;
  private _ids;
  private _events;
  private _currentId = '';
  @Output() unsetfavorite = new EventEmitter<string>();
  // @Output() reqDetailFromFav = new EventEmitter<string>();
  @Output() reqDetailFromFav = new EventEmitter<object>();
  @Output() reqArtistsFromFav = new EventEmitter<string[]>();
  @Output() reqUpComingEventsFromFav = new EventEmitter<string>();
  @Output() reqImagesFromFav = new EventEmitter<string[]>();
  constructor() {
    this.storage = window.localStorage;
  }
  ngOnInit() {
    console.log('favorites on init');
  }

  @Input()
  set currentId(id) {
    this._currentId = id;
  }

  get currentId() {
    return this._currentId;
  }

  get ids () {
    console.log('favorites table get ids from local storage');
    // console.log(JSON.parse(this.storage.getItem('ids')));
    this._ids = [];
    for (const id in JSON.parse(this.storage.getItem('ids'))) {
      this._ids.push(id);
    }
    return this._ids;
  }

  getEvent(id) {
    // return 1;
    // console.log(id);
    return JSON.parse(this.storage.getItem(id));
  }

  setFavorite(isFavorited: boolean, id: string) {
    console.log('favorites table get unset fav, ', isFavorited, id);

    this.unsetfavorite.emit(id);
  }

  trackEvent(index, id) {
    return id ? id : undefined;
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

  reqDetailHandler(id) {
    let event = JSON.parse(this.storage.getItem(id));
    // const id = event['id'];
    console.log('request event detail from res table ', id);
    this.reqDetailFromFav.emit(event);
    let artists = [];
    for (let i = 0; i < event['teams'].length; i++) {
      artists.push(event['teams'][i]['name']);
    }
    this.reqImagesFromFav.emit(artists);
    if (event['segment'] === 'Music') {
      this.reqArtistsFromFav.emit(artists);
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
    this.reqUpComingEventsFromFav.emit(event['venue']);
    console.log('request upcoming events from res table, ', event['venue']);
  }
}
