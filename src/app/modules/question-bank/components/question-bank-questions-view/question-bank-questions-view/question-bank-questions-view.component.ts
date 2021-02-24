import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
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
  currentWindowWidth?: number;
  smallScreen: number = 426;
  valueLang = "nameAr";
  filterErrorMessage?:string;
  QuestionBankQuestionList: IquestionBankQuestionsModel[] = []; ;
  QuestionBankQuestionFilter: IquestionBankQuestionsFilterRequest = {};
  position: string="";
  msgs: Message[] = [];
 
  constructor(private questionBankQuestionService: QuestionBankQuestionService,private activeroute: ActivatedRoute, private router: Router, public translate: TranslateService, private confirmationService: ConfirmationService,public nav: NavBarService) { }

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
    this.valueLang= this.translate.currentLang=='en-US'?'nameEn':'nameAr';
    this.nav.show();
    this.getQuestionBankQuestions(true)
  }
  getQuestionBankQuestions(isLazyLoading = false) {
    this.filterErrorMessage = "";
    //reset skip on filter
    // if (!isLazyLoading) {
    //   this.QuestionBankCategoryFilter.skip = 0;
    // }
  
    //this.QuestionBankCategoryFilter.catgName = this.QuestionBankCategoryFilter.catgName == "" ? null : this.QuestionBankCategoryFilter.catgName;
    this.QuestionBankQuestionFilter.PageNumber=10;
    this.QuestionBankQuestionFilter.PageSize=0;
    this.questionBankQuestionService.getQuestionBankQuestionsFilter(this.QuestionBankQuestionFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.QuestionBankQuestionList = response.data;
       // this.totalRec = response.count;
        // this.from = this.QuestionBankCategoryFilter.skip + 1
        // this.to = this.QuestionBankCategoryFilter.skip + this.QuestionBankCategoryFilter.take 
        // if (this.to > this.totalRec) {
        //   this.to = this.totalRec;

        // }
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
    this.getQuestionBankQuestions(true);
  }

  confirm(id:string) {
    this.confirmationService.confirm({
      key: 'account',
      message: this.translate.currentLang == 'en-US' ?
      'Are You sure to delete the Third-Party Notice?' :"هل انت متاكد انك تريد الاستمرار؟",
      header: this.translate.currentLang == 'en-US' ? 'Alert' : "تنبيه",
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.currentLang == 'en-US' ? "Ok" : "موافق",
      rejectVisible: false,

      accept: () => {
        this.questionBankQuestionService.deleteQuestionBankQuestion(id).subscribe(
          res => {

            
            this.getQuestionBankQuestions(true);
          }, error => {

          }
        )

          this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];


      },
      reject: () => {

        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  
  }

  confirmPosition(position: string) {
    this.position = position;

    this.confirmationService.confirm({
      message: this.translate.currentLang == Languages.English ?'Do you want to delete this record?':'هل تريد حذف هذا السجل؟',
      header:this.translate.currentLang == Languages.English ? 'Delete Confirmation':'تأكيد الحذف',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      },
      key: "positionDialog"
    });
  }

}
