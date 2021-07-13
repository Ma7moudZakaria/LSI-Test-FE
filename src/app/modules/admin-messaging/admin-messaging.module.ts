import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMessagingRoutingModule } from './admin-messaging-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminMessagingViewComponent } from './components/admin-messaging-view.component';
import { ScientificProblemsComponent } from './components/scientific-problems-view/scientific-problems/scientific-problems.component';
import { AddScientifiProblemReplyComponent } from './components/scientific-problems-view/add-scientifi-problem-reply/add-scientifi-problem-reply.component';
import { AddScientifiProblemToQuestionBankComponent } from './components/scientific-problems-view/add-scientifi-problem-to-question-bank/add-scientifi-problem-to-question-bank.component';
import { ScientificProblemsViewComponent } from './components/scientific-problems-view/scientific-problems-view.component';
import { TeacherProgramRequestViewComponent } from './components/teacher-program-request-view/teacher-program-request-view.component';
import { StudentProgramRequestViewComponent } from './components/student-program-request-view/student-program-request-view.component';
import { StuListRequestComponent } from './components/student-program-request-view/stu-list-request/stu-list-request.component';
import { StuRequestDetailsComponent } from './components/student-program-request-view/stu-request-details/stu-request-details.component';
import { StuJoinRequestComponent } from './components/student-program-request-view/stu-request-details/stu-join-request/stu-join-request.component';
import { StuQuitRequestComponent } from './components/student-program-request-view/stu-request-details/stu-quit-request/stu-quit-request.component';
import { StuTabRequestComponent } from './components/student-program-request-view/stu-request-details/stu-join-request/stu-tab-request/stu-tab-request.component';
import { AdvancedSearchComponent } from './components/student-program-request-view/stu-request-details/stu-join-request/advanced-search/advanced-search.component';
import { TeacherListRequestComponent } from './components/teacher-program-request-view/teacher-list-request/teacher-list-request.component';
import { TeacherRequestDetailsComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-request-details.component';
import { TeacherJoinRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request/teacher-join-request.component';
import { TeacherJoinRequestProgramComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request-program/teacher-join-request-program.component';
import { TeacherQuitRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-quit-request/teacher-quit-request.component';
import { ChangTimeRequestComponent } from './components/teacher-program-request-view/teacher-request-details/chang-time-request/chang-time-request.component';
import { TeacherJionProgramTabRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request-program/teacher-join-program-tab-request/teacher-join-program-tab-request.component';
import { TeacherJionTabRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request/teacher-join-tab-request/teacher-join-tab-request.component';
import { StuVacationsRequestComponent } from './components/student-program-request-view/stu-request-details/stu-vacations-request/stu-vacations-request.component';
import { StuMovingRequestComponent } from './components/student-program-request-view/stu-request-details/stu-moving-request/stu-moving-request.component';
// import { TeacherTabRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request-program/teacher-tab-request/teacher-tab-request.component';


// @NgModule({
//   declarations: [AdminMessagingViewComponent, ScientificProblemsComponent, AddScientifiProblemReplyComponent,
//     AddScientifiProblemToQuestionBankComponent, ScientificProblemsViewComponent,
//     TeacherProgramRequestViewComponent, StudentProgramRequestViewComponent,
//     StuListRequestComponent, StuRequestDetailsComponent, StuJoinRequestComponent, StuQuitRequestComponent,
//     StuTabRequestComponent, AdvancedSearchComponent],


@NgModule({
  declarations: [AdminMessagingViewComponent, ScientificProblemsComponent, AddScientifiProblemReplyComponent, AddScientifiProblemToQuestionBankComponent,
    ScientificProblemsViewComponent, TeacherProgramRequestViewComponent, StudentProgramRequestViewComponent, StuListRequestComponent,
    StuRequestDetailsComponent, StuJoinRequestComponent, StuQuitRequestComponent,
    StuTabRequestComponent, AdvancedSearchComponent, TeacherListRequestComponent,
    TeacherRequestDetailsComponent, TeacherJoinRequestComponent, TeacherJoinRequestProgramComponent, TeacherQuitRequestComponent,
    ChangTimeRequestComponent, TeacherJionProgramTabRequestComponent, StuVacationsRequestComponent, StuMovingRequestComponent
    , TeacherJionTabRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    MatIconModule,
    AdminMessagingRoutingModule
  ]
})
export class AdminMessagingModule { }
