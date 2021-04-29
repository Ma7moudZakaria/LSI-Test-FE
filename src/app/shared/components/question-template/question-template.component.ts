import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnswerTypeEnum } from 'src/app/core/enums/exam-builder-enums/answer-type-enum.enum';
import { QuestionTypeEnum } from 'src/app/core/enums/exam-builder-enums/question-type-enum.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAnswer } from 'src/app/core/interfaces/exam-builder-interfaces/ianswer';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';

@Component({
  selector: 'app-question-template',
  templateUrl: './question-template.component.html',
  styleUrls: ['./question-template.component.scss']
})
export class QuestionTemplateComponent implements OnInit {
  @Input() questionTemplate: IQuestion = { answers: [] };
  answerTypeEnum = AnswerTypeEnum;
  currentLang = '';
  MULTISELECT='';
  constructor( public translate: TranslateService) { }

  ngOnInit(): void {
    this.MULTISELECT=this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.MULTI_SELECT') : this.translate.instant('GENERAL.MULTI_SELECT')
  }


  addAnswer() {
    // if (Object.keys(this.questionTemplate).length === 0){
    //   this.questionTemplate = { questionId: '1', answers : []}
    // }
    let id = BaseConstantModel.newGuid();
    let answer: IAnswer = { answerId: id, answerNo: this.questionTemplate.answers?.length + 1,correct : false }
    this.questionTemplate.answers?.push(answer)
  }

  onQuestionTextChange(){
    this.questionTemplate.text ? this.questionTemplate.questionType = QuestionTypeEnum.text : null;
  }

  saveVoiceUrl(event: any) {
    this.questionTemplate.voiceUrl = event;
    this.questionTemplate.voiceUrl ? this.questionTemplate.questionType = QuestionTypeEnum.voice: null;
  }
  MULTI_SELECT() {
    // return this.currentLang === LanguageEnum.ar ? LanguageEnum.en.split('-')[0].toUpperCase() : LanguageEnum.ar.split('-')[0].toUpperCase();
    return this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.MULTI_SELECT') : this.translate.instant('GENERAL.MULTI_SELECT')
  }

  CHOICES() {
    // return this.currentLang === LanguageEnum.ar ? LanguageEnum.en.split('-')[0].toUpperCase() : LanguageEnum.ar.split('-')[0].toUpperCase();
    return this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.CHOICES') : this.translate.instant('GENERAL.CHOICES')
  }
}
