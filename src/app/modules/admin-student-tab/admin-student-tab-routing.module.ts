import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentComponent } from './components/admin-student/admin-student.component';

const routes: Routes = [
  {
    path: '', component: AdminStudentComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStudentTabRoutingModule { }
