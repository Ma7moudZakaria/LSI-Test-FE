import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';
import { IAddScProbReply } from 'src/app/core/interfaces/scientific-problrm/iadd-sc-prob-reply';
import { IAddScProbToQuestionBank } from 'src/app/core/interfaces/scientific-problrm/iadd-sc-prob-to-question-bank';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';

import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-scientific-problems',
  templateUrl: './scientific-problems.component.html',
  styleUrls: ['./scientific-problems.component.scss']
})
export class ScientificProblemsComponent implements OnInit {

  @Output() showAddReplyToScProblem = new EventEmitter<IScientificProblemGridItems>();
  @Output() showAddScProblemToQuestionBank = new EventEmitter<IScientificProblemGridItems>();

  scientificProblemFilter: IScientificProblemFilter = {skip : 0, take : 12, sorField : '', ordType: 1};
  resultMessage:BaseMessageModel = {};
  scientificProblems: IScientificProblemGridItems[] | undefined; 
  adminCard : ScientificProblemUsersEnum = ScientificProblemUsersEnum.Admin;
  numberItemsPerRow = 4;
  totalCount = 0;

  constructor(public translate: TranslateService,public dialog: MatDialog,
    private scientificProblemService:ScientificProblemService,
    private languageService : LanguageService,
    private alertify:AlertifyService,
    private questionBankService:QuestionBankQuestionService) { }

  ngOnInit(): void {
    this.scientificProblemFilter.sorField = this.translate.currentLang === LanguageEnum.ar ? 'studfullnamear' : 'studfullnameen'
    this.getScientificProblems();
  }

  emitHeaderTitle() {
    this.languageService.headerPageNameEvent.emit(this.translate.currentLang == LanguageEnum.ar ? 'المراسلات' : 'Messaging');
  }

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  getScientificProblems() {
    
    this.resultMessage = {};

    this.scientificProblemService.getScientificMateriaFilter(this.scientificProblemFilter).subscribe(res => {
      if (res.isSuccess){
        this.scientificProblems = res.data;
        this.scientificProblems?.forEach(function(item) {
          item.scCreatedOn = item.scCreatedOn ? new Date(item.scCreatedOn).toDateString(): '';
        });   
        this.totalCount = res.count ? res.count : 0;
      }
      else{
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

  filterByText(searchKey:string){
    this.scientificProblemFilter.filterText = searchKey;
    this.getScientificProblems();
  }

  filterRequest(event:IScientificProblemFilter){
    this.scientificProblemFilter = event;
    this.getScientificProblems();
  }

  deleteUserSingleScProb(id:string){
    const message =this.translate.currentLang === LanguageEnum.en ?"Are you sure that you want to delete this scientific problem":"هل متأكد من حذف هذا الإشكال العلمى";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Question' : 'حذف سؤال', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.scientificProblemService.DeleteScientificProblem(id||'').subscribe(
          res => {
            res.message;
            this.getScientificProblems();
          }, error => {
            this.resultMessage ={
              message: error,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        )
      }     
    });
  }

  addReplyToScProb(event:IScientificProblemGridItems){
    this.showAddReplyToScProblem.emit(event);
    // let model : IAddScProbReply = {
    //   id : event.id,
    //   reply: event.repText
    // };
    // this.scientificProblemService.addScientificProblemReply(model).subscribe(res => {
    //   if (res.isSuccess){
    //     this.alertify.success(res.message || '');
    //     this.getScientificProblems();
    //   }
    //   else{
    //     this.alertify.error(res.message || '');
    //   }
    // }, error => {
    //   this.resultMessage ={
    //     message: error,
    //     type: BaseConstantModel.DANGER_TYPE
    //   }
    // })
  }

  saveScProbToQuestionBank(event:IScientificProblemGridItems){
    this.showAddScProblemToQuestionBank.emit(event);
    // let model : IAddScProbToQuestionBank = {
    //   id : event.id,
    //   question:event.questText,
    //   reply: event.repText
    // };
    // this.questionBankService.moveScProbToQuestionBank(model).subscribe(res => {
    //   if (res.isSuccess){
    //     this.alertify.success(res.message || '');
    //     this.getScientificProblems();
    //   }
    //   else{
    //     this.alertify.error(res.message || '');
    //   }
    // }, error => {
    //   this.resultMessage ={
    //     message: error,
    //     type: BaseConstantModel.DANGER_TYPE
    //   }
    // })
  }
}
