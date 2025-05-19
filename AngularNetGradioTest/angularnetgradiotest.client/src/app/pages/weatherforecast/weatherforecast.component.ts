import { Component, OnInit } from '@angular/core';
import { WeatherForecastInt } from '../../model/interfaces/weatherforecast.interface';
import { WeatherForecastService } from '../../services/weatherforecast.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css',
  standalone: true,
  imports: [ CommonModule ]
})
export class WeatherForecast implements OnInit { 
  forecasts$: Observable<WeatherForecastInt[]> | undefined;

  constructor(private apiService: WeatherForecastService) { }

  ngOnInit(): void {
    this.forecasts$ = this.apiService.getForecasts();
  }
}
