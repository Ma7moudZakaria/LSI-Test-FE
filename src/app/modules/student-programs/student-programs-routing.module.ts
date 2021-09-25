import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProgDutiesComponent } from './student-prog-duties/student-prog-duties.component';
import { StudentProgramWrapperComponent } from './student-program-wrapper/student-program-wrapper.component';

const routes: Routes = [
  { path: '', component: StudentProgramWrapperComponent },
  { path: 'Student-duty/:id/:batch/:progId', component: StudentProgDutiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProgramsRoutingModule { }
