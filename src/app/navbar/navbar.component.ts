import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  private _mode = 'Results';
  @Input() clear = false;
  @Input() search = false;
  @Output() changeMode = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  get mode() {
    return this._mode;
  }

  @Input()
  set mode(mode) {
    this._mode = mode;
  }

  onClickResults() {
    this._mode = 'Results';
    console.log('click mode, now mode is ', this._mode);
    this.changeMode.emit('Results');
  }

  onClickFavorites() {
    this._mode = 'Favorites';
    console.log('click mode, now mode is ', this._mode);
    this.changeMode.emit('Favorites');
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      console.log('clear from nav ', propName);
      if (propName === 'clear' || propName === 'search') {
        this._mode = 'Results';
        this.changeMode.emit('Results');
      }
    }
  }
}
