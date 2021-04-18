import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile';
import { ViewUserProfileDetailsComponent } from './components/view-user-profile-details/view-user-profile-details';

const routes: Routes = [
  {
    path: '',
    children: [
      // { path: 'complete-user-profile', component: UserProfileComponent},
      // { path: 'update-user-profile/:id', component: UserProfileComponent},
      { path: 'update-user-profile', component: UpdateUserProfileComponent},
      { path: 'update-user-profile-details/:id', component: ViewUserProfileDetailsComponent},
      { path: 'view-user-profile-details', component: ViewUserProfileDetailsComponent},
     ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
