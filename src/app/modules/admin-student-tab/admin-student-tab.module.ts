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


@NgModule({
  declarations: [AdminStudentComponent, AdminStudentListComponent, AdminStudentTabsDetailsComponent, AdminStudentProgramComponent, AdminStudentDropOutComponent, AdminStudentBasicInfoComponent, AdminStudentVacationRequestComponent, AdminStudentJoinRequestComponent],
  imports: [
    CommonModule,
    AdminStudentTabRoutingModule
  ]
})
export class AdminStudentTabModule { }
