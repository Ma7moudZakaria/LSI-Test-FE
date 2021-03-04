import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialRoutingModule } from './shared-material-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { SharedMaterialComponent } from './components/shared-material/shared-material.component';


@NgModule({
  declarations: [SharedMaterialComponent],
  imports: [
    CommonModule,
    SharedMaterialRoutingModule,
    MatRadioModule, MatCheckboxModule, MatCardModule
  ]
})
export class SharedMaterialModule { }
