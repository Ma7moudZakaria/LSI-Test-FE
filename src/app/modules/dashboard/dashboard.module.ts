import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherRecitationRequestComponent } from './components/teacher-dashboard/teacher-recitation-request/teacher-recitation-request.component';
import { TeacherDailyUpcomingTasksComponent } from './components/teacher-dashboard/teacher-daily-upcoming-tasks/teacher-daily-upcoming-tasks.component';
import { TeacherFeelingsComponent } from './components/teacher-dashboard/teacher-feelings/teacher-feelings.component';
import { TeacherAvailableAppointmentsComponent } from './components/teacher-dashboard/teacher-available-appointments/teacher-available-appointments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import { AddTeacherAppointmentRequestComponent } from './components/teacher-dashboard/teacher-available-appointments/add-teacher-appointment-request/add-teacher-appointment-request.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { TeacherAppointmentRequestDatailsComponent } from './components/teacher-dashboard/teacher-available-appointments/teacher-appointment-request-datails/teacher-appointment-request-datails.component';
import { TeacherRateForStudentComponent } from './components/teacher-dashboard/teacher-rate-for-student/teacher-rate-for-student.component';


@NgModule({
  declarations: [DashboardComponent, TeacherDashboardComponent, TeacherRecitationRequestComponent, TeacherDailyUpcomingTasksComponent, TeacherFeelingsComponent, TeacherAvailableAppointmentsComponent, AddTeacherAppointmentRequestComponent, TeacherAppointmentRequestDatailsComponent, TeacherRateForStudentComponent],
  imports: [
    CommonModule, SharedModule,
    DashboardRoutingModule, TranslateModule, FormsModule, MatInputModule
  ]
})
export class DashboardModule { }
