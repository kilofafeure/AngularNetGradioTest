import { Component } from '@angular/core';
import { WeatherForecast } from '../app/pages/weatherforecast/weatherforecast.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [WeatherForecast]
})
export class AppComponent
{
  constructor() {}
}
