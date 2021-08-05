import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProgramWrapperComponent } from './student-program-wrapper/student-program-wrapper.component';

const routes: Routes = [
  { path: '', component: StudentProgramWrapperComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProgramsRoutingModule { }
