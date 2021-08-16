import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VacationsRequestsViewComponent} from './components/vacations-requests-view/vacations-requests-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'student-vacation-request-view', component: VacationsRequestsViewComponent},
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationsRoutingModule { }
