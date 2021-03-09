import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent , outlet: 'baseRouter'},
  { path: 'register', component: RegisterComponent, outlet: 'baseRouter' },
  { path: 'forget-password', component: ForgotPasswordComponent, outlet: 'baseRouter' },
  { path: 'reset-password', component: ResetPasswordComponent, outlet: 'baseRouter' },
  { path: 'activate-code', component: ActivateUserComponent, outlet: 'baseRouter' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
