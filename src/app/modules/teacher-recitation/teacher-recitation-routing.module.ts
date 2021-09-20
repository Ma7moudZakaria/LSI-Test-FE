import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherRecitationWrapperComponent } from './components/teacher-recitation-wrapper/teacher-recitation-wrapper.component';

const routes: Routes = [
  { path: '', component: TeacherRecitationWrapperComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRecitationRoutingModule { }
