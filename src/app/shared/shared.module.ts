import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CustomeCardComponent } from './components/custome-card/custome-card.component';
import { MatCardModule } from '@angular/material/card';
import { CustomAccordionComponent } from './components/custom-accordion/custom-accordion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [ConfirmModalComponent, CustomeCardComponent, CustomAccordionComponent],
  imports: [
    CommonModule,
    MatButtonModule, MatDialogModule, MatCardModule, MatExpansionModule,MatSelectModule, DragDropModule
  ],
  exports: [
    MatRadioModule, MatCheckboxModule,MatButtonModule, MatDialogModule, MatCardModule, MatExpansionModule,MatSelectModule, DragDropModule, CustomeCardComponent, CustomAccordionComponent
  ]
})
export class SharedModule { }
