import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseurl: string = '/api/';

  postData(url, data): Observable<any> {
    if (localStorage.getItem('userData')) {
      data.userName = JSON.parse(localStorage.getItem('userData')).userName || '';
      data.token = JSON.parse(localStorage.getItem('userData')).tokenId || '';
    }
    return this.http.post(this.baseurl + url, data, {});
  }
}
