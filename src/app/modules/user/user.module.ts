import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ViewUserProfileDetailsComponent } from './components/view-user-profile-details/view-user-profile-details';

import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [UpdateUserProfileComponent,ViewUserProfileDetailsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    CommonModule ,
    FormsModule,
    TranslateModule
  ]
})
export class UserModule { }
