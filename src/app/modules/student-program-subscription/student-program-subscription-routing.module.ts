import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentProgramsForSubscriptionComponent} from './student-programs-for-subscription/student-programs-for-subscription.component';
import {StudentProgramSubViewComponent} from './student-program-sub-view/student-program-sub-view.component';

const routes: Routes = [

  { path: '', component: StudentProgramsForSubscriptionComponent },

  { path: 'student_pro_sub_deatils/:id', component: StudentProgramSubViewComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProgramSubscriptionRoutingModule { }
