import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleManagementViewComponent } from './role-management-view/role-management-view.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'role-management-view', component: RoleManagementViewComponent},
  

    ],        
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
