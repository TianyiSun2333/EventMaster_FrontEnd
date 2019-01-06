import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  private _isFavorite: boolean;
  private _event: object;
  private _mode: string;
  @Output() favorite = new EventEmitter<boolean>();
  private storage;
  private _disabled = false;
  constructor() {
    this.storage = window.localStorage;
  }

  get disabled() {
    return this._disabled;
  }

  @Input()
  set disabled(disabled) {
    this._disabled = disabled;
  }

  get mode() {
    return this._mode;
  }

  @Input()
  set mode(mode) {
    this._mode = mode;
  }

  ngOnInit() {
  }

  onClickFavorite() {
    // console.log(this._event);
    // console.log(this._event);
    // console.log(this._event.isFavorited);
    this._isFavorite = !this._event['isFavorited'];
    // console.log(this._isFavorite);
    // this.storage.clear();
    // console.log('test local storage', this.storage.getItem('size'));
    // let size = this.storage.getItem('size') ? parseInt(this.storage.getItem('size')) : 0;
    let ids = this.storage.getItem('ids') ? JSON.parse(this.storage.getItem('ids')) : {};
    console.log('read ids from local storage', ids);
    // this.storage.setItem('size', '1');
    // console.log('current size is ', size);
    if (this._isFavorite) {
      this._event['isFavorited'] = true;
      this.storage.setItem(this._event['id'], JSON.stringify(this._event));
      ids[this._event['id']] = '1';
      this._event['isFavorited'] = true;
    } else {
      this.storage.removeItem(this._event['id']);
      delete ids[this._event['id']];
      this._event['isFavorited'] = false;
      // ids.splice(ids['ids'].indexOf(this._event['id']), 1);
    }
    this.storage.setItem('ids', JSON.stringify(ids));
    console.log('the ids is ', this.storage.getItem('ids'));
    this.favorite.emit(this._isFavorite);
    // console.log('the ')
    // this.storage.setItem('size', size);
    // let test = this.storage.getItem('size');
    // console.log('set size in local storage', test);
    console.log(this._event);
  }

  test() {

  }

  @Input()
  set isFavorite(isFavorite: boolean) {
    this._isFavorite = isFavorite;
  }

  get isFavorite() {
    return this._isFavorite;
  }

  @Input()
  set event(event) {
    this._event = event;
    // this._isFavorite = this._event['isFavorited'] ? true : false;
    // console.log('set is fav ', event['id'], this._isFavorite);
    // if (this._event['isFavorited']) {
    //   this._isFavorite = true;
    // } else {
    //   this._isFavorite = false;
    // }
  }


  get event() {
    return this._event;
  }
}
