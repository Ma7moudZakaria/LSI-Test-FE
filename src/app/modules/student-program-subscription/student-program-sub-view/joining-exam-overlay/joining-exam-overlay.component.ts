import { Time } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Input() progDetails: IProgramSubscriptionDetails | undefined;
  @Input() requestId: string | undefined

  resMessage: BaseMessageModel = {};
  randomExam: IRandomExamModel | undefined;
  langEnum = LanguageEnum;
  answerTypeEnum = AnswerTypeEnum;
  display: any;
  currentQuestion: IQuestion | undefined
  counter: number = 0
  countlength: number = 0;

  constructor(
    private studentProgSubscriptionService: StudentProgramSubscriptionServicesService,
    public translate: TranslateService,
    private alertify: AlertifyService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
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
          this.currentQuestion?.time ? this.timer(this.currentQuestion?.time || 0) : 0;

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

  timer(minute: number) {

    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
        this.NextQuestion();
      }
    }, 1000);
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
      this.currentQuestion?.time ? this.timer(this.currentQuestion?.time || 0) : 0;
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
        this.alertify.success(res.message || '');
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

  closeForm() {
    this.closeOverlay.emit(false)
  }

}
