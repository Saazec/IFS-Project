import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedInStatus: boolean = this.checkIfLoggedIn();
  constructor(private apiService: ApiService, private router: Router) { }

  // using Behaviour Subject
  private status = new BehaviorSubject<boolean>(this.checkIfLoggedIn());
  status$ = this.status.asObservable()

  set loggedIn(value: boolean) {
    this.status.next(value);
  }

  get loggedIn() {
    return this.status.getValue();
  }
  setUserData(userData) {
     this.apiService.postData('token', userData).subscribe(tokenData => {
      console.log(tokenData);
      localStorage.setItem('userData', JSON.stringify(tokenData));
      this.loggedInStatus = true;
      this.loggedIn = true;
      this.router.navigate(['/dashboard']);
    })
    // localStorage.setItem('userData', JSON.stringify(userData));

  }
  getUserData() {
    let userData = localStorage.getItem('userData');
    if (userData) {
      console.log(userData);
      this.loggedInStatus = true;
    }
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  setLoggedIn(value) {
    this.loggedInStatus = value;
  }

  destroyUserData() {
    if (localStorage.getItem('userData')) {
      this.loggedInStatus = false;
      localStorage.removeItem('userData');
      this.loggedIn = false;
    }
  }
  checkIfLoggedIn(): boolean {
    if (localStorage.getItem('userData')) {
      return true;
    } else {
      return false
    }
  }
}
