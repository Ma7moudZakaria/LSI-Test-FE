import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScientificMaterialRoutingModule } from './scientific-material-routing.module';
import { TstComponent } from './tst/tst.component';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [TstComponent],
  imports: [
    CommonModule,
    ScientificMaterialRoutingModule,
    TranslateModule
  ]
})
export class ScientificMaterialModule { }
