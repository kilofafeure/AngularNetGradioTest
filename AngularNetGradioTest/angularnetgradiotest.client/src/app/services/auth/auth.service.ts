import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, BehaviorSubject } from 'rxjs';
import { LoginResponseInt } from '../../model/interfaces/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  router = inject(Router);

  login(this: any, data: any): Observable<LoginResponseInt>  {
    return this.httpClient.post(`/api/Login`, data)
      .pipe(
        tap((result: LoginResponseInt) => {
          if (result.errorId == null) {
            this.loggedIn.next(true);
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
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  };
}
