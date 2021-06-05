import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AnswerTypeEnum } from 'src/app/core/enums/exam-builder-enums/answer-type-enum.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { IAttacheExamTemplateModel } from 'src/app/core/interfaces/exam-form-interfaces/iattache-exam-template-model';
import { ISaveProgramDayTaskDetailsModel } from 'src/app/core/interfaces/programs-interfaces/isave-program-day-task-Details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-program-day-task-daily-test',
  templateUrl: './program-day-task-daily-test.component.html',
  styleUrls: ['./program-day-task-daily-test.component.scss']
})
export class ProgramDayTaskDailyTestComponent implements OnInit {
  exam: IExam = { questions: [] };
  examJson: string | undefined;
  voiceUrl: string | undefined;
  isView = true;
  attacheExamTemplate: IAttacheExamTemplateModel = {};
  programDayTaskDetails: ISaveProgramDayTaskDetailsModel = {};
  @Input() selectedExamFormId = { id: '', arabExamName: '', engExamName: '' };
  @Input() selectedTaskId:string|undefined;
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;
  constructor(private programDayTasksService:ProgramDayTasksService,private examFormService: ExamFormService, 
    private activeroute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    public translate: TranslateService, private fb: FormBuilder) { }

  ngOnInit(): void {
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
    if(this.examFormService.validateQuestion(this.exam.questions)===true){
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
    this.programDayTaskDetails.programDayTask = this.selectedTaskId;
    this.programDayTaskDetails.detailsTask = JSON.stringify(this.exam.questions);
    this.resultMessage = {};
       this.programDayTasksService.SaveProgramDayTaskDetails(this.programDayTaskDetails).subscribe(res => {
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

}
