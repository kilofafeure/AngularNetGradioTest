import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { WeatherForecastInt } from '../model/interfaces/weatherforecast.interface'

@Injectable({
  providedIn: 'root'
})

export class WeatherForecastService {
  constructor(private http: HttpClient) { }

  getForecasts(): Observable<WeatherForecastInt[]> {
    return this.http.get<WeatherForecastInt[]>('/weatherforecast').pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }
}
