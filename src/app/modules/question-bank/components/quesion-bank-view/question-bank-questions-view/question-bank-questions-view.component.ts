import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit ,EventEmitter, Input, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IquestionBankQuestionsFilterRequest } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-filter-request';
import { IquestionBankQuestionsModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';

@Component({
  selector: 'app-question-bank-questions-view',
  templateUrl: './question-bank-questions-view.component.html',
  styleUrls: ['./question-bank-questions-view.component.scss']
})
export class QuestionBankQuestionsViewComponent implements OnInit {
  //currentWindowWidth?: number;
  //smallScreen: number = 426;
  //valueLang = "nameAr";
  filterErrorMessage?:string;
  QuestionBankQuestionList: IquestionBankQuestionsModel[] = [];
  QuestionBankQuestionFilter: IquestionBankQuestionsFilterRequest = {};
  // position: string="";
  //msgs: Message[] = [];
  @Input() selectedCategoryId?:string; 
  @Output() QuestionId = new EventEmitter<{}>();;
  @Output() isViewAdd = new EventEmitter<boolean>();;
  constructor(private questionBankQuestionService: QuestionBankQuestionService,
     public translate: TranslateService) { }

  ngOnInit(): void {
    // this.currentWindowWidth = window.innerWidth;
    // this.valueLang= this.translate.currentLang=='en-US'?'nameEn':'nameAr';
    // this.nav.show();
    this.getQuestionBankQuestions()
  }
  ngOnChanges(changes: any) {
    // console.log(changes);
    this.getQuestionBankQuestions(changes.selectedCategoryId.currentValue);
    this.selectedCategoryId=changes.selectedCategoryId.currentValue;
  }
  searchQuestions(Questions?:string){
    this.QuestionBankQuestionList=[];
    this.getQuestionBankQuestions(this.selectedCategoryId,Questions) 
  }
  getQuestionBankQuestions(CategoryId?:any,Questions?:string) {
    this.filterErrorMessage = "";
    this.QuestionBankQuestionFilter.PageNumber=1;
    this.QuestionBankQuestionFilter.PageSize=10;
    this.QuestionBankQuestionFilter.catgyId=CategoryId;
    this.QuestionBankQuestionFilter.question=Questions;
    this.questionBankQuestionService.getQuestionBankQuestionsFilter(this.QuestionBankQuestionFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.QuestionBankQuestionList = response.data;
      }
      else {
        this.QuestionBankQuestionList = [];
        this.filterErrorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      }
    )
  }
  
  clearFilter(){
    this.QuestionBankQuestionFilter = {};
    this.QuestionBankQuestionFilter.PageNumber=10;
    this.QuestionBankQuestionFilter.PageSize=0;
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

  confirmPosition(position: string) {
    // this.position = position;

    // this.confirmationService.confirm({
    //   message: this.translate.currentLang == Languages.English ?'Do you want to delete this record?':'هل تريد حذف هذا السجل؟',
    //   header:this.translate.currentLang == Languages.English ? 'Delete Confirmation':'تأكيد الحذف',
    //   icon: 'pi pi-info-circle',
    //   accept: () => {
    //     this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
    //   },
    //   reject: () => {
    //     this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
    //   },
    //   key: "positionDialog"
    // });
  }
  loadQuestion(id?:string){
    this.QuestionId?.emit({id: id, show : true });
    // this.isViewAdd.emit(true);
  }
  NewQuestion(){
    this.QuestionId?.emit({id: '', show : true });
    // this.QuestionId?.emit("");
    // this.isViewAdd.emit(true);
  }
}
