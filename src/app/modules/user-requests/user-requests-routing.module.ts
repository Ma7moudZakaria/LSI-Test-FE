import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRequestsCategoriesViewComponent } from './components/user-requests-view/user-requests-categories-view/user-requests-categories-view.component';
import { UserRequestViewComponent } from './components/user-requests-view/user-requests-view/user-requests-questions-view.component';
import { UserRequestsViewComponent } from './components/user-requests-view/user-requests-view.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'user-requests-view', component: UserRequestsViewComponent},
      { path: 'user-requests-categories-view', component: UserRequestsCategoriesViewComponent},
      { path: 'user-request-view', component: UserRequestViewComponent},
     ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRequestsRoutingModule { }
