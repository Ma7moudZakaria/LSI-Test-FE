import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IquestionBankCategoriesFilter } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-filter-.request';
import { IquestionBankCategoriesModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankCategoryService } from 'src/app/core/services/question-bank-services/question-bank-category.service';

@Component({
  selector: 'app-question-bank-categories-view',
  templateUrl: './question-bank-categories-view.component.html',
  styleUrls: ['./question-bank-categories-view.component.scss']
})
export class QuestionBankCategoriesViewComponent implements OnInit {
  currentWindowWidth?: number;
  smallScreen: number = 426;
  valueLang = "nameAr";
  filterErrorMessage?:string;
  QuestionBankCategoryList: IquestionBankCategoriesModel[] = []; ;
  QuestionBankCategoryFilter: IquestionBankCategoriesFilter = {};
  position: string="";
  msgs: Message[] = [];
 
  constructor(private questionBankCategoryService: QuestionBankCategoryService,private activeroute: ActivatedRoute, private router: Router, public translate: TranslateService) { }

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
    this.valueLang= this.translate.currentLang=='en-US'?'nameEn':'nameAr';
    // this.nav.show();
    this.getQuestionBankCategories(true)

  }
  getQuestionBankCategories(isLazyLoading = false) {
    this.filterErrorMessage = "";
    //reset skip on filter
    // if (!isLazyLoading) {
    //   this.QuestionBankCategoryFilter.skip = 0;
    // }
  
    //this.QuestionBankCategoryFilter.catgName = this.QuestionBankCategoryFilter.catgName == "" ? null : this.QuestionBankCategoryFilter.catgName;
    this.QuestionBankCategoryFilter.pageNumber=10;
    this.QuestionBankCategoryFilter.pageSize=1;
    this.questionBankCategoryService.getQuestionBankCategoriesFilter(this.QuestionBankCategoryFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.QuestionBankCategoryList = response.data;
       // this.totalRec = response.count;
        // this.from = this.QuestionBankCategoryFilter.skip + 1
        // this.to = this.QuestionBankCategoryFilter.skip + this.QuestionBankCategoryFilter.take 
        // if (this.to > this.totalRec) {
        //   this.to = this.totalRec;

        // }
      }
      else {
        this.QuestionBankCategoryList = [];
        this.filterErrorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      }
    )
  }
  clearFilter(){
    this.QuestionBankCategoryFilter = {};
    this.QuestionBankCategoryFilter.pageSize =0 ;
    this.QuestionBankCategoryFilter.pageNumber = 10;
    this.getQuestionBankCategories(true);
  }

  // confirm(id:string) {
  //   this.confirmationService.confirm({
  //     key: 'account',
  //     message: this.translate.currentLang == 'en-US' ?
  //     'Are You sure to delete the Third-Party Notice?' :"هل انت متاكد انك تريد الاستمرار؟",
  //     header: this.translate.currentLang == 'en-US' ? 'Alert' : "تنبيه",
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptLabel: this.translate.currentLang == 'en-US' ? "Ok" : "موافق",
  //     rejectVisible: false,

  //     accept: () => {
  //       this.questionBankCategoryService.deleteQuestionBankCategory(id).subscribe(
  //         res => {

            
  //           this.getQuestionBankCategories(true);
  //         }, error => {

  //         }
  //       )

  //         // this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];


  //     },
  //     reject: () => {

  //       // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //       // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //     }
  //   });
  
  // }

  confirmPosition(position: string) {
    this.position = position;

    // this.confirmationService.confirm({
    //   message: this.translate.currentLang == Languages.English ?'Do you want to delete this record?':'هل تريد حذف هذا السجل؟',
    //   header:this.translate.currentLang == Languages.English ? 'Delete Confirmation':'تأكيد الحذف',
    //   icon: 'pi pi-info-circle',
    //   accept: () => {
    //     // this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
    //   },
    //   reject: () => {
    //     // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
    //   },
    //   key: "positionDialog"
    // });
  }

}
