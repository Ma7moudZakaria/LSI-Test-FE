import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScientificMaterialComponent } from './components/scientific-material-view/add-scientific-material/add-scientific-material.component';
import { ScientificMaterialViewComponent } from './components/scientific-material-view/scientific-material-view.component';
import { TstComponent } from './components/tst/tst.component';
// import { ScientificMaterialViewComponent } from './scientific-material-view/scientific-material-view.component';
// import { AddScientificMaterialComponent } from './scientific-material/add-scientific-material/add-scientific-material.component';
// import { TstComponent } from './tst/tst.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'add-scientific-material', component: AddScientificMaterialComponent},
      { path: 'add-scientific-material/:id', component: AddScientificMaterialComponent},      
      { path: 'scientific-material-view', component: ScientificMaterialViewComponent},
      {path: 'tst', component: TstComponent}
        ],        
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScientificMaterialRoutingModule { }
