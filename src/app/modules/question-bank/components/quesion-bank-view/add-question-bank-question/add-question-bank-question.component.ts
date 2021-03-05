import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, Input,Output, EventEmitter,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IquestionBankCategoriesModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
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
  //@Input() user: any;
  Title?: string;
  QuestionBankQuestionId:string='';
  QuestionBankQuestions?: IquestionBankQuestionsModel ;
  QuestionBankQuestionCreat: IquestionBankQuestionCreatModel = {};
  QuestionBankQuestionUpdate: IquestionBankQuestionUpdateModel = {};
  QBGLst:IquestionBankCategoriesModel[]=[];
  QBCid?:string="7bfcdb33-b3a0-43fd-af30-12167ac46508";
  isAdd:boolean=true;
  // currentWindowWidth?: number;
  errorMessage?:string;
  //maxDate: any;
  // msgs: Message[] = [];
  // CurrentForm: FormGroup;
  // errorMessage?:string;
  successMessage?:string;
  isSubmit = false;
  currentForm: FormGroup=new FormGroup({});
  //  formImport: FormGroup;
   @Input() selectedCategoryId?:string; 
   @Input() QuestionId?:string; 
  
  constructor(private questionBankQuestionService: QuestionBankQuestionService,
    private activeroute: ActivatedRoute, 
    private router: Router,
     public translate: TranslateService,private fb: FormBuilder) {
      // this.formImport = new FormGroup({
      //   importFile: new FormControl('', Validators.required)
      // });

      }

  ngOnInit(): void {
    this.QuestionBankQuestionId=this.QuestionId||"";
    if (this.QuestionId !== "" || this.QuestionId !== undefined) {
      this.Title = "Edit QuestionBankQuestion";
     // this.QuestionBankQuestionId = this.activeroute.snapshot.paramMap.get('id')||'';
      this.isAdd=false;
     this.loadQuestionBankQuestionDetails() ;
    } 
    else {
      this.Title = "Add QuestionBankQuestion";
      this.isAdd=true;
      this.currentForm.reset();
    }
   this.buildForm();
  }

  ngOnChanges(changes: any) {
   
    this.QuestionBankQuestionId=this.QuestionId||"";
    this.loadQuestionBankQuestionDetails() ;
   if( this.QuestionBankQuestionId==""){
    this.currentForm.reset();
   }
  }


  get f() {
    return this.currentForm?.controls;
  }
  buildForm() {
    this.currentForm = this.fb.group(
      {
       
        QuestioAr: ['', Validators.required],
        QuestionEn: ['', Validators.required],
        AnswerAr : ['', Validators.required],
        AnswerEn : ['', Validators.required],
      


      })
  }
  // @HostListener('window:resize')

  // onResize() {
  //   this.currentWindowWidth = window.innerWidth
  // }

  // setMaxDate() {
  //   this.maxDate = new Date().toISOString().split("T")[0];
  // }

  // get f() {
  //   return this.CurrentForm.controls;
  // }
  // buildForm() {

  //   this.CurrentForm = this.fb.group(
  //     {
  //       catogryName: [50, Validators.required],
  //     })

  // }
  loadQuestionBankQuestionDetails() {
    this.questionBankQuestionService.getQuestionBankQuestionDetails(this.QuestionBankQuestionId).subscribe(
      res => {
        var response =<BaseResponseModel>res;
        if (response.isSuccess) {
          this.QuestionBankQuestions = response.data;
          this.QBCid=this.QuestionBankQuestions?.categoryId;
          this.f.QuestioAr.setValue(this.QuestionBankQuestions?.arabQuestion);
          this.f.QuestionEn.setValue(this.QuestionBankQuestions?.engQuestion);
          this.f.AnswerAr.setValue(this.QuestionBankQuestions?.arabAnswer);
          this.f.AnswerEn.setValue(this.QuestionBankQuestions?.engAnswer);
        }
        else {
          this.errorMessage = response.message;
        }
      }, error => {
        console.log(error);
      })
  }
  PopulateForm() {
  }

  Submit() {
    this.isSubmit = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.QuestionBankQuestionId) {   
      this.QuestionBankQuestionUpdate.id=this.QuestionBankQuestionId;
      this.QuestionBankQuestionUpdate.no=this.QuestionBankQuestions?.no;
      this.QuestionBankQuestionUpdate.categoryId =this.QBCid;
      this.QuestionBankQuestionUpdate.arabQuestion=this.f.QuestioAr.value;
      this.QuestionBankQuestionUpdate.engQuestion=this.f.QuestionEn.value; 
      this.QuestionBankQuestionUpdate.arabAnswer=this.f.AnswerAr.value;
      this.QuestionBankQuestionUpdate.engAnswer=this.f.AnswerEn.value; 
      this.questionBankQuestionService.UpdateQuestionBankQuestion(this.QuestionBankQuestionUpdate).subscribe(res => {
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
      this.QBCid=this.selectedCategoryId;
      this.QuestionBankQuestionCreat.categoryId =this.QBCid;
      this.QuestionBankQuestionCreat.arabQuestion=this.f.QuestioAr.value;
      this.QuestionBankQuestionCreat.engQuestion=this.f.QuestionEn.value; 
      this.QuestionBankQuestionCreat.arabAnswer=this.f.AnswerAr.value;
      this.QuestionBankQuestionCreat.engAnswer=this.f.AnswerEn.value; 
      this.questionBankQuestionService.addQuestionBankQuestion(this.QuestionBankQuestionCreat).subscribe(res => {
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

    // this.confirmationService.confirm({
    //   key: 'confirm',
    //   message: this.translate.currentLang == 'en-US' ?
    //     'Are you sure that you want to cancel?' : "هل انت متاكد انك تريد الالغاء؟",
    //   header: this.translate.currentLang == 'en-US' ? 'Confirmation' : 'تاكيد',
    //   icon: 'pi pi-exclamation-triangle',
    //   acceptLabel: this.translate.currentLang == 'en-US' ? "Yes" : "نعم",
    //   rejectLabel: this.translate.currentLang == 'en-US' ? "No" : "لا",
    //   accept: () => {
    //     setTimeout(() => {
    //       this.router.navigateByUrl('/question-bank-categories-view/question-bank-categories-view');
    //     }, 1500);
    //     // this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
    //   },
    //   reject: () => {
    //     // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
    //   }
    // });
  }
  confirm() {
    // this.confirmationService.confirm({
    //   key: 'account',
    //   message: 'Are you sure that you want to proceed?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     // this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
    //   },
    //   reject: () => {
    //     // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
    //   }
    // });
  }
  checkPageAvaialbility() {
    // let scopes = this.permissionService.getUserScopes();

  }


}
