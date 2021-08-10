import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentProgramsComponent} from './student-programs/student-programs.component';
import {StudentProgramSubViewComponent} from './student-program-sub-view/student-program-sub-view.component';

const routes: Routes = [

  { path: '', component: StudentProgramsComponent },

  { path: 'student_pro_sub_deatils/:id', component: StudentProgramSubViewComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProgramSubscriptionRoutingModule { }
