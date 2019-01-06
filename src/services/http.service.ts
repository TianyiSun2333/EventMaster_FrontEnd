import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public static IP_API_URL = 'http://ip-api.com/json';
  public static URL_PREFIX = 'http://eventmaster-env.kxacp3xccb.us-west-1.elasticbeanstalk.com';
  // public static URL_PREFIX = 'http://localhost:3000';
  public static REC_ENDPOINT = '/recommendation';
  public static EVENTS_ENDPOINT = '/events';
  public static DETAIL_ENDPOINT = '/detail';
  public static ARTIST_ENDPOINT = '/artist';
  public static VENUE_ENDPOINT = '/venue';
  public static UPCOMINGEVENTS_ENDPOINT = '/upcomingevents';
  public static IMAGES_ENDPOINT = '/images';
  // private detail: object;
  private detailObservable;
  private id;
  gettingData: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) { }
  getRecommendations(keyword: string) {
    const url = HttpService.URL_PREFIX + HttpService.REC_ENDPOINT + '?keyword=' + keyword;
    return this.http.get(url);
  }
  getLocation() {
    return this.http.get(HttpService.IP_API_URL);
  }
  getEvents(params) {
    let url = HttpService.URL_PREFIX
      + HttpService.EVENTS_ENDPOINT
      + '?keyword=' + params['keyword'].replace(/(\s|#)+/g, '%20')
      + '&unit=' + params['unit']
      + '&radius=' + params['radius']
      + '&category=' + params['category'];
    if (params['position']['positionMode'] === 'location') {
      url += '&lat=' + params['position']['location']['lat']
        + '&lng=' + params['position']['location']['lng'];
    } else {
      let addr: string = params['position']['address'];
      addr = addr.replace(/(\s|#)+/g, '%20');
      url += '&address=' + addr;
    }
    console.log(url);
    console.log(params);
    return this.http.get(url);
    // return this.http.get(url, params);
  }

  getDetail(id) {
    // if (this.id !== id) {
      const url = HttpService.URL_PREFIX + HttpService.DETAIL_ENDPOINT + '?id=' + id;
      console.log(url);
      return this.http.get(url);
      // this.id = id;
      // this.detailObservable = this.http.get(url);
      // return this.detailObservable;
    // } else {
    //   console.log('this detail has be cached');
    //   return this.detailObservable;
    // }
  }

  getArtist(keyword) {
    const url = HttpService.URL_PREFIX + HttpService.ARTIST_ENDPOINT + '?name=' + keyword;
    console.log('send request to back end for artists, ', url);
    return this.http.get(url);
  }

  getVenue(name) {
    const url = HttpService.URL_PREFIX + HttpService.VENUE_ENDPOINT + '?keyword=' + name;
    console.log('send request to back end for venue ', url);
    return this.http.get(url);
  }

  getUpComingEvents(venue) {
    const url = HttpService.URL_PREFIX + HttpService.UPCOMINGEVENTS_ENDPOINT + '?name=' + venue;
    return this.http.get(url);
  }

  getImages(keyword) {

    const url = HttpService.URL_PREFIX + HttpService.IMAGES_ENDPOINT + '?size=huge&number=8' + '&keyword=' + keyword;
    console.log(url);
    return this.http.get(url);
  }
}
