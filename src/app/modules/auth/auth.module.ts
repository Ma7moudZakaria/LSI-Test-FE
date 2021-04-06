import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MoveNextByMaxLengthDirective } from 'src/app/core/directive/move-next-by-max-length.directive';



@NgModule({
  declarations: [RegisterComponent, LoginComponent, ForgotPasswordComponent, ResetPasswordComponent, ActivateUserComponent,MoveNextByMaxLengthDirective],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    TranslateModule,
    
  ]
})
export class AuthModule { }
