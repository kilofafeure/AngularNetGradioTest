import { Component, OnInit , OnDestroy} from '@angular/core';
import { WeatherForecastInt } from '../../model/interfaces/weatherforecast.interface';
import { WeatherForecastService } from '../../services/weatherforecast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weaterforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css',
  standalone: true,
})

export class WeatherForecast implements OnInit, OnDestroy {
  public forecasts: WeatherForecastInt[] = [];
  private getWFCSubscription: Subscription | undefined;

  constructor(private apiService: WeatherForecastService) { }

  ngOnInit() {
    this.getForecasts();
  }

  ngOnDestroy() {
    if (this.getWFCSubscription) {
      this.getWFCSubscription.unsubscribe();
    }
  }

  getForecasts() {
    this.getWFCSubscription = this.apiService.getForecasts().subscribe({
                                              next: (response) => {
                                                this.forecasts = response;
                                              },
                                              error: (err) => {
                                                console.error('Error fetching data:', err);
                                              }
                                            });
  }
}
