import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentProgramsComponent} from './student-programs/student-programs.component';

const routes: Routes = [

  { path: '', component: StudentProgramsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProgramSubscriptionRoutingModule { }
