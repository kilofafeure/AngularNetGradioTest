import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AIService {
  constructor(private http: HttpClient) {}

  predict(endpoint: string, data: any) {
    return this.http.post(endpoint, data);
  }
}
