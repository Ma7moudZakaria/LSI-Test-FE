import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit ,EventEmitter, Input, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IQuestionBankQuestionsFilterRequest } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-filter-request';
import { IQuestionBankQuestionsModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-question-bank-questions-view',
  templateUrl: './question-bank-questions-view.component.html',
  styleUrls: ['./question-bank-questions-view.component.scss']
})
export class QuestionBankQuestionsViewComponent implements OnInit {
  filterErrorMessage?:string;
  questionBankQuestionList: IQuestionBankQuestionsModel[] = [];
  questionBankQuestionFilter: IQuestionBankQuestionsFilterRequest = {};
  @Input() selectedCategoryId?:string; 
  @Output() selectedQuestionId = new EventEmitter<string>();;
  @Output() isViewAdd = new EventEmitter<boolean>();
  panelOpenState = false;
  currentlyOpenedItemIndex = -1;
  langEnum = LanguageEnum;

  constructor(private questionBankQuestionService: QuestionBankQuestionService,
     public translate: TranslateService,public dialog: MatDialog) {
      }

  ngOnInit(): void {
    this.getQuestionBankQuestions()
  }
  ngOnChanges(changes: any) {
    this.getQuestionBankQuestions(changes.selectedCategoryId.currentValue);
    this.selectedCategoryId=changes.selectedCategoryId.currentValue;
  }
  searchQuestions(Questions?:string){
    this.questionBankQuestionList=[];
    this.getQuestionBankQuestions(this.selectedCategoryId,Questions) 
  }
  getQuestionBankQuestions(CategoryId?:string,Questions?:string) {
    this.filterErrorMessage = "";
    this.questionBankQuestionFilter.skip=0;
    this.questionBankQuestionFilter.take= 1000;
    this.questionBankQuestionFilter.catgyId=CategoryId;
    this.questionBankQuestionFilter.question=Questions;
    this.questionBankQuestionService.getQuestionBankQuestionsFilter(this.questionBankQuestionFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.questionBankQuestionList = response.data;
      }
      else {
        this.questionBankQuestionList = [];
        this.filterErrorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      }
    )
  }
  clearFilter(){
    this.questionBankQuestionFilter = {};
    this.questionBankQuestionFilter.skip=0;
    this.questionBankQuestionFilter.take= 1000;
    this.getQuestionBankQuestions(this.selectedCategoryId);
  }

  delete_Question(id?:string) {
    this.questionBankQuestionService.deleteQuestionBankQuestion(id||'').subscribe(
      res => {

        alert("Delete Sucssed")
        this.getQuestionBankQuestions(this.selectedCategoryId);
      }, error => {

      }
    )
  
  }
  loadQuestion(id?:string){
    this.selectedQuestionId?.emit(id);
  }
  NewQuestion(){
    this.selectedQuestionId?.emit('');
  }
  async confirmDialog(id?:string){
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.questionBankQuestionService.deleteQuestionBankQuestion(id||'').subscribe(
          res => {
            res.message;
            this.getQuestionBankQuestions(this.selectedCategoryId);
          }, error => {
    
          }
        )

      }
     
    });
  }

  setOpened(itemIndex:number) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex:Number) {
    if(this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }
}
