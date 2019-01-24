import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { loginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WelcomeComponent } from './home/welcome.component';
import { from } from 'rxjs';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { IFSDataComponent } from './ifs-data/ifs-data.component';
import { OperationalDataComponent } from './operational-data/operational-data.component';
import { IfsRecordComponent } from './ifs-record/ifs-record.component';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { AuthGuard } from './auth.guard'
@NgModule({
  // which of our components belong to this array
  declarations: [
    AppComponent, loginComponent, DashboardComponent, ChangePasswordComponent, WelcomeComponent, ForgotPasswordComponent, IFSDataComponent, OperationalDataComponent, IfsRecordComponent, OnlyNumbersDirective
  ],
  // external modules that we want to be available to all of the components that belong to this module
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: loginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'dashboard', canActivate: [AuthGuard] , component: DashboardComponent },
      { path: 'dashboard/ifs', component: DashboardComponent  },
      { path: 'operational', component: OperationalDataComponent },
      { path: 'welcome', component: WelcomeComponent  },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ])
  ],
  providers: [AuthGuard],
  // defines the startup component of the application (should contain selector)
  bootstrap: [AppComponent]
})
export class AppModule { }
