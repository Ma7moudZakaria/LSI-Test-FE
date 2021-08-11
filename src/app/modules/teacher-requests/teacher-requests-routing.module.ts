import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherRequestsViewComponent } from './teacher-requests-view/teacher-requests-view.component';
import { TeacherRequestsTeacherViewModule } from './teacher-requests.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'teacher-requests-view', component: TeacherRequestsViewComponent}
     ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRequestsTeacherViewRoutingModule { }
