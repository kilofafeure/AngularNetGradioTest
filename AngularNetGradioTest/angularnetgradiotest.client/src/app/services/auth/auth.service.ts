import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { LoginResponseInt } from '../../model/interfaces/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient) { }

  login(this: any, data: any): Observable<LoginResponseInt>  {
    return this.httpClient.post(`/api/Login`, data)
      .pipe(
        tap((result: LoginResponseInt) => {
          if (result.errorId == null) {
            localStorage.setItem('authUser', JSON.stringify(result));
          }
          return result;
        }),
        catchError(error => {
          let errorMsg = 'Unknown authservice.login error';
          if (error.error && error.error.errorMessage) {
            errorMsg = error.error.errorMessage;
          }
          else if (error.error) {
            errorMsg = JSON.stringify(error.error);
          }
          else {
            errorMsg = JSON.stringify(error);
          }
          return throwError(() => new Error(errorMsg));
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

function of(error: any): any {
    throw new Error('Function not implemented.');
}
