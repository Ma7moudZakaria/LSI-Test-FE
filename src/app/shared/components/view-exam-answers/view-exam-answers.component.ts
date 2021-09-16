import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramDutyDaysTaskViewMoodEnum } from 'src/app/core/enums/programs/program-duty-days-task-view-mood-enum.enum';
import { IStuViewExamAnswProgSub } from 'src/app/core/interfaces/student-program-subscription-interfaces/istu-view-exam-answ-prog-sub';
import { IStudentExamAnswerResponseModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-exam-answer-response-model';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { UserService } from 'src/app/core/services/user-services/user.service';

@Component({
  selector: 'app-view-exam-answers',
  templateUrl: './view-exam-answers.component.html',
  styleUrls: ['./view-exam-answers.component.scss']
})
export class ViewExamAnswersComponent implements OnInit {
  @Output() hideViewExamEvent= new EventEmitter<boolean>();
  @Input() studentExamAnswer: IStuViewExamAnswProgSub | undefined;
  starsSelected = 5;
  studentProfileDetails = {} as IUserProfile;
  resMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;
  questionViewMoodEnum = ProgramDutyDaysTaskViewMoodEnum.student;

  constructor( 
    private studentProfileService: UserService,
    public translate: TranslateService,
    private alertify: AlertifyService) { }
  

  ngOnInit(): void {
    this. getStudentProfile();
  }

  getStudentProfile() {
    this.studentProfileService.viewUserProfileDetails(this.studentExamAnswer?.stuProgSub?.usrId || '').subscribe(res => {
      if (res.isSuccess) {
        this.studentProfileDetails = res.data as IUserProfile;
      }
      else {
        this.alertify.error(res.message || "")
      }
    }, error => { });
  }

  hideViewExam() {
    this.hideViewExamEvent.emit(false)
  }

}
