import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { AddProgramComponent } from './add-program/add-program/add-program.component';
import { ProgramsViewComponent } from './programs-view/programs-view/programs-view.component';
import { ProgramDetailsComponent } from './program-details/program-details/program-details.component';


@NgModule({
  declarations: [AddProgramComponent, ProgramsViewComponent, ProgramDetailsComponent],
  imports: [
    CommonModule,
    ProgramRoutingModule
  ]
})
export class ProgramModule { }
