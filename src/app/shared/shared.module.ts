import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CustomeCardComponent } from './components/custome-card/custome-card.component';
import { MatCardModule } from '@angular/material/card';
import { CustomAccordionComponent } from './components/custom-accordion/custom-accordion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewUserProfileCustomComponent } from './components/view-user-profile-custom/view-user-profile-custom.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SearchInputComponent } from './components/search-input/search-input.component';

import { MatIconModule } from '@angular/material/icon';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { TelInputComponent } from './components/tel-input/tel-input.component';
import { MiladyHijriCalendarComponent } from './components/milady-hijri-calendar/milady-hijri-calendar.component';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { UsersCounterComponent } from './components/users-counter/users-counter.component';
import { KhatmeenStudentsComponent } from './components/khatmeen-students/khatmeen-students.component';
import { StudentNumbersComponent } from './components/student-numbers/student-numbers.component';
import { StudentsRatingComponent } from './components/students-rating/students-rating.component';
import { CardStudentScientificProblemComponent } from './components/card-student-scientific-problem/card-student-scientific-problem.component';
import { CardAdminScientificProblemComponent } from './components/card-admin-scientific-problem/card-admin-scientific-problem.component';
import { QuestionTemplateComponent } from './components/question-template/question-template.component';
import { FormsModule } from '@angular/forms';
import { VoiceRecordingComponent } from './components/voice-recording/voice-recording.component';
import { ScientificProblemsGridComponent } from './components/scientific-problems-grid/scientific-problems-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NotAuthComponent } from './components/not-auth/not-auth.component';
import { NgbModule, NgbRating, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupUsersCardComponent } from './components/group-users-card/group-users-card.component';
import { InputSearchListComponent } from './components/input-search-list/input-search-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CardNotifacationsComponent } from './components/card-notifacations/card-notifacations.component';
import { ProgramDayTaskHearingComponent } from './components/program-day-tasks/program-day-task-hearing/program-day-task-hearing.component';
import { ProgramDayTaskReadExplanationComponent } from './components/program-day-tasks/program-day-task-read-explanation/program-day-task-read-explanation.component';
import { ProgramDayTaskMemorizeComponent } from './components/program-day-tasks/program-day-task-memorize/program-day-task-memorize.component';
import { ProgramDayTaskRepetitionComponent } from './components/program-day-tasks/program-day-task-repetition/program-day-task-repetition.component';
import { ProgramDayTaskLinkingComponent } from './components/program-day-tasks/program-day-task-linking/program-day-task-linking.component';
import { ProgramDayTaskDailyTestComponent } from './components/program-day-tasks/program-day-task-daily-test/program-day-task-daily-test.component';
import { ProgramDayTaskEncouragementLetterComponent } from './components/program-day-tasks/program-day-task-encouragement-letter/program-day-task-encouragement-letter.component';
import { ProgramDayTaskVideoComponent } from './components/program-day-tasks/program-day-task-video/program-day-task-video.component';
import { ProgramDayTaskReviewComponent } from './components/program-day-tasks/program-day-task-review/program-day-task-review.component';
import { ProgramDayTaskRecitationComponent } from './components/program-day-tasks/program-day-task-recitation/program-day-task-recitation.component';
import { ProgramDayTaskRecitationStudentsComponent } from './components/program-day-tasks/program-day-task-recitation-students/program-day-task-recitation-students.component';
import { ProgramDayTaskTestPhasedComponent } from './components/program-day-tasks/program-day-task-test-phased/program-day-task-test-phased.component';
import { ProgramDayTaskTasmeaComponent } from './components/program-day-tasks/program-day-task-tasmea/program-day-task-tasmea.component';
import { CardFeelingsComponent } from './components/card-feelings/card-feelings.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgramConditionsAgeComponent } from './components/program-conditions/program-conditions-age/program-conditions-age.component';
import { ProgramConditionsMemorizeAmountQuranComponent } from './components/program-conditions/program-conditions-memorize-amount-quran/program-conditions-memorize-amount-quran.component';
import { ProgramConditionsGraduateComponent } from './components/program-conditions/program-conditions-graduate/program-conditions-graduate.component';
import { ProgramConditionsNumberStudentSubscribtionComponent } from './components/program-conditions/program-conditions-number-student-subscribtion/program-conditions-number-student-subscribtion.component';
import { ProgramConditionsMemorizeQuranComponent } from './components/program-conditions/program-conditions-memorize-quran/program-conditions-memorize-quran.component';
import { ProgramConditionsProgramFinishedComponent } from './components/program-conditions/program-conditions-program-finished/program-conditions-program-finished.component';
import { SettingScientificProblemComponent } from './components/setting-conditions/setting-scientific-problem/setting-scientific-problem.component';
import { SettingAgeComponent } from './components/setting-conditions/setting-age/setting-age.component';
import { SettingLastProgramComponent } from './components/setting-conditions/setting-last-program/setting-last-program.component';
import { SettingDegreeLastProgramComponent } from './components/setting-conditions/setting-degree-last-program/setting-degree-last-program.component';
import { SettingMaxmumSubscribeComponent } from './components/setting-conditions/setting-maxmum-subscribe/setting-maxmum-subscribe.component';
import { SettingPartQraanComponent } from './components/setting-conditions/setting-part-qraan/setting-part-qraan.component';
@NgModule({
  declarations: [ConfirmModalComponent, CustomeCardComponent, CustomAccordionComponent, ViewUserProfileCustomComponent,
    SearchInputComponent, TelInputComponent, MiladyHijriCalendarComponent, UsersCounterComponent, KhatmeenStudentsComponent,
    StudentNumbersComponent, StudentsRatingComponent, CardStudentScientificProblemComponent, CardAdminScientificProblemComponent,
    QuestionTemplateComponent, VoiceRecordingComponent, ScientificProblemsGridComponent, NotAuthComponent, GroupUsersCardComponent,
    InputSearchListComponent,
    CardNotifacationsComponent,
    ProgramDayTaskHearingComponent,
    ProgramDayTaskReadExplanationComponent,
    ProgramDayTaskMemorizeComponent,
    ProgramDayTaskRepetitionComponent,
    ProgramDayTaskLinkingComponent,
    ProgramDayTaskDailyTestComponent,
    ProgramDayTaskEncouragementLetterComponent,
    ProgramDayTaskVideoComponent,
    ProgramDayTaskReviewComponent,
    ProgramDayTaskRecitationComponent,
    ProgramDayTaskRecitationStudentsComponent,
    ProgramDayTaskTestPhasedComponent,
    ProgramDayTaskTasmeaComponent,
    CardFeelingsComponent,
    ProgramConditionsAgeComponent,
    ProgramConditionsMemorizeAmountQuranComponent,
    ProgramConditionsGraduateComponent,
    ProgramConditionsNumberStudentSubscribtionComponent,
    ProgramConditionsMemorizeQuranComponent,
    ProgramConditionsProgramFinishedComponent,
    SettingScientificProblemComponent,
    SettingAgeComponent,
    SettingLastProgramComponent,
    SettingDegreeLastProgramComponent,
    SettingMaxmumSubscribeComponent,
    SettingPartQraanComponent],
  imports: [
    CommonModule, RouterModule, TranslateModule, Ng2TelInputModule, NgxHijriGregorianDatepickerModule,
    MatButtonModule, MatDialogModule, MatCardModule, MatExpansionModule, MatSelectModule, DragDropModule,
    MatIconModule, FormsModule, MatCheckboxModule, MatRadioModule, MatGridListModule,
    NgbModule, MatAutocompleteModule, NgbRatingModule, MatTooltipModule
  ],
  exports: [
    MatRadioModule, MatCheckboxModule, MatButtonModule, MatDialogModule, MatCardModule, Ng2TelInputModule,
    MatExpansionModule, MatSelectModule, DragDropModule, CustomeCardComponent, CustomAccordionComponent,
    ViewUserProfileCustomComponent, SearchInputComponent, TelInputComponent, MiladyHijriCalendarComponent,
    UsersCounterComponent, KhatmeenStudentsComponent, StudentNumbersComponent, StudentsRatingComponent,
    CardStudentScientificProblemComponent, QuestionTemplateComponent, VoiceRecordingComponent, MatGridListModule,
    ScientificProblemsGridComponent, CardAdminScientificProblemComponent, NotAuthComponent, GroupUsersCardComponent,
    InputSearchListComponent, NgbRatingModule, CardNotifacationsComponent, ProgramDayTaskHearingComponent,
    NgbModule, ProgramDayTaskReadExplanationComponent, ProgramDayTaskRepetitionComponent,
    ProgramDayTaskMemorizeComponent, ProgramDayTaskLinkingComponent, ProgramDayTaskVideoComponent, ProgramDayTaskDailyTestComponent,
    ProgramDayTaskEncouragementLetterComponent, ProgramDayTaskReviewComponent, ProgramDayTaskRecitationComponent,
    ProgramDayTaskRecitationStudentsComponent, ProgramDayTaskTestPhasedComponent,
    ProgramDayTaskTasmeaComponent, CardFeelingsComponent, MatTooltipModule,
    SettingScientificProblemComponent, SettingAgeComponent, SettingDegreeLastProgramComponent, SettingLastProgramComponent,
    SettingMaxmumSubscribeComponent, SettingPartQraanComponent,ProgramConditionsAgeComponent

  ]
})
export class SharedModule { }
