import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialRoutingModule } from './shared-material-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedMaterialComponent } from './components/shared-material/shared-material.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SharedMaterialComponent],
  imports: [
    CommonModule,
    SharedMaterialRoutingModule,
    SharedModule, TranslateModule
  ]
})
export class SharedMaterialModule { }
