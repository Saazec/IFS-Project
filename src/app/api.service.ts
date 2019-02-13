import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseurl: string = '/api/';

  headers = {
    token: '',
    username: ''
  };
  postData(url: string, data): Observable<any> {
    if (localStorage.getItem('userData')) {
      // data.userName = JSON.parse(localStorage.getItem('userData')).userName || '';
      // data.token = JSON.parse(localStorage.getItem('userData')).tokenId || '';
      this.headers.token = JSON.parse(localStorage.getItem('userData')).tokenId || '';
      this.headers.username = JSON.parse(localStorage.getItem('userData')).userName || '';
    }
    return this.http.post(this.baseurl + url, data, {headers: this.headers});
  }

  getData(url: string): Observable<any> {
    if (localStorage.getItem('userData')) {
      this.headers.token = JSON.parse(localStorage.getItem('userData')).tokenId || '';
      this.headers.username = JSON.parse(localStorage.getItem('userData')).userName || '';
    }
    return this.http.get(this.baseurl + url, {headers: this.headers});
  }
}
