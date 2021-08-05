import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherProgramsComponent } from './components/teacher-dashboard/teacher-programs/teacher-programs.component';
import { TeacherRecitationRequestComponent } from './components/teacher-dashboard/teacher-recitation-request/teacher-recitation-request.component';
import { TeacherDailyUpcomingTasksComponent } from './components/teacher-dashboard/teacher-daily-upcoming-tasks/teacher-daily-upcoming-tasks.component';
import { TeacherFeelingsComponent } from './components/teacher-dashboard/teacher-feelings/teacher-feelings.component';
import { TeacherAvailableAppointmentsComponent } from './components/teacher-dashboard/teacher-available-appointments/teacher-available-appointments.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DashboardComponent, TeacherDashboardComponent, TeacherProgramsComponent, TeacherRecitationRequestComponent, TeacherDailyUpcomingTasksComponent, TeacherFeelingsComponent, TeacherAvailableAppointmentsComponent],
  imports: [
    CommonModule,SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
