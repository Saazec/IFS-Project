import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'pm-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  invalidEmail: boolean = false;
  validEmail: boolean = false;
  validateEmail(email) {
    var emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( emailRegx.test(String(email).toLowerCase())) {
      this.invalidEmail = false;
    } else {
      this.invalidEmail = true;
    }
  }

  sendMail(email) {
    if(email && !this.invalidEmail) {
      this.validEmail = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000)
    } else {
      this.invalidEmail = true;
      return;
    }
  }
}
