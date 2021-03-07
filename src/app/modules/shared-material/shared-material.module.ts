import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialRoutingModule } from './shared-material-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedMaterialComponent } from './components/shared-material/shared-material.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CustomeCardComponent } from 'src/app/shared/components/custome-card/custome-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';


@NgModule({
  declarations: [SharedMaterialComponent],
  imports: [
    CommonModule,
    SharedMaterialRoutingModule,
    SharedModule,
    MatRadioModule, MatCheckboxModule, MatExpansionModule, DragDropModule
  ]
})
export class SharedMaterialModule { }
