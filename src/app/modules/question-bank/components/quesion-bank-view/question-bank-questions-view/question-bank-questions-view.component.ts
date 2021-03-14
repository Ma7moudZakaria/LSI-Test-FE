import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit ,EventEmitter, Input, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  @Output() selectedQuestionId = new EventEmitter<{}>();;
  @Output() isViewAdd = new EventEmitter<boolean>();
  valueLang = "nameAr";
  panelOpenState = false;
  currentlyOpenedItemIndex = -1;
  constructor(private questionBankQuestionService: QuestionBankQuestionService,
     public translate: TranslateService,public dialog: MatDialog) {
      this.valueLang = this.translate.currentLang == 'en-US' ? 'nameEn' : 'nameAr';
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
  getQuestionBankQuestions(CategoryId?:any,Questions?:string) {
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
    this.selectedQuestionId?.emit({id: id, show : true });
  }
  NewQuestion(){
    this.selectedQuestionId?.emit({id: '', show : true });
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

  items = [
    { header: 'Header 1', description: 'Description 1', content: 'Content 1' },
    { header: 'Header 2', description: 'Description 2', content: 'Content 2' },
    { header: 'Header 3', description: 'Description 3', content: 'Content 3' },
    { header: 'Header 4', description: 'Description 4', content: 'Content 4' },
    { header: 'Header 5', description: 'Description 5', content: 'Content 5' },
    { header: 'Header 6', description: 'Description 6', content: 'Content 6' },
    { header: 'Header 7', description: 'Description 7', content: 'Content 7' },
    { header: 'Header 8', description: 'Description 8', content: 'Content 8' },
    { header: 'Header 9', description: 'Description 9', content: 'Content 9' },
    { header: 'Header 10', description: 'Description 10', content: 'Content 10' },
  ];
  setOpened(itemIndex:number) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex:Number) {
    if(this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }
}
