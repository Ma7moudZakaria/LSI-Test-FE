import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStuTabComponent } from './admin-stu-tab/admin-stu-tab.component'

const routes: Routes = [
  { path: '', component: AdminStuTabComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStuTabRoutingModule { }
