import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScientificMaterialRoutingModule } from './scientific-material-routing.module';
import { AddScientificMaterialComponent } from './scientific-material/add-scientific-material/add-scientific-material.component';
import { ScientificMaterialViewComponent } from './scientific-material-view/scientific-material-view.component';


@NgModule({
  declarations: [AddScientificMaterialComponent, ScientificMaterialViewComponent],
  imports: [
    CommonModule,
    ScientificMaterialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ScientificMaterialModule { }
