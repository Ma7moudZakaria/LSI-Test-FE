import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AnswerTypeEnum } from 'src/app/core/enums/exam-builder-enums/answer-type-enum.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { IAttacheExamTemplateModel } from 'src/app/core/interfaces/exam-form-interfaces/iattache-exam-template-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-attache-exam-template',
  templateUrl: './attache-exam-template.component.html',
  styleUrls: ['./attache-exam-template.component.scss']
})
export class AttacheExamTemplateComponent implements OnInit {
  exam: IExam = { questions: [] };
  examJson: string | undefined;
  voiceUrl: string | undefined;
  isView = true;
  attacheExamTemplate: IAttacheExamTemplateModel = {};
  @Input() selectedExamFormId = { id: '', arabExamName: '', engExamName: '' };
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;
  totalDegree:number | undefined;

  constructor(private examFormService: ExamFormService, 
    public dialog: MatDialog,
    public translate: TranslateService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.selectedExamFormId.id !== undefined) {
      this.getAttacheExamTemplate(this.selectedExamFormId.id);
      this.selectedExamFormId.id = this.selectedExamFormId.id;
    }
  }
  ngOnChanges(changes: any) {
    this.isView = true;
    if (changes.selectedExamFormId?.currentValue.id !== undefined) {
      this.getAttacheExamTemplate(changes.selectedExamFormId.currentValue.id);
      this.selectedExamFormId.id = changes.selectedExamFormId.currentValue.id;
    }
    this.getAttacheExamTemplate("");
  }
  addQuestion() {
    this.resultMessage = {};
    if (Object.keys(this.exam).length === 0) {
      let id = BaseConstantModel.newGuid();
      this.exam = { id: id, questions: [] }
    }

if(this.examFormService.validateQuestion(this.exam.questions)===true)
{
  let qid = BaseConstantModel.newGuid();
  let ques: IQuestion =
  {
    questionId: qid,
    questionNo: this.exam?.questions ? this.exam.questions.length + 1 : 1,
    time:5,
    answers: [],
    answerType: AnswerTypeEnum.singleSelect,
  }
  this.exam.questions.push(ques);
}
else{
 this.resultMessage = {
  message: this.translate.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_AND_DUPLICATION_MESSAGE') : this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_AND_DUPLICATION_MESSAGE'),
  type: BaseConstantModel.DANGER_TYPE
}
}
   
  }

  saveExam() {
     if(((this.exam.scorePass ||0 ) > this.exam?.scoreTotal!) || (this.exam.scorePass ===0 ||this.exam.scorePass==null ) || (this.exam?.scoreTotal ===0))
     { this.resultMessage = {
      message:this.translate.currentLang === LanguageEnum.ar ? this.translate.instant('EXAM_FORM.THE_SUCCESS_RATE_SHOULD_LESS_THAN_TOTAL_DEGREE') : this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_AND_DUPLICATION_MESSAGE'),// this.translate.currentLang === LanguageEnum.en ? "Please complete the missing information" : "برجاء اكمال البيانات",
      type: BaseConstantModel.DANGER_TYPE
    }
  }
   else if(this.examFormService.validateQuestion(this.exam.questions)===true){
      this.isView = true;
      this.saveAttacheExamTemplate();
    }
    else{
      this.resultMessage = {
        message:this.translate.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_AND_DUPLICATION_MESSAGE') : this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_AND_DUPLICATION_MESSAGE'),// this.translate.currentLang === LanguageEnum.en ? "Please complete the missing information" : "برجاء اكمال البيانات",
        type: BaseConstantModel.DANGER_TYPE
      }
     }
   
  }

  /////recording/////
  saveVoiceUrl(event: any) {
    this.voiceUrl = event;
  }
  /////end recording////

  editQuestionTemplate() {
    this.isView = false;
  }
  getAttacheExamTemplate(examId?: string) {
    this.resultMessage = {};
    if (examId) {
      this.examFormService.getExamFormDetails(examId).subscribe(res => {
          this.exam = res.data as IExam;
          this.exam.questions = res.data.examTemplate ? JSON.parse(res.data.examTemplate) : [];
      },
        error => {
          this.resultMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      )
    }
    else{
    this.exam = {questions:[]};

    }
  }
  saveAttacheExamTemplate() {
    this.attacheExamTemplate.id = this.selectedExamFormId.id;
    this.attacheExamTemplate.scorePass= this.exam.scorePass;
    this.attacheExamTemplate.scoreTotal= this.exam.scoreTotal;
    this.attacheExamTemplate.examTemplate = JSON.stringify(this.exam.questions);
    this.resultMessage = {};
       this.examFormService.attachmentsExamTemplate(this.attacheExamTemplate).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.resultMessage = {
          message: res.message || "",
          type: BaseConstantModel.SUCCESS_TYPE
        }
        this.getAttacheExamTemplate(this.attacheExamTemplate.id);
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
 
  }

  confirmDeleteQuestionDialog(question:IQuestion) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete question" : "هل متأكد من حذف هذا السؤال";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Question' : 'حذف السؤال', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        const index = this.exam.questions.indexOf(question);
        if (index > -1){
          this.exam.questions.splice(index,1);
        }
      }
    });
  }

  calculateTotalDegree(){
    this.exam.scoreTotal = this.exam.questions.reduce((sum, current) => sum + current.degree! , 0) ;
  }

}
