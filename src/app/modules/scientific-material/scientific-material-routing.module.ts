import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScientificMaterialViewComponent } from './scientific-material-view/scientific-material-view.component';
import { AddScientificMaterialComponent } from './scientific-material/add-scientific-material/add-scientific-material.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'add-scientific-material', component: AddScientificMaterialComponent},
      { path: 'add-scientific-material/:id', component: AddScientificMaterialComponent},      
      { path: 'scientific-material-view', component: ScientificMaterialViewComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScientificMaterialRoutingModule { }
