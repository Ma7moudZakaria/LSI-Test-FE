import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperProgramComponent } from './components/wrapper-program/wrapper-program.component';

const routes: Routes = [


  { path: '', component: WrapperProgramComponent },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
