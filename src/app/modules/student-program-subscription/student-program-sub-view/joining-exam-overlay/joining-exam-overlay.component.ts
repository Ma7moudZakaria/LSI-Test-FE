import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timeStamp } from 'node:console';
import { AnswerTypeEnum } from 'src/app/core/enums/exam-builder-enums/answer-type-enum.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAnswer } from 'src/app/core/interfaces/exam-builder-interfaces/ianswer';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { IRandomExamModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/irandom-exam-model';
import { IStudentCustomConditionAnswerModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-custom-condition-answer-model';
import { IstudentJoiningExamAnswerModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-joining-exam-answer-model';
import { IProgramSubscriptionDetails } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprogram-subscription-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';

@Component({
  selector: 'app-joining-exam-overlay',
  templateUrl: './joining-exam-overlay.component.html',
  styleUrls: ['./joining-exam-overlay.component.scss']
})
export class JoiningExamOverlayComponent implements OnInit {

  @Input() progDetails: IProgramSubscriptionDetails | undefined;
  resMessage: BaseMessageModel = {};
  randomExam: IRandomExamModel | undefined;
  langEnum = LanguageEnum;
  answerTypeEnum = AnswerTypeEnum;

  currentQuestion: IQuestion | undefined
  counter: number = 0
  countlength: number = 0;
  @Input() requestId: string | undefined

  constructor(
    private studentProgSubscriptionService: StudentProgramSubscriptionServicesService,
    public translate: TranslateService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // if (this.currentQuestion
    //   && this.currentQuestion.studentAnswersByAnswerNumbers
    //   && this.currentQuestion.studentAnswersByAnswerNumber) {
    //   this.currentQuestion.studentAnswersByAnswerNumber = '';
    //   this.currentQuestion.studentAnswersByAnswerNumbers = [];
    // }

    this.getRandomExam();
  }


  getRandomExam() {
    this.studentProgSubscriptionService.getRandomJoiningExam(this.progDetails?.id || '').subscribe(
      res => {

        if (res.isSuccess) {
          this.randomExam = res.data as IRandomExamModel;
          this.randomExam.questions = res.data.templateExam ? JSON.parse(res.data.templateExam) : [];

          this.currentQuestion = this.randomExam && this.randomExam.questions ?
            this.randomExam.questions[this.counter] : undefined;
        }
        else {
          this.resMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      }, error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
  }

  NextQuestion() {
    this.countlength = this.randomExam?.questions?.length || 0;
    if (this.counter == this.countlength - 1) {
      this.submitExam();
    }
    else {
      this.counter++;
      this.currentQuestion = this.randomExam && this.randomExam.questions ?
        this.randomExam.questions[this.counter] : undefined;
    }
  }

  addStudentAns(item: IAnswer, event: any) {
    if (event.checked && item && item.answerNo) {
      this.currentQuestion?.studentAnswersByAnswerNumbers?.push(item.answerNo);
    }
    else {
      let it = this.currentQuestion?.studentAnswersByAnswerNumbers?.filter(i => i === item.answerNo)[0];
      const ind = it ? this.currentQuestion?.studentAnswersByAnswerNumbers?.indexOf(it) : -1;
      if (ind && ind > -1) {
        this.currentQuestion?.studentAnswersByAnswerNumbers?.splice(ind, 1);
      }
    }
  }

  submitExam() {
    let model: IstudentJoiningExamAnswerModel = {
      exId: this.randomExam?.exId,
      stProgSubsId: this.requestId,
      answer: this.randomExam?.questions
    }
    this.studentProgSubscriptionService.submitStudentJoiningExamAnswer(model).subscribe(res => {
      if (res.isSuccess) {
        this.studentSubscriptionCompleted();
      }
      else {

      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }

  studentSubscriptionCompleted() {
    let model: string[] = [];
    model.push(this.requestId || '');
    this.studentProgSubscriptionService.studentProgramSubscriptionsCompleted(model).subscribe(res => {
      if (res.isSuccess) {
        this.router.navigateByUrl('/student-for-subscription');
      }
      else {

      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }


}
