import { Component, OnInit } from '@angular/core';
import { WeatherForecastInt } from '../../model/interfaces/weatherforecast.interface';
import { WeatherForecastService } from '../../services/weatherforecast.service';

@Component({
  selector: 'app-weaterforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css',
  standalone: true,
})

export class WeatherForecast implements OnInit {
  public forecasts: WeatherForecastInt[] = [];

  constructor(private apiService: WeatherForecastService) { }

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.apiService.getForecasts().subscribe({
      next: (response) => {
        this.forecasts = response;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }
}
