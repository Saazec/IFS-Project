import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthServiceService } from "./auth-service.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthServiceService, private router: Router) { }
  isLoggedIn: boolean = this.authService.isLoggedIn;

  loggedInStatus: boolean;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.authService.status$
      .subscribe(value => this.loggedInStatus = value)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.setLoggedIn(false);
    this.authService.destroyUserData();
    this.router.navigate(['/login']);
  }
}