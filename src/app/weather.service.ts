import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { AppService } from './app.service';
import { CurrentConditions } from './models/current-conditions';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WeatherService extends ObservableStore<{}>{

  constructor(protected _app: AppService) {
    super({trackStateHistory: true})
  }
  add(favCity) {
    const state = this.getState() || {};

    this._app.getCurrentConditions(favCity.key)
      .pipe(map((data) => data[0]))
      .subscribe((data: CurrentConditions) => {
          state[favCity.key] = {
            title: favCity.cityName,
            text: data.WeatherText,
            temperature: data.Temperature,
            icon: data.WeatherIcon
          };
          console.log(state);
          this.setState(state,
            'add_favCity');
        }
      );


  }

  remove(favCity) {
    const state = this.getState() || {};
    delete state[favCity.key];
    this.setState(state,
      'remove_favCity');
  }

  get() {
    return this.getState() || {};
  }
}
