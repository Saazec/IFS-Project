import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordData: any = {};
  constructor(private router: Router) { }

  ngOnInit() {
  }

  currentPasswordErr: boolean = false;
  pass1ErrorMsg: boolean = false;
  reenteredErrorMsg: boolean = false;
  invalidMsg: boolean = false;
  validMsg: boolean = false;
  changePassword(event, currentPassword, password, reentered) {
    if (!currentPassword) {
      this.currentPasswordErr = true;
      return;
    } else if (!password) {
      this.pass1ErrorMsg = true;
      return;
    } else if (!reentered) {
      this.reenteredErrorMsg = true;
      return;
    } else {
      if (currentPassword !== 'whik' || password != reentered) {
        this.invalidMsg = true;
        return
      } else {
        this.validMsg = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }
    }
  }
}
