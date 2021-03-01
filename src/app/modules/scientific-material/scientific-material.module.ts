import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScientificMaterialRoutingModule } from './scientific-material-routing.module';
import { AddScientificMaterialComponent } from './scientific-material/add-scientific-material/add-scientific-material.component';
import { TstComponent } from './tst/tst.component';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

@NgModule({
    declarations: [TstComponent, AddScientificMaterialComponent],
  imports: [
    CommonModule,
    ScientificMaterialRoutingModule,
    TranslateModule
  ]
})
export class ScientificMaterialModule { }
