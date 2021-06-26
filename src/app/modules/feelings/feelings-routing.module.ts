import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeelingsViewComponent } from './feelings-view/feelings-view.component';

const routes: Routes = [

  { path: '', component: FeelingsViewComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeelingsRoutingModule { }
