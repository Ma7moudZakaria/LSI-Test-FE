import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsComponent } from './student-program-wrapper/statistics/statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentProgramsComponent } from './student-program-wrapper/student-programs/student-programs.component';
import { HonoraryBoardComponent } from './student-program-wrapper/honorary-board/honorary-board.component';
import { StudentProgramWrapperComponent } from './student-program-wrapper/student-program-wrapper.component';
import { StudentProgramsRoutingModule } from './student-programs-routing.module';
import { StudentProgDutiesComponent } from './student-prog-duties/student-prog-duties.component';
import { StudentProgramDutyDaysComponent } from './student-prog-duties/student-program-duty-days/student-program-duty-days.component';
import { StudentProgramDutyDaysTaskComponent } from './student-prog-duties/student-program-duty-days-task/student-program-duty-days-task.component';
import { StudentProgramDutyDaysTaskDetailsComponent } from './student-prog-duties/student-program-duty-days-task-details/student-program-duty-days-task-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { AddStuDutyDaysToProgramComponent } from './student-program-wrapper/student-programs/add-stu-duty-days-to-program/add-stu-duty-days-to-program.component';
import { StudentRecitationCallComponent } from './student-prog-duties/student-recitation-call/student-recitation-call.component';
import { FormsModule } from '@angular/forms';
import { AddTaskScientificProblemComponent } from './student-prog-duties/add-task-scientific-problem/add-task-scientific-problem.component';



@NgModule({
    declarations: [StudentProgramsComponent, HonoraryBoardComponent, StatisticsComponent, StudentProgramWrapperComponent, StudentProgDutiesComponent, StudentProgramDutyDaysComponent, StudentProgramDutyDaysTaskComponent, StudentProgramDutyDaysTaskDetailsComponent, AddStuDutyDaysToProgramComponent, AddTaskScientificProblemComponent, StudentRecitationCallComponent],
  imports: [
    CommonModule, SharedModule,
    StudentProgramsRoutingModule,TranslateModule, FormsModule 
  ]
})
export class StudentProgramsModule { }
