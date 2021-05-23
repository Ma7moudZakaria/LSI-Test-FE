import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { AddProgramComponent } from './components/add-program/add-program.component';
import { ProgramsViewComponent } from './components/programs-view/programs-view.component';
import { ProgramDetailsComponent } from './components/program-details/program-details.component';
import { WrapperProgramComponent } from './components/wrapper-program/wrapper-program.component';
import { ProgramsListComponent } from './components/wrapper-program/programs-list/programs-list.component';
import { ProgramsTypeComponent } from './components/wrapper-program/programs-type/programs-type.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [AddProgramComponent, ProgramsViewComponent, ProgramDetailsComponent, WrapperProgramComponent, ProgramsListComponent, ProgramsTypeComponent],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class ProgramModule { }
