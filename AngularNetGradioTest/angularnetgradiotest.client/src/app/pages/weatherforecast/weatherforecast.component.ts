import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { WeatherForecastInt } from '../../model/interfaces/weatherforecast.interface';
import { WeatherForecastService } from '../../services/weatherforecast.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css',
  standalone: true,
  imports: [ CommonModule ]
})
export class WeatherForecastComponent implements OnInit { 
  forecasts$: Observable<WeatherForecastInt[]> | undefined;

  constructor(private apiService: WeatherForecastService, private authService: AuthService) { }

  ngOnInit(): void {
    this.forecasts$ = this.apiService.getForecasts();
  }
}
