import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseurl: string = '/api/';


  headers = {
    Authorization: ''
  };

  postData(url: string, data): Observable<any> {
    if (localStorage.getItem('userData')) {
      this.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token || '';
    }
    return this.http.post(this.baseurl + url, data, { headers: this.headers });
  }

  getData(url: string): Observable<any> {
    if (localStorage.getItem('userData')) {
      this.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token || '';
    }
    return this.http.get(this.baseurl + url, { headers: this.headers });
  }

  putData(url: string, data): Observable<any> {
    if (localStorage.getItem('userData')) {
      this.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token || '';
    }
    return this.http.patch(this.baseurl + url, data, { headers: this.headers });
  }

  deleteData(url: string): Observable<any> {
    if (localStorage.getItem('userData')) {
      this.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token || '';
    }
    return this.http.delete(this.baseurl + url, { headers: this.headers });
  }
}
