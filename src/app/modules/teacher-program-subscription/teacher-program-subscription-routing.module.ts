import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherProgramsComponent } from './teacher-programs/teacher-programs.component';

const routes: Routes = [

  { path: '', component: TeacherProgramsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherProgramSubscriptionRoutingModule { }
