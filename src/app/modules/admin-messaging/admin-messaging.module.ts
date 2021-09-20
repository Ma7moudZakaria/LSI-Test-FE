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
import { StuJoinRequestComponent } from './components/student-program-request-view/stu-request-details/stu-join-request/stu-join-request.component';
import { StuRequestDetailsComponent } from './components/student-program-request-view/stu-request-details/stu-request-details.component';
import { StuTabRequestComponent } from './components/student-program-request-view/stu-request-details/stu-join-request/stu-tab-request/stu-tab-request.component';
import { AdvancedSearchComponent } from './components/student-program-request-view/stu-request-details/stu-join-request/advanced-search/advanced-search.component';
import { TeacherJoinRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request/teacher-join-request.component';
import { TeacherListRequestComponent } from './components/teacher-program-request-view/teacher-list-request/teacher-list-request.component';
import { TeacherJoinRequestProgramComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request-program/teacher-join-request-program.component';
import { ChangTimeRequestComponent } from './components/teacher-program-request-view/teacher-request-details/chang-time-request/chang-time-request.component';
import { TeacherJionTabRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request/teacher-join-tab-request/teacher-join-tab-request.component';
import { TeacherJionProgramTabRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request-program/teacher-join-program-tab-request/teacher-join-program-tab-request.component';
import { StuRejectedComponent } from './components/student-program-request-view/stu-request-details/stu-join-request/stu-rejected/stu-rejected.component';
import { TeacheRejectedComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request-program/teache-rejected/teache-rejected.component';
import { StuVacationsRequestComponent } from './components/student-program-request-view/stu-request-details/stu-vacations-request/stu-vacations-request.component';
import { StuMovingRequestComponent } from './components/student-program-request-view/stu-request-details/stu-moving-request/stu-moving-request.component';
import { AdvancedSearchTeacherComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request-program/advanced-search/advanced-search.component';
import { TeacherSystemSubscriptionRejectedComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request/teacher-system-subscription-rejected/teacher-system-subscription-rejected.component';
import { StudentVacationRequestTabComponent } from './components/student-program-request-view/stu-request-details/stu-vacations-request/student-vacation-request-tab/student-vacation-request-tab.component';
import { StudentProgramVacationRejectComponent } from './components/student-program-request-view/stu-request-details/stu-vacations-request/student-program-vacation-reject/student-program-vacation-reject.component';
import { StudentProgramVacationAdvancedSearchComponent } from './components/student-program-request-view/stu-request-details/stu-vacations-request/student-program-vacation-advanced-search/student-program-vacation-advanced-search.component';
// import { TeacherTabRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-join-request-program/teacher-tab-request/teacher-tab-request.component';

import { TeacherDropOutRequestRejectedComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-admin-drop-out-request/teacher-drop-out-request-rejected/teacher-drop-out-request-rejected.component';
import { TeacherRequestDetailsComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-request-details.component';
import { TeacherAdvancedSearchComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-admin-drop-out-request/teacher-advanced-search/teacher-advanced-search.component';
import { TeacherDropOutTabRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-admin-drop-out-request/teacher-drop-out-tab-request/teacher-drop-out-tab-request.component';
import { TeacherAdminDropOutRequestComponent } from './components/teacher-program-request-view/teacher-request-details/teacher-admin-drop-out-request/teacher-admin-drop-out-request.component';
import { StudentDropOutTabRequestComponent } from './components/student-program-request-view/stu-request-details/student-admin-drop-out-request/student-drop-out-tab-request/student-drop-out-tab-request.component';
import { StudentDropOutRequestRejectedComponent } from './components/student-program-request-view/stu-request-details/student-admin-drop-out-request/student-drop-out-request-rejected/student-drop-out-request-rejected.component';
import { StudentAdvancedSearchComponent } from './components/student-program-request-view/stu-request-details/student-admin-drop-out-request/student-advanced-search/student-advanced-search.component';
import { StudentAdminDropOutRequestComponent } from './components/student-program-request-view/stu-request-details/student-admin-drop-out-request/student-admin-drop-out-request.component';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { GroupViewComponent } from './components/chat-view/group-view/group-view.component';
import { ChatDetailsComponent } from './components/chat-view/chat-details/chat-details.component';
import { GroupDetailsComponent } from './components/chat-view/group-details/group-details.component';
import { AddGroupComponent } from './components/chat-view/add-group/add-group.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { TeacherAppointmentAdvancedSearchComponent } from './components/teacher-program-request-view/teacher-request-details/chang-time-request/teacher-appointment-advanced-search/teacher-appointment-advanced-search.component';
import { TeacherAppointmentRejectComponent } from './components/teacher-program-request-view/teacher-request-details/chang-time-request/teacher-appointment-reject/teacher-appointment-reject.component';
import { AppointmentRequestsTabComponent } from './components/teacher-program-request-view/teacher-request-details/chang-time-request/appointment-requests-tab/appointment-requests-tab.component';
import { ScientificProblemAdvancedSearchComponent } from './components/scientific-problems-view/scientific-problem-advanced-search/scientific-problem-advanced-search.component';

// @NgModule({
//   declarations: [AdminMessagingViewComponent, ScientificProblemsComponent, AddScientifiProblemReplyComponent,
//     AddScientifiProblemToQuestionBankComponent, ScientificProblemsViewComponent,
//     TeacherProgramRequestViewComponent, StudentProgramRequestViewComponent,
//     StuListRequestComponent, StuRequestDetailsComponent, StuJoinRequestComponent, StuQuitRequestComponent,
//     StuTabRequestComponent, AdvancedSearchComponent],


@NgModule({
  declarations: [AdminMessagingViewComponent, ScientificProblemsComponent, AddScientifiProblemReplyComponent, AddScientifiProblemToQuestionBankComponent,
    ScientificProblemsViewComponent, TeacherProgramRequestViewComponent, StudentProgramRequestViewComponent, StuListRequestComponent,
    StuJoinRequestComponent,
    StuTabRequestComponent, AdvancedSearchComponent,TeacherAdvancedSearchComponent, TeacherListRequestComponent,StuRequestDetailsComponent,
    TeacherRequestDetailsComponent, TeacherJoinRequestComponent, TeacherJoinRequestProgramComponent,TeacherAdminDropOutRequestComponent ,
    ChangTimeRequestComponent, TeacherJionProgramTabRequestComponent, StuVacationsRequestComponent, StuMovingRequestComponent
        , TeacherJionTabRequestComponent, StuRejectedComponent, TeacheRejectedComponent, AdvancedSearchTeacherComponent, TeacherSystemSubscriptionRejectedComponent, StudentVacationRequestTabComponent, StudentProgramVacationRejectComponent, StudentProgramVacationAdvancedSearchComponent
        , TeacherDropOutTabRequestComponent, TeacherDropOutRequestRejectedComponent, StudentAdminDropOutRequestComponent, StudentDropOutTabRequestComponent,
        StudentDropOutRequestRejectedComponent, StudentAdvancedSearchComponent, ChatViewComponent, GroupViewComponent, ChatDetailsComponent, GroupDetailsComponent, AddGroupComponent,
        TeacherAppointmentAdvancedSearchComponent, TeacherAppointmentRejectComponent, AppointmentRequestsTabComponent, ScientificProblemAdvancedSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    MatIconModule,
    AdminMessagingRoutingModule,
    MatTreeModule,
    MatListModule
  ]
})
export class AdminMessagingModule { }
