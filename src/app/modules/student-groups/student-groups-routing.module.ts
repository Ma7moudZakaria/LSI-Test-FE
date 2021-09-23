import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentGroupsViewComponent } from './components/student-groups-view/student-groups-view.component';

const routes: Routes = [
  { path: '', component: StudentGroupsViewComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentGroupsRoutingModule { }
