import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, timer } from 'rxjs';
import { AnswerTypeEnum } from 'src/app/core/enums/exam-builder-enums/answer-type-enum.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAnswer } from 'src/app/core/interfaces/exam-builder-interfaces/ianswer';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';

@Component({
  selector: 'app-join-exam',
  templateUrl: './join-exam.component.html',
  styleUrls: ['./join-exam.component.scss']
})
export class JoinExamComponent implements OnInit {
  examJson: string | undefined;
  voiceUrl: string | undefined;
  @Input() joinExamModel: IExam | undefined 
  @Input() isView: boolean = false;
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  answerTypeEnum = AnswerTypeEnum;
  display: any;
  currentQuestion: IQuestion | undefined
  counter: number = 0
  countlength: number = 0;

  //pipe for timer counter
  countDown: Subscription | undefined;
  counterTimer: number = 0
  tick = 1000;

  constructor(
    public translate: TranslateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getExam();
  }

  ngOnDestroy() {
    this.countDown = undefined;
  }


  getExam() {
          this.currentQuestion = this.joinExamModel && this.joinExamModel.questions ?
          this.joinExamModel.questions [this.counter] : undefined;

          this.counterTimer = this.currentQuestion?.time ? this.currentQuestion?.time * 60 : 0;
          this.countDown = timer(0, this.tick).subscribe(() => {
            --this.counterTimer;
            if (this.counterTimer == 0) {
              this.NextQuestion();
            }
          }
          );
  }

  NextQuestion() {
    this.countlength = this.joinExamModel?.questions?.length || 0;
    if (this.counter == this.countlength - 1) {
     // this.submitExam();
    }
    else {
      this.counter++;
      this.currentQuestion = this.joinExamModel && this.joinExamModel.questions ?
      this.joinExamModel.questions[this.counter] : undefined;

      this.counterTimer = this.currentQuestion?.time ? this.currentQuestion?.time * 60 : 0;
      this.countDown = timer(0, this.tick).subscribe(() => {
        --this.counterTimer;
        if (this.counterTimer == 0) {
          this.NextQuestion();
        }
      }
      );

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

}
