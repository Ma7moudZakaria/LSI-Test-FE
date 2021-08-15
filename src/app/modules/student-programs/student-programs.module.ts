import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsComponent } from './student-program-wrapper/statistics/statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentProgramsComponent } from './student-program-wrapper/student-programs/student-programs.component';
import { HonoraryBoardComponent } from './student-program-wrapper/honorary-board/honorary-board.component';
import { StudentProgramWrapperComponent } from './student-program-wrapper/student-program-wrapper.component';
import { StudentProgramsRoutingModule } from './student-programs-routing.module';


@NgModule({
  declarations: [StudentProgramsComponent, HonoraryBoardComponent, StatisticsComponent, StudentProgramWrapperComponent],
  imports: [
    CommonModule, SharedModule,
    StudentProgramsRoutingModule
  ]
})
export class StudentProgramsModule { }
