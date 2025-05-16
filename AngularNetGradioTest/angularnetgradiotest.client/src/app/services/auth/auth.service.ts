import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(this: any, data: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      }));
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  };
}



//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { Observable, catchError, throwError } from 'rxjs';

//@Injectable({
//  providedIn: 'root'
//})

//export class AuthService {

//  constructor(private http: HttpClient) { }

//  login(user: string, password: string): Observable<boolean> {
//    return this.http.get<boolean>('/weatherforecast').pipe(
//      catchError(error => {
//        console.error('Error occurred:', error);
//        return throwError(() => error);
//      })
//    );
//  }
//}
