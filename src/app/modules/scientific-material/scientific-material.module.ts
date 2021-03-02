import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScientificMaterialRoutingModule } from './scientific-material-routing.module';
import { AddScientificMaterialComponent } from './scientific-material/add-scientific-material/add-scientific-material.component';
import { ScientificMaterialViewComponent } from './scientific-material-view/scientific-material-view.component';
import { TstComponent } from './tst/tst.component';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

@NgModule({
    declarations: [AddScientificMaterialComponent, ScientificMaterialViewComponent, TstComponent],
  imports: [
    CommonModule,
    ScientificMaterialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ScientificMaterialModule { }
