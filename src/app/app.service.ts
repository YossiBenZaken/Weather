import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_KEY } from './app.consts';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(protected http: HttpClient) { }

  getRequest(url: string,q?) {
    const params = new HttpParams({fromObject:{apikey: API_KEY,q,metric:'true'}});
    return this.http.get(url,{params});
  }
  getGeoPosition(lat:number,lng:number) {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search`;
    return this.getRequest(url,`${lat},${lng}`);
  }
  getAutoComplete(key: string): Observable<any> {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete`;
    return this.getRequest(url, `${key}`);
  }

  get5DaysOfForecasts(key: string): Observable<any> {
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}`;
    return this.getRequest(url);
  }


  getCurrentConditions(key: string): Observable<any> {
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${key}`;
    return this.getRequest(url);
  }
}
