import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent implements OnInit {

  constructor(protected _weather: WeatherService, protected _app: AppService) {
  }
  ngUnSubscribe: Subject<void> = new Subject<void>();

  favArr = [];

  ngOnInit() {
    this._weather.stateChanged
      .pipe(
        takeUntil(this.ngUnSubscribe),
        filter(state => state !== null)
      )
      .subscribe(state => {
        Object.keys(state).map((key) => {
          this.favArr.push(state[key]);
        });
      });
  }

}
