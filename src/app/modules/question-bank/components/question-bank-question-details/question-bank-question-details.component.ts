import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IQuestionBankQuestionsModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';

@Component({
  selector: 'app-question-bank-question-details',
  templateUrl: './question-bank-question-details.component.html',
  styleUrls: ['./question-bank-question-details.component.scss']
})
export class QuestionBankQuestionDetailsComponent implements OnInit {
  //valueLang = "nameEn";
  QuestionBankCategoryId:string='';
  QuestionBankQuestion?: IQuestionBankQuestionsModel ;
  //currentWindowWidth?: number;
  errorMessage?:string;
  //msgs: Message[] = [];
  QuestionBankQuestionId:string="";
  
  constructor(private questionBankQuestionService: QuestionBankQuestionService,
     public translate: TranslateService) { }
  ngOnInit(): void {

    // this.nav.show();
    // this.QuestionBankQuestionId = this.activeroute.snapshot.paramMap.get('id');
    // this.currentWindowWidth = window.innerWidth;
  }
  // @HostListener('window:resize')

  // onResize() {
  //   this.currentWindowWidth = window.innerWidth
  // }
  loadQuestionBankQuestionDetails() {
    this.questionBankQuestionService.getQuestionBankQuestionDetails(this.QuestionBankQuestionId).subscribe(
      res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {
          this.QuestionBankQuestion = response.data;
        }
        else {
          this.errorMessage = response.message;
        }
      }, error => {
        console.log(error);
      })
  }

  // confirmDelete() {
   
  
  //     this.confirmationService.confirm({
  //       key: 'confirm',
  //       message: this.translate.currentLang == 'en-US' ?
  //         'Are You sure to delete the Third-Party Notice?' : "هل انت متاكد انك تريد الاستمرار؟",
  //       header: this.translate.currentLang == 'en-US' ? 'Confirmation' : "تأكيد",
  //       icon: 'pi pi-exclamation-triangle',
  //       acceptButtonStyleClass: "red",
  //       acceptLabel: this.translate.currentLang == 'en-US' ? "Ok" : "موافق",
  //       rejectLabel: this.translate.currentLang == 'en-US' ? "No" : "لا",
  //       accept: () => {
  //         this.questionBankQuestionService.deleteQuestionBankQuestion(this.QuestionBankQuestionId).subscribe(
  //           res => {


  //             this.router.navigateByUrl('/question-bank-questions-view/question-bank-questions-view');

  //           }, error => {

  //           }
  //         )
  //         // this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];

  //       },
  //       reject: () => {
  //         // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //       }
  //     });
    

  // }


}
