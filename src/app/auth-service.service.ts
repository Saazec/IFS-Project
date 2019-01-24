import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedInStatus: boolean = false;
  constructor() { }

  // using Behaviour Subject
  private status = new BehaviorSubject<boolean>(false);
  status$ = this.status.asObservable()

  set loggedIn(value: boolean) {
    this.status.next(value);
  }

  get loggedIn() {
    return this.status.getValue();
  }
  setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.loggedInStatus = true;
    this.loggedIn = true;
  }
  getUserData() {
    let userData = localStorage.getItem('userData');
    if(userData) {
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
    if(localStorage.getItem('userData')) {
      this.loggedInStatus = false;
      localStorage.removeItem('userData');
      this.loggedIn = false;
    }
  }
}
