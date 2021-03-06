import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialRoutingModule } from './shared-material-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { DialogContentExampleDialog, SharedMaterialComponent } from './components/shared-material/shared-material.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';


@NgModule({
  declarations: [SharedMaterialComponent, DialogContentExampleDialog],
  imports: [
    CommonModule,
    SharedMaterialRoutingModule,
    MatRadioModule, MatCheckboxModule, MatCardModule, MatExpansionModule, DragDropModule/*, MatDialogModule, MatDialog*/
  ]
})
export class SharedMaterialModule { }
