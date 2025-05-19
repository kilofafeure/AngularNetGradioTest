import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient) { }

  login(this: any, data: any): Observable<any>  {
    console.log('******************** login');
    console.log('data: ', data);
    return this.httpClient.post(`/Login`, data)
      .pipe(
        tap((result: any) => {
          console.log('AuthService - login - result: ', result);
          if (result.email !== '') {
            localStorage.setItem('authUser', JSON.stringify(result));
            return result;
          }
        }),
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(() => error);
        })
      );
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null && localStorage.getItem('authUser') !== '';
  };
}
