import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AnswerTypeEnum } from 'src/app/core/enums/exam-builder-enums/answer-type-enum.enum';
import { QuestionTypeEnum } from 'src/app/core/enums/exam-builder-enums/question-type-enum.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAnswer } from 'src/app/core/interfaces/exam-builder-interfaces/ianswer';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-question-template',
  templateUrl: './question-template.component.html',
  styleUrls: ['./question-template.component.scss']
})
export class QuestionTemplateComponent implements OnInit {
  @Input() questionTemplate: IQuestion = { answers: [] };
  @Input() viewMode: boolean = false;
  answerTypeEnum = AnswerTypeEnum;
  currentLang = '';
  MULTISELECT = '';
  errorMessage?: string;
  resultMessage: BaseMessageModel = {};
  constructor(public translate: TranslateService,
    public dialog: MatDialog, private examFormService: ExamFormService) { }

  ngOnInit(): void {
    this.MULTISELECT = this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.MULTI_SELECT') : this.translate.instant('GENERAL.MULTI_SELECT')

  }


  addAnswer() {
    this.resultMessage = {}
    if (this.examFormService.validateAnswer(this.questionTemplate.answers) === true, false, this.questionTemplate.answerType) {
      let id = BaseConstantModel.newGuid();

      let answer: IAnswer = { answerId: id, answerNo: this.questionTemplate.answers?.length + 1, correct: this.questionTemplate.answers?.length === 0 ? true : false }
      if (this.questionTemplate.answerType === AnswerTypeEnum.singleSelect && this.questionTemplate.answers.length === 0) {
        this.questionTemplate.correctAnswersByAnswerNumber = "1";
      }
      this.questionTemplate.answers?.push(answer)

    }
    else {
      this.resultMessage = {
        message: this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_AND_DUPLICATION_MESSAGE') : this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_AND_DUPLICATION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }

  }

  onQuestionTextChange() {
    this.questionTemplate.text ? this.questionTemplate.questionType = QuestionTypeEnum.text : null;
  }

  saveVoiceUrl(event: any) {
    this.questionTemplate.voiceUrl = event;
    this.questionTemplate.voiceUrl ? this.questionTemplate.questionType = QuestionTypeEnum.voice : null;
  }
  MULTI_SELECT() {
    // return this.currentLang === LanguageEnum.ar ? LanguageEnum.en.split('-')[0].toUpperCase() : LanguageEnum.ar.split('-')[0].toUpperCase();
    return this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.MULTI_SELECT') : this.translate.instant('GENERAL.MULTI_SELECT')
  }

  CHOICES() {
    // return this.currentLang === LanguageEnum.ar ? LanguageEnum.en.split('-')[0].toUpperCase() : LanguageEnum.ar.split('-')[0].toUpperCase();
    return this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.CHOICES') : this.translate.instant('GENERAL.CHOICES')
  }

  deleteAnswerDialog(answer: IAnswer) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete answer" : "هل متأكد من حذف الإجابة";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Answer' : 'حذف الإجابة', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        // let question = this.exam.questions.filter(q => q.questionNo == no)[0];
        const index = this.questionTemplate.answers.indexOf(answer);
        if (index > -1) {
          this.questionTemplate.answers.splice(index, 1);
          if (this.questionTemplate.answerType === AnswerTypeEnum.singleSelect) {
            let numberAnswer = parseInt(this.questionTemplate.correctAnswersByAnswerNumber!);
            if (numberAnswer > 1) {
              numberAnswer = numberAnswer - 1
              this.questionTemplate.correctAnswersByAnswerNumber = numberAnswer.toString();
            }
            else {
              this.questionTemplate.correctAnswersByAnswerNumber = numberAnswer.toString();
            }
          }
          else {
            if (this.questionTemplate.answers.filter(x => x.correct == true).length < 1) {
              this.questionTemplate.answers[0].correct = true;
            }
          }
          this.questionTemplate.answers.forEach(element => {
            element.answerNo = this.questionTemplate.answers.indexOf(element) + 1;
          });
        }

      }
    });
  }

  stopPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }


}
