import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CustomeCardComponent } from './components/custome-card/custome-card.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [ConfirmModalComponent, CustomeCardComponent],
  imports: [
    CommonModule,
    MatButtonModule, MatDialogModule, MatCardModule
  ],
  exports: [
    MatButtonModule, MatDialogModule, MatCardModule, CustomeCardComponent
  ]
})
export class SharedModule { }
