import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AnswerTypeEnum } from 'src/app/core/enums/exam-builder-enums/answer-type-enum.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-program-day-task-test-phased',
  templateUrl: './program-day-task-test-phased.component.html',
  styleUrls: ['./program-day-task-test-phased.component.scss']
})
export class ProgramDayTaskTestPhasedComponent implements OnInit {
  examJson: string | undefined;
  voiceUrl: string | undefined;
  @Input() testPhasedDetailsModel: IExam | undefined;
  resultMessage: BaseMessageModel = {};
  @Input() isView: boolean = false;

  langEnum = LanguageEnum;
  constructor(
    public dialog: MatDialog,
    private examFormService: ExamFormService,
    public translate: TranslateService) { }

  ngOnInit(): void {
  }
  addQuestion() {
    this.resultMessage = {};
    if (this.testPhasedDetailsModel) {
      if (Object.keys(this.testPhasedDetailsModel).length === 0) {
        let id = BaseConstantModel.newGuid();
        this.testPhasedDetailsModel.id = id; //{ id: id, questions: [] }
      }

      if (this.examFormService.validateQuestion(this.testPhasedDetailsModel.questions) === true) {
        let qid = BaseConstantModel.newGuid();
        let ques: IQuestion =
        {
          questionId: qid,
          questionNo: this.testPhasedDetailsModel?.questions ? this.testPhasedDetailsModel.questions.length + 1 : 1,
          time: 5,
          answers: [],
          answerType: AnswerTypeEnum.singleSelect,
        }
        this.testPhasedDetailsModel.questions.push(ques);
      }
      else {
        this.resultMessage = {
          message: this.translate.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_AND_DUPLICATION_MESSAGE') : this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_AND_DUPLICATION_MESSAGE'),
          type: BaseConstantModel.DANGER_TYPE
        }
      }

    }
  }



  /////recording/////
  saveVoiceUrl(event: any) {
    this.voiceUrl = event;
  }
  /////end recording////

  confirmDeleteQuestionDialog(question: IQuestion) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete question" : "هل متأكد من حذف هذا السؤال";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Question' : 'حذف السؤال', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true && this.testPhasedDetailsModel) {
        const index = this.testPhasedDetailsModel.questions.indexOf(question);
        if (index > -1) {
          this.testPhasedDetailsModel.questions.splice(index, 1);
        }
      }
    });
  }


}
