import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IquestionBankCategoriesModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';
import { QuestionBankCategoryService } from 'src/app/core/services/question-bank-services/question-bank-category.service';

@Component({
  selector: 'app-question-bank-category-details',
  templateUrl: './question-bank-category-details.component.html',
  styleUrls: ['./question-bank-category-details.component.scss']
})
export class QuestionBankCategoryDetailsComponent implements OnInit {
  valueLang = "nameEn";
  QuestionBankCategoryId:string='';
  QuestionBankCategory?: IquestionBankCategoriesModel ;
  currentWindowWidth?: number;
  errorMessage?:string;
  msgs: Message[] = [];
  constructor(private questionBankCategoryService: QuestionBankCategoryService,private activeroute: ActivatedRoute, private router: Router, public translate: TranslateService, private authService: AuthService,public nav: NavBarService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    // this.authService.currentLanguageEvent.subscribe(
    //   (singal: Languages) => {
    //     this.valueLang = this.translate.currentLang == 'en-US' ? 'nameEn' : 'nameAr';
       

    //   }
    // )
    this.nav.show();
    this.QuestionBankCategoryId = this.activeroute.snapshot.paramMap.get('id');
    this.currentWindowWidth = window.innerWidth;

  }
  @HostListener('window:resize')

  onResize() {
    this.currentWindowWidth = window.innerWidth
  }
  loadQuestionBankCategoryDetails() {
    this.questionBankCategoryService.getQuestionBankCategoryDetails(this.QuestionBankCategoryId).subscribe(
      res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {

          this.QuestionBankCategory = response.data;
       

        }
        else {
          this.errorMessage = response.message;
        }
      }, error => {
        console.log(error);
      })
  }

  

  confirmDelete() {
   
  
      this.confirmationService.confirm({
        key: 'confirm',
        message: this.translate.currentLang == 'en-US' ?
          'Are You sure to delete the Third-Party Notice?' : "هل انت متاكد انك تريد الاستمرار؟",
        header: this.translate.currentLang == 'en-US' ? 'Confirmation' : "تأكيد",
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: "red",
        acceptLabel: this.translate.currentLang == 'en-US' ? "Ok" : "موافق",
        rejectLabel: this.translate.currentLang == 'en-US' ? "No" : "لا",
        accept: () => {
          this.questionBankCategoryService.deleteQuestionBankCategory(this.QuestionBankCategoryId).subscribe(
            res => {


              this.router.navigateByUrl('/question-bank-categories-view/question-bank-categories-view');

            }, error => {

            }
          )
          this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];

        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        }
      });
    

  }

}
