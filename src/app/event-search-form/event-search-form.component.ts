import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'event-search-form',
  templateUrl: './event-search-form.component.html',
  styleUrls: ['./event-search-form.component.css']
})
export class EventSearchFormComponent implements OnInit {
  @Output() loaded = new EventEmitter<object>();
  @Output() clear = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() error = new EventEmitter();

  keywordValue = '';
  positionMode = 'location';
  category = 'All';
  unit = 'miles';
  location: object;
  recommendations = [];
  private subject: Subject<string> = new Subject();

  constructor(private service: HttpService) {
  }
  load(events: object) {
    this.loaded.emit(events);
  }
  ngOnInit() {
    this.service.getLocation()
      .subscribe((response) => {
        this.location = {
          lat: response['lat'],
          lng: response['lon']
        };
        console.log(this.location);
      });
    this.subject.pipe(debounceTime(200)).subscribe(searchTextValue => {
      this.recommend(searchTextValue);
    });
  }

  onKeyUp(searchTextValue: string) {
    this.subject.next(searchTextValue);
  }

  onSubmit(form) {
    if (form.valid) {
      this.search.emit();
      this.service.gettingData.next(false);
      let params: object;
      params = form.value;
      params['unit'] = this.unit;
      params['position']['positionMode'] = this.positionMode;
      params['category'] = this.category;
      params['position']['location'] = this.location;
      if (!params['radius']) {
        params['radius'] = 10;
      }
      console.log(params);
      this.service.getEvents(params)
        .subscribe((response) => {
          if (response !== undefined) {
            this.service.gettingData.next(true);
            const events = response['events'].sort(function(e1, e2) {
              const d1 = new Date(e1['date'] + 'T' + e1['time']);
              const d2 = new Date(e2['date'] + 'T' + e2['time']);
              if (d1 < d2) {
                return -1;
              } else if (d1 > d2) {
                return 1;
              } else {
                return 0;
              }
            });
            console.log('sort the events', events);
            // console.log(response['events']);
            this.load(events);
          } else {
            this.load({ 'error': true });
          }
        },
          error => {
          console.log('get error from service', error);
          this.service.gettingData.next(true);
          this.error.next();
        });
      console.log(form);
    }
  }
  onReset() {
    this.positionMode = 'location';
    this.category = 'All';
    this.unit = 'miles';
    this.load(null);
    this.clear.emit();
    this.recommendations = [];
  }
  recommend(input) {
    if (input !== '') {
      // this.keywordValue = input;
      console.log(input);
      this.service.getRecommendations(input)
        .subscribe((response) => {
          console.log(response);
          if (response['names']) {
            const names = response['names'];
            this.recommendations = [];
            for (let i = 0; i < names.length; i++) {
              this.recommendations.push(names[i]['name']);
            }
            console.log(response);
          }
        });
    } else {
      this.recommendations = [];
    }
  }
}
