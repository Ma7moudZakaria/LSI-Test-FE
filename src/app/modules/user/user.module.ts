import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ViewUserProfileDetailsComponent } from './components/view-user-profile-details/view-user-profile-details';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { ViewAllUsersComponent } from './components/view-all-users/view-all-users';


@NgModule({
  declarations: [UserProfileComponent,ViewUserProfileDetailsComponent,ViewAllUsersComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
