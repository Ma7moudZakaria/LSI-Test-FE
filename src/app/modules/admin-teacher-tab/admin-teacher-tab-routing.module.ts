import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTeacherTabComponent } from './admin-teacher-tab/admin-teacher-tab.component'

const routes: Routes = [
  { path: '', component: AdminTeacherTabComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTeacherTabRoutingModule { }
