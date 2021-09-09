import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherProgramWrapperComponent } from './teacher-program-wrapper/teacher-program-wrapper.component';

const routes: Routes = [
  { path: '', component: TeacherProgramWrapperComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherProgramsRoutingModule { }
