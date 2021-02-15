import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { ADD_FAV, DEFAULT_LAT, DEFAULT_LNG, REMOVE_FAV } from '../app.consts';
import { AppService } from '../app.service';
import { DailyForecast, FiveDaysForecast } from '../models/5-days-forecast';
import { AutoCompleteSuggestions } from '../models/auto-complete-suggestions';
import { GeoPositionRes } from '../models/geo-position';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  autoCompleteInput = new Subject();
  autoCompleteValue;
  autoCompletedSuggestions: AutoCompleteSuggestions[];
  cityName: string;
  headLine: string;
  forecasts: DailyForecast[];
  favState;
  selectedKey: any;
  ngUnSubscribe: Subject<void> = new Subject<void>();
  constructor(private _app: AppService, private _weather: WeatherService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this._app
          .getGeoPosition(latitude, longitude)
          .subscribe((data: GeoPositionRes) => {
            this.handleInitPosition(data);
          });
      });
    } else {
      this._app
        .getGeoPosition(DEFAULT_LAT, DEFAULT_LNG)
        .subscribe((data: GeoPositionRes) => {
          this.handleInitPosition(data);
        });
    }
    this.autoCompleteInput
      .pipe(
        filter((data: string) => data.length > 0),
        takeUntil(this.ngUnSubscribe),
        debounceTime(300),
        switchMap((data: string) => {
          return this._app.getAutoComplete(data);
        })
      )
      .subscribe((suggestions: AutoCompleteSuggestions[]) => {
        this.autoCompletedSuggestions = suggestions;
      });
  }
  private handleInitPosition(geoPositionRes: GeoPositionRes) {
    this.favState = this.getFavState(geoPositionRes.Key);
    this.cityName = `${geoPositionRes.ParentCity.EnglishName},${geoPositionRes.Country.EnglishName}`;
    this.getFiveDays(geoPositionRes.Key);
  }
  private getFavState(Key: string) {
    const storeState = this._weather.get();
    return storeState[Key] ? REMOVE_FAV : ADD_FAV;
  }
  getFiveDays(key) {
    this.selectedKey = key;
    this._app
      .get5DaysOfForecasts(key)
      .subscribe((fiveDaysForecastData: FiveDaysForecast) => {
        this.headLine = fiveDaysForecastData.Headline.Text;
        this.forecasts = fiveDaysForecastData.DailyForecasts;
      });
  }
  selectSuggestion(suggestion: AutoCompleteSuggestions) {
    this.favState = this.getFavState(suggestion.Key);
    this.cityName = `${suggestion.LocalizedName},${suggestion.Country.LocalizedName}`;
    this.autoCompleteValue = this.cityName;
    this.getFiveDays(suggestion.Key);
    this.autoCompletedSuggestions = null;
  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
  toggleFavorites() {
    const faveState = this.getFavState(this.selectedKey);
    const selectedCity = {
      key: this.selectedKey,
      cityName: this.cityName,
    };
    if (faveState === ADD_FAV) {
      this._weather.add(selectedCity);
    } else {
      this._weather.remove(selectedCity);
    }

    this.favState = faveState === ADD_FAV ? REMOVE_FAV : ADD_FAV;
  }
}
