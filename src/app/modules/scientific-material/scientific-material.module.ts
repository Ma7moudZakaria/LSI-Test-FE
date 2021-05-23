import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScientificMaterialRoutingModule } from './scientific-material-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { AddScientificMaterialComponent } from './components/scientific-material-view/add-scientific-material/add-scientific-material.component';
import { ScientificMaterialViewComponent } from './components/scientific-material-view/scientific-material-view.component';
import { TstComponent } from './components/tst/tst.component';
import { MaterialListComponent } from './components/scientific-material-view/material-list/material-list.component';
import { ProgramsListComponent } from './components/scientific-material-view/programs-list/programs-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [AddScientificMaterialComponent, ScientificMaterialViewComponent, TstComponent, MaterialListComponent, ProgramsListComponent],
  imports: [
    CommonModule,
    ScientificMaterialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule, MatTooltipModule
  ], providers: [MatTooltipModule]
})
export class ScientificMaterialModule { }
