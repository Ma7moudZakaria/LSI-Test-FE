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
import { StuJoinRequestProgramComponent } from './components/student-program-request-view/stu-request-details/stu-join-request-program/stu-join-request-program.component';
import { StuQuitRequestComponent } from './components/student-program-request-view/stu-request-details/stu-quit-request/stu-quit-request.component';
import { ChangeAvailableRequestStuComponent } from './components/student-program-request-view/stu-request-details/change-available-request-stu/change-available-request-stu.component';
import { StuTabRequestComponent } from './components/student-program-request-view/stu-request-details/change-available-request-stu/stu-tab-request/stu-tab-request.component';
import { AdvancedSearchComponent } from './components/student-program-request-view/stu-request-details/change-available-request-stu/advanced-search/advanced-search.component';


@NgModule({
  declarations: [AdminMessagingViewComponent, ScientificProblemsComponent, AddScientifiProblemReplyComponent, AddScientifiProblemToQuestionBankComponent, ScientificProblemsViewComponent, TeacherProgramRequestViewComponent, StudentProgramRequestViewComponent, StuListRequestComponent, StuRequestDetailsComponent, StuJoinRequestComponent, StuJoinRequestProgramComponent, StuQuitRequestComponent, ChangeAvailableRequestStuComponent, StuTabRequestComponent, AdvancedSearchComponent],
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
