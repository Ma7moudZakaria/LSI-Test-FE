import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScientificMaterialRoutingModule } from './scientific-material-routing.module';
import { AddScientificMaterialComponent } from './scientific-material/add-scientific-material/add-scientific-material.component';


@NgModule({
  declarations: [AddScientificMaterialComponent],
  imports: [
    CommonModule,
    ScientificMaterialRoutingModule
  ]
})
export class ScientificMaterialModule { }
