import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherForecastInt } from '../../model/interfaces/weatherforecast.interface'

@Component({
  selector: 'app-weaterforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css',
  standalone: true,
})

export class WeatherForecast implements OnInit {
  public forecasts: WeatherForecastInt[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecastInt[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'angularnetgradiotest.client';
}
