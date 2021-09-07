import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentTabRoutingModule } from './admin-student-tab-routing.module';
import { AdminStudentComponent } from './components/admin-student/admin-student.component';
import { AdminStudentListComponent } from './components/admin-student/admin-student-list/admin-student-list.component';
import { AdminStudentTabsDetailsComponent } from './components/admin-student/admin-student-tabs-details/admin-student-tabs-details.component';
import { AdminStudentProgramComponent } from './components/admin-student/admin-student-tabs-details/admin-student-program/admin-student-program.component';
import { AdminStudentDropOutComponent } from './components/admin-student/admin-student-tabs-details/admin-student-drop-out/admin-student-drop-out.component';
import { AdminStudentBasicInfoComponent } from './components/admin-student/admin-student-tabs-details/admin-student-basic-info/admin-student-basic-info.component';
import { AdminStudentVacationRequestComponent } from './components/admin-student/admin-student-tabs-details/admin-student-vacation-request/admin-student-vacation-request.component';
import { AdminStudentJoinRequestComponent } from './components/admin-student/admin-student-tabs-details/admin-student-join-request/admin-student-join-request.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '../../shared/shared.module';
import { AdminStudentProgramListComponent } from './components/admin-student/admin-student-tabs-details/admin-student-program/admin-student-program-list/admin-student-program-list.component';
import { AdminStudentProgramTaskComponent } from './components/admin-student/admin-student-tabs-details/admin-student-program/admin-student-program-task/admin-student-program-task.component';
import { AdminStudentProgramDailyTaskComponent } from './components/admin-student/admin-student-tabs-details/admin-student-program/admin-student-program-daily-task/admin-student-program-daily-task.component';
import { AdminStudentProgramOverlayAddprogramComponent } from './components/admin-student/admin-student-tabs-details/admin-student-program/admin-student-program-overlay-addprogram/admin-student-program-overlay-addprogram.component';

@NgModule({
  declarations: [AdminStudentComponent, AdminStudentListComponent, AdminStudentTabsDetailsComponent, AdminStudentProgramComponent, AdminStudentDropOutComponent, AdminStudentBasicInfoComponent, AdminStudentVacationRequestComponent, AdminStudentJoinRequestComponent, AdminStudentProgramListComponent, AdminStudentProgramTaskComponent, AdminStudentProgramDailyTaskComponent, AdminStudentProgramOverlayAddprogramComponent],
  imports: [
    CommonModule,
    AdminStudentTabRoutingModule,
    TranslateModule,
    FormsModule,
    MatCheckboxModule,
    SharedModule
  ]
})
export class AdminStudentTabModule { }
