import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { LoginResponseInt } from '../../model/interfaces/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient) { }

  login(this: any, data: any): Observable<LoginResponseInt>  {
    return this.httpClient.post(`/Login`, data)
      .pipe(
        tap((result: LoginResponseInt) => {
          if (result.errorId == null) {
            localStorage.setItem('authUser', JSON.stringify(result));
          }
          return result.errorMessage;
        }),
        catchError(error => {
          console.log('login - error: ', error);
          return 'Unknown login error';
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
