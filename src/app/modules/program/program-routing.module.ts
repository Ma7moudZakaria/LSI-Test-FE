import { ProgramDetailsComponent } from './components/program-details/program-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProgramComponent } from './components/add-program/add-program.component';

const routes: Routes = [


  { path: '', component: ProgramDetailsComponent },
  { path: 'add-program', component: AddProgramComponent }


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
