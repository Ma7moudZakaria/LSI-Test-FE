import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherProgramSubViewComponent } from './teacher-program-sub-view/teacher-program-sub-view.component';
import { TeacherProgramsComponent } from './teacher-programs-for-subscription/teacher-programs-for-subscription.component';

const routes: Routes = [

  { path: '', component: TeacherProgramsComponent },

  { path: 'teacher_pro_sub_deatils/:id/:batch', component: TeacherProgramSubViewComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherProgramSubscriptionRoutingModule { }
