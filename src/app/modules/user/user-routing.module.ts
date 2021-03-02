import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { ViewAllUsersComponent } from './components/view-all-users/view-all-users';
import { ViewUserProfileDetailsComponent } from './components/view-user-profile-details/view-user-profile-details';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'complete-user-profile', component: UserProfileComponent},
      { path: 'update-user-profile/:id', component: UserProfileComponent},
      { path: 'update-user-profile-details/:id', component: ViewUserProfileDetailsComponent},
      { path: 'view-all-users', component: ViewAllUsersComponent},
     ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
