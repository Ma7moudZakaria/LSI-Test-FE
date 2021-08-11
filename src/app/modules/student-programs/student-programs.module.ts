import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProgramsRoutingModule } from './student-programs-routing.module';
import { StudentProgramsComponent } from './student-program-wrapper/student-programs/student-programs.component';
import { HonoraryBoardComponent } from './student-program-wrapper/honorary-board/honorary-board.component';
import { ProgramSubscriptionsComponent } from './student-program-wrapper/program-subscriptions/program-subscriptions.component';
import { StatisticsComponent } from './student-program-wrapper/statistics/statistics.component';
import { StudentProgramWrapperComponent } from './student-program-wrapper/student-program-wrapper.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [StudentProgramsComponent, HonoraryBoardComponent, ProgramSubscriptionsComponent, StatisticsComponent, StudentProgramWrapperComponent],
  imports: [
    CommonModule, SharedModule,
    StudentProgramsRoutingModule
  ]
})
export class StudentProgramsModule { }
