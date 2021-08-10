import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherRequestsTeacherViewModule } from './teacher-requests.module';

const routes: Routes = [
  {
    path: '',
    children: [
      // { path: 'teacher-requests-teacher-view', component: TeacherRequestsTeacherViewModule},
     ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRequestsTeacherViewRoutingModule { }
