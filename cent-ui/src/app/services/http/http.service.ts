import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  httpUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(`${this.httpUrl}/${url}`);
  }

  post(url: string, data: any) {
    return this.http.post(`${this.httpUrl}/${url}`, data);
  }

  put(url: string, data: any) {
    return this.http.put(`${this.httpUrl}/${url}`, data);
  }

  delete(url: string) {
    return this.http.delete(`${this.httpUrl}/${url}`);
  }
}
