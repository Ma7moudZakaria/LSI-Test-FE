// import { ProgramsTabsComponent } from './components/wrapper-program/programs-type/programs-tabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { AddProgramComponent } from './components/add-program/add-program.component';
import { ProgramDetailsComponent } from './components/program-details/program-details.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ProgramsListComponent } from './components/program-details/programs-list/programs-list.component';
import { StudentsComponent } from './components/program-details/programs-tabs/students/students.component';
import { BasicInformationComponent } from './components/program-details/programs-tabs/basic-information/basic-information.component';
import { ProgressTestComponent } from './components/program-details/programs-tabs/progress-test/progress-test.component';
import { DaysComponent } from './components/program-details/programs-tabs/days/days.component';
import { JoinRequestsComponent } from './components/program-details/programs-tabs/join-requests/join-requests.component';
import { VacationRequestsComponent } from './components/program-details/programs-tabs/vacation-requests/vacation-requests.component';
import { ConditionsComponent } from './components/program-details/programs-tabs/conditions/conditions.component';
import { NotifyComponent } from './components/program-details/programs-tabs/notify/notify.component';
import { ProgramBasicInfoComponent } from './components/add-program/program-basic-info/program-basic-info.component';
import { ProgramConditionsComponent } from './components/add-program/program-conditions/program-conditions.component';
import { ProgramExamesComponent } from './components/add-program/program-exames/program-exames.component';
import { ProgramDaysComponent } from './components/add-program/program-days/program-days.component';
import { ProgramNotifacationsComponent } from './components/add-program/program-notifacations/program-notifacations.component';
import { PeriodicExameComponent } from './components/add-program/periodic-exame/periodic-exame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramNotificationViewComponent } from './components/add-program/program-notifacations/program-notification-view/program-notification-view.component';
import { AddEditNotificationComponent } from './components/add-program/program-notifacations/add-edit-notification/add-edit-notification.component';
import { ProgramsTabsComponent } from './components/program-details/programs-tabs/programs-tabs.component';
import { ExamFormsListComponent } from './components/add-program/program-exames/exam-forms-list/exam-forms-list.component';
import { ProgramAttacheExamTemplatsComponent } from './components/add-program/program-exames/program-attache-exam-templats/program-attache-exam-templats.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgramDutyDaysComponent } from './components/add-program/program-days/program-duty-days/program-duty-days.component';
import { ProgramDayTasksComponent } from './components/add-program/program-days/program-day-tasks/program-day-tasks.component';
import { ProgramDayTasksDetailsComponent } from './components/add-program/program-days/program-day-tasks-details/program-day-tasks-details.component';
import { AddProgramDayTasksComponent } from './components/add-program/program-days/add-program-day-tasks/add-program-day-tasks.component';

@NgModule({
  declarations: [AddEditNotificationComponent,
    AddProgramComponent,
    ProgramDetailsComponent,
    ProgramDetailsComponent,
    ProgramsListComponent,
    BasicInformationComponent,
    StudentsComponent,
    ProgressTestComponent,
    DaysComponent,
    JoinRequestsComponent,
    VacationRequestsComponent,
    ConditionsComponent,
    NotifyComponent,
    ProgramBasicInfoComponent,
    ProgramConditionsComponent,
    ProgramExamesComponent,
    ProgramDaysComponent,
    ProgramNotifacationsComponent,
    PeriodicExameComponent,
    ProgramNotificationViewComponent,
    ProgramsTabsComponent,
    ExamFormsListComponent,
    ProgramAttacheExamTemplatsComponent],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ], providers: [MatTooltipModule]
})
export class ProgramModule { }
