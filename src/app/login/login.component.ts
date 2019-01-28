import { Component, OnInit } from "@angular/core";
import { invalid } from "@angular/compiler/src/render3/view/util";
import { Router } from '@angular/router';
import { from } from "rxjs";
import { AuthServiceService } from "../auth-service.service";

@Component({
    selector: 'login-form',
    templateUrl: './login.component.html'
})
export class loginComponent implements OnInit {

    loginModel: any = {};

    constructor(private authService: AuthServiceService, private router: Router) { }
    userErrorMsg: boolean = false;
    passwordErrorMsg: boolean = false;
    roleErrorMsg: boolean = false;
    invalidMsg: boolean = false;
    toggle(errorMsg) {
        console.log(errorMsg);
    }
    ngOnInit() {
        if(this.authService.checkIfLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }
    authorize(event, userName, password, role) {
        if (!userName) {
            this.userErrorMsg = !this.userErrorMsg;
            return;
        } else if (!password) {
            this.passwordErrorMsg = !this.passwordErrorMsg;
            return;
        } else if (!role) {
            this.roleErrorMsg = !this.roleErrorMsg;
            return;
        } else {
            if (userName === 'jhon' && password === 'whik' && role === 'user') {
                this.authService.setUserData({
                    name: 'Jhon Whik',
                    role: 'user'
                });
                this.router.navigate(['/dashboard']);
                this.authService.setLoggedIn(true);
            } else {
                this.invalidMsg = true;
            }
        }
    }
}