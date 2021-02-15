import { Pipe, PipeTransform } from '@angular/core';
export const IMG_URL = `https://developer.accuweather.com/sites/default/files`;
@Pipe({
  name: 'accuweatherIcon'
})
export class AccuweatherIconPipe implements PipeTransform {

  transform(value: any): any {
    if (value < 10) {
      value = `0${value}`;
    }
    return `${IMG_URL}/${value}-s.png`;
  }

}
