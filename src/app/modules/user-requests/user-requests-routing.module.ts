import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserJoinRequestsComponent } from './components/user-requests-view/user-join-requests/user-join-requests.component';
import { UserRequestsCategoriesViewComponent } from './components/user-requests-view/user-requests-categories-view/user-requests-categories-view.component';
import { UserRequestsViewComponent } from './components/user-requests-view/user-requests-view.component';
import { UserScientificProblemComponent } from './components/user-requests-view/user-scientific-problem/user-scientific-problem.component';
import { UserWithdrawalRequestsComponent } from './components/user-requests-view/user-withdrawal-requests/user-withdrawal-requests.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'user-requests-view', component: UserRequestsViewComponent},
      // { path: 'user-requests-categories-view', component: UserRequestsCategoriesViewComponent},
      // { path: 'user-scientific-problem', component: UserScientificProblemComponent},
      // { path: 'user-join-requests', component: UserJoinRequestsComponent},
      // { path: 'user-withdrawal-requests', component: UserWithdrawalRequestsComponent},
     ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRequestsRoutingModule { }
