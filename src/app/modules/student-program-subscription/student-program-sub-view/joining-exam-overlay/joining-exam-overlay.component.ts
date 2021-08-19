import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnswerTypeEnum } from 'src/app/core/enums/exam-builder-enums/answer-type-enum.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { IRandomExamModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/irandom-exam-model';
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

  constructor(
    private studentCustomConditionService: StudentProgramSubscriptionServicesService,
    public translate: TranslateService,
    private alertify: AlertifyService
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
    this.studentCustomConditionService.getRandomJoiningExam(this.progDetails?.id || '').subscribe(
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
    this.counter++;
    this.currentQuestion = this.randomExam && this.randomExam.questions ?
      this.randomExam.questions[this.counter] : undefined;
  }


}
