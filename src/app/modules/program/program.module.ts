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
import { ExamFormsListComponent } from './components/add-program/program-exames/exam-forms-list/exam-forms-list.component';
import { AttacheExamTemplatsComponent } from './components/add-program/program-exames/attache-exam-templats/attache-exam-templats.component';

@NgModule({
  declarations: [AddProgramComponent, ProgramDetailsComponent, ProgramDetailsComponent, ProgramsListComponent, BasicInformationComponent, StudentsComponent, ProgressTestComponent, DaysComponent, JoinRequestsComponent, VacationRequestsComponent, ConditionsComponent, NotifyComponent, ProgramBasicInfoComponent, ProgramConditionsComponent, ProgramExamesComponent, ProgramDaysComponent, ProgramNotifacationsComponent, PeriodicExameComponent, ExamFormsListComponent, AttacheExamTemplatsComponent],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class ProgramModule { }
