import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TstComponent } from './tst/tst.component';

const routes: Routes = [
  {
    path: 'tst' , component:TstComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScientificMaterialRoutingModule { }
