import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, Input,Output, EventEmitter,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IQuestionBankCategoriesModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
import { IQuestionBankQuestionCreatModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-question-creat-model';
import { IQuestionBankQuestionUpdateModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-question-update-model';
import { IQuestionBankQuestionsModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';

@Component({
  selector: 'app-add-question-bank-question',
  templateUrl: './add-question-bank-question.component.html',
  styleUrls: ['./add-question-bank-question.component.scss']
})
export class AddQuestionBankQuestionComponent implements OnInit {
  Title?: string;
  questionBankQuestionId:string='';
  questionBankQuestions?: IQuestionBankQuestionsModel ;
  questionBankQuestionCreat: IQuestionBankQuestionCreatModel = {};
  questionBankQuestionUpdate: IQuestionBankQuestionUpdateModel = {};
  qBGLst:IQuestionBankCategoriesModel[]=[];
  QBCid?:string="7bfcdb33-b3a0-43fd-af30-12167ac46508";
  isAdd:boolean=true;
  errorMessage?:string;
  successMessage?:string;
  isSubmit = false;
  currentForm: FormGroup=new FormGroup({});
   @Input() selectedCategoryId?:string; 
   @Input() selectedQuestionId?:string; 
   @Output() closeQuestionForm = new EventEmitter<boolean>();
   resultMessage:BaseMessageModel = {};
   disableSaveButtons = false;
  //  @Output() isQuestionSave = new EventEmitter<{}>();
  @Output() isQuestionSave = new EventEmitter<boolean>();
  constructor(private questionBankQuestionService: QuestionBankQuestionService,
    private activeroute: ActivatedRoute, 
    private router: Router,
     public translate: TranslateService,private fb: FormBuilder) {
      }

  ngOnInit(): void {
    this.currentForm.reset();
    this.disableSaveButtons = false;
    this.resultMessage = {
      message:'',
      type: ''
    }
    this.questionBankQuestionId=this.selectedQuestionId||"";
    if (this.selectedQuestionId !== "" ) {
      this.Title = "Edit QuestionBankQuestion";
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
    this.currentForm.reset();
    this.questionBankQuestionId=this.selectedQuestionId||"";
    if( this.questionBankQuestionId!="")
    {this.loadQuestionBankQuestionDetails() ;}
   if( this.questionBankQuestionId==""){
    this.currentForm.reset();
   }
   this.disableSaveButtons = false;
   this.resultMessage = {
     message:'',
     type: ''
   }
  }
  get f() {
    return this.currentForm?.controls;
  }
  buildForm() {
    const arabicWordPattern = "^[\u0621-\u064A\u0660-\u0669 ]+$";
    const englishWordPattern ="^[a-zA-Z' '-'\s]{1,40}$";
    this.currentForm = this.fb.group(
      {
        QuestioAr: ['', [Validators.required, Validators.pattern(arabicWordPattern)]],
        QuestionEn: ['', [Validators.required, Validators.pattern(englishWordPattern)]],
        AnswerAr :['', [Validators.required, Validators.pattern(arabicWordPattern)]],
        AnswerEn : ['', [Validators.required, Validators.pattern(englishWordPattern)]],
      })
  }
  loadQuestionBankQuestionDetails() {
    this.resultMessage = {
      message:'',
      type: ''
    }
    this.questionBankQuestionService.getQuestionBankQuestionDetails(this.questionBankQuestionId).subscribe(
      res => {
        var response =<BaseResponseModel>res;
        if (response.isSuccess) {
          this.questionBankQuestions = response.data;
          this.QBCid=this.questionBankQuestions?.categoryId;
          this.f.QuestioAr.setValue(this.questionBankQuestions?.arabQuestion);
          this.f.QuestionEn.setValue(this.questionBankQuestions?.engQuestion);
          this.f.AnswerAr.setValue(this.questionBankQuestions?.arabAnswer);
          this.f.AnswerEn.setValue(this.questionBankQuestions?.engAnswer);
          this.disableSaveButtons = false;
         
        }
        else {
          this.errorMessage = response.message;
        }
      }, error => {
        console.log(error);
      })
  }
  Submit() {
    this.isSubmit = true;
    this.errorMessage = '';
    this.successMessage = '';
    if (this.currentForm.valid) {
      if (this.questionBankQuestionId) {   
        this.questionBankQuestionUpdate.id=this.questionBankQuestionId;
        this.questionBankQuestionUpdate.no=this.questionBankQuestions?.no;
        this.questionBankQuestionUpdate.categoryId =this.QBCid;
        this.questionBankQuestionUpdate.arabQuestion=this.f.QuestioAr.value;
        this.questionBankQuestionUpdate.engQuestion=this.f.QuestionEn.value; 
        this.questionBankQuestionUpdate.arabAnswer=this.f.AnswerAr.value;
        this.questionBankQuestionUpdate.engAnswer=this.f.AnswerEn.value; 
        this.questionBankQuestionService.UpdateQuestionBankQuestion(this.questionBankQuestionUpdate).subscribe(res => {
          if (res.isSuccess) {
            this.isSubmit = false;
            this.disableSaveButtons = true;
            // this.successMessage = res.message;
            // setTimeout(() => {
            //   this.router.navigateByUrl('/question-bank-question-details/question-bank-question-details/'+this.QuestionBankQuestionId);
            // }, 1500)
            this.resultMessage = {
              message:res.message||"",
              type: BaseConstantModel.SUCCESS_TYPE
            }
            this.loodQuestionsListAfterAdd();
          }
          else {
            // this.errorMessage = res.message;
            this.disableSaveButtons = false;
            this.resultMessage = {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
          
        },
          error => {
            this.resultMessage = {
              message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
              type: BaseConstantModel.DANGER_TYPE
            }
          })
      }
      else {
        this.QBCid=this.selectedCategoryId;
        this.questionBankQuestionCreat.categoryId =this.QBCid;
        this.questionBankQuestionCreat.arabQuestion=this.f.QuestioAr.value;
        this.questionBankQuestionCreat.engQuestion=this.f.QuestionEn.value; 
        this.questionBankQuestionCreat.arabAnswer=this.f.AnswerAr.value;
        this.questionBankQuestionCreat.engAnswer=this.f.AnswerEn.value; 
        this.questionBankQuestionService.addQuestionBankQuestion(this.questionBankQuestionCreat).subscribe(res => {
          this.isSubmit = false;
          if (res.isSuccess) {
            this.disableSaveButtons = true;
            this.resultMessage = {
              message:res.message||"",
              type: BaseConstantModel.SUCCESS_TYPE
            }
            this.loodQuestionsListAfterAdd();
          }
          else {
            //this.errorMessage = res.message;
            this.disableSaveButtons = false;
            this.resultMessage = {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
          
        },
          error => {
            this.resultMessage = {
              message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
              type: BaseConstantModel.DANGER_TYPE
            }
          })
      }

    }

  
  }
  backListQuestio(){
    this.closeQuestionForm?.emit(false);
  }
  loodQuestionsListAfterAdd(){

    // this.isQuestionSave.emit({isSave:isSave,catogeryId:catogeryId});
    this.isQuestionSave.emit(true);
  }
}
