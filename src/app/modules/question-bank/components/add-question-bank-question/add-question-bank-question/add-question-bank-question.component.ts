import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IquestionBankQuestionCreatModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-question-creat-model';
import { IquestionBankQuestionUpdateModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-question-update-model';
import { IquestionBankQuestionsModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';

@Component({
  selector: 'app-add-question-bank-question',
  templateUrl: './add-question-bank-question.component.html',
  styleUrls: ['./add-question-bank-question.component.scss']
})
export class AddQuestionBankQuestionComponent implements OnInit {
  @Input() user: any;
  Title?: string;
  QuestionBankQuestionId:string='';
  QuestionBankQuestions?: IquestionBankQuestionsModel ;
  QuestionBankQuestionCreat: IquestionBankQuestionCreatModel ;
  QuestionBankQuestionUpdate: IquestionBankQuestionUpdateModel ;
  isAdd:boolean=true;
  currentWindowWidth?: number;
  errorMessage?:string;
  maxDate: any;
  msgs: Message[] = [];
  CurrentForm: FormGroup;
  errorMessage?:string;
  successMessage?:string;
  isSubmit = false;
 
  constructor(private questionBankQuestionService: QuestionBankQuestionService,private activeroute: ActivatedRoute, private router: Router, public translate: TranslateService,private confirmationService: ConfirmationService,private fb: FormBuilder) { }
  ngOnInit(): void {
    if (this.activeroute.snapshot.paramMap.get('id') != null) {
      this.Title = "Edit QuestionBankQuestion";
      this.QuestionBankQuestionId = this.activeroute.snapshot.paramMap.get('id')||'';
      this.isAdd=false;
     this.loadQuestionBankQuestionDetails() ;
    } 
    else {
      this.Title = "Add QuestionBankQuestion";
      this.isAdd=true;
    }

  }
  @HostListener('window:resize')

  onResize() {
    this.currentWindowWidth = window.innerWidth
  }

  setMaxDate() {
    this.maxDate = new Date().toISOString().split("T")[0];
  }

  get f() {
    return this.CurrentForm.controls;
  }
  buildForm() {

    this.CurrentForm = this.fb.group(
      {
        catogryName: [50, Validators.required],
      })

  }
  loadQuestionBankQuestionDetails() {
    this.questionBankQuestionService.getQuestionBankQuestionDetails(this.QuestionBankQuestionId).subscribe(
      res => {
        // var response = Mapper.responseMapper(res);
        var response =<BaseResponseModel>res;
        if (response.isSuccess) {
          this.QuestionBankQuestions = response.data;
          // if (!this.checkPageAvaialbility()) {
          //   this.router.navigateByUrl('/notAuth/not-auth');
          // }
          

        }
        else {
          this.errorMessage = response.message;
        }
      }, error => {
        console.log(error);
      })
  }
  PopulateForm() {
   
    
    // this.f.RMSBranch.setValue(this.ThirdPartyNotice.branchRms);
  

   

  }
  Submit() {
    this.isSubmit = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.QuestionBankQuestionId == null ? this.f.paymentStatus.setValue("8442b75d-0f49-4a86-a630-78e75d48c4b9") : null;
    // this.QuestionBankCategory.paymentStatus = this.f.paymentStatus.value;

    if (this.QuestionBankQuestionId) {
      // this.QuestionBankCategoryCreat.updatedBy = this.user.userId;
    
      this.questionBankQuestionService.UpdateQuestionBankQuestion(this.QuestionBankQuestionUpdate).subscribe(res => {
        //var response = Mapper.responseMapper(res);
        if (res.isSuccess) {
          this.isSubmit = false;
          this.successMessage = res.message;
          setTimeout(() => {
            this.router.navigateByUrl('/question-bank-question-details/question-bank-question-details/'+this.QuestionBankQuestionId);
          }, 1500)
        }
        else {
          this.errorMessage = res.message;
        }
        
      },
        error => {
          
        })
    }
    else {
      // this.QuestionBankCategory.createdBy = this.user.userId;
      this.questionBankQuestionService.addQuestionBankQuestion(this.QuestionBankQuestionCreat).subscribe(res => {
        //var response = Mapper.responseMapper(res);
        this.isSubmit = false;
        if (res.isSuccess) {
          this.successMessage = res.message;
          setTimeout(() => {
            this.router.navigateByUrl('/question-bank-question-details/question-bank-question-details/'+this.QuestionBankQuestionId);
          }, 1500)
        }
        else {
          this.errorMessage = res.message;
        }
        
      },
        error => {
          
        })
    }
   
 

  }
  cancelConfirm() {

    this.confirmationService.confirm({
      key: 'confirm',
      message: this.translate.currentLang == 'en-US' ?
        'Are you sure that you want to cancel?' : "هل انت متاكد انك تريد الالغاء؟",
      header: this.translate.currentLang == 'en-US' ? 'Confirmation' : 'تاكيد',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.currentLang == 'en-US' ? "Yes" : "نعم",
      rejectLabel: this.translate.currentLang == 'en-US' ? "No" : "لا",
      accept: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/question-bank-categories-view/question-bank-categories-view');
        }, 1500);
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
  confirm() {
    this.confirmationService.confirm({
      key: 'account',
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
  checkPageAvaialbility() {
    // let scopes = this.permissionService.getUserScopes();

  }


}
