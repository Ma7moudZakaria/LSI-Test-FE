import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IQuestionBankCategoriesModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
import { IQuestionBankCategoryCreatModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-category-creat-model';
import { IQuestionBankCategoryUpdateModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-category-update-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankCategoryService } from 'src/app/core/services/question-bank-services/question-bank-category.service';

@Component({
  selector: 'app-add-question-bank-category',
  templateUrl: './add-question-bank-category.component.html',
  styleUrls: ['./add-question-bank-category.component.scss']
})
export class AddQuestionBankCategoryComponent implements OnInit {
  //@Input() user: any;
  Title?: string;
  QuestionBankCategoryId:string='';
  QuestionBankCategory?: IQuestionBankCategoriesModel ;
  QuestionBankCategoryCreat: IQuestionBankCategoryCreatModel = {};
  QuestionBankCategoryUpdate: IQuestionBankCategoryUpdateModel = {} ;
  isAdd:boolean=true;
  // currentWindowWidth?: number;
  errorMessage?:string;
  maxDate: any;
  // msgs: Message[] = [];
   currentForm: FormGroup=new FormGroup({});
   formImport: FormGroup;
  successMessage?:string;
  isSubmit = false;
  resultMessage:BaseMessageModel = {};
  disableSaveButtons = false;
  @Input() inputCategoryId?:string; 
  constructor(private questionBankCategoryService: QuestionBankCategoryService,
    private activeroute: ActivatedRoute, 
    private router: Router, 
    public translate: TranslateService,private fb: FormBuilder) { 
      this.formImport = new FormGroup({
        importFile: new FormControl('', Validators.required)
      });
    }

  ngOnInit(): void {
    this.QuestionBankCategoryId=this.inputCategoryId||"";
    if (this.QuestionBankCategoryId !== "" ) {
      this.Title = "Edit QuestionBankCategory";
      this.isAdd=false;
      this.currentForm.reset();
     this.loadQuestionBankCategoryDetails() ;
    }
    else {
      this.Title = "Add QuestionBankCategory";
      this.currentForm.reset();
      this.isAdd=true;
    }
    this.buildForm();
  }
  ngOnChanges(changes: any) {
    this.currentForm.reset();
    this.QuestionBankCategoryId=this.inputCategoryId||"";
    if(this.QuestionBankCategoryId !== "")
    {this.loadQuestionBankCategoryDetails() ;}
   if( this.QuestionBankCategoryId==""){
    this.currentForm.reset();
   }
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
       
        nameAr:['', [Validators.required, Validators.pattern(arabicWordPattern)]],
        nameEn: ['', [Validators.required, Validators.pattern(englishWordPattern)]],

      })
  }
  
 
  loadQuestionBankCategoryDetails() {
    this.questionBankCategoryService.getQuestionBankCategoryDetails(this.QuestionBankCategoryId).subscribe(
      res => {
        var response =<BaseResponseModel>res;
        if (response.isSuccess) {
          this.QuestionBankCategory = response.data;
          this.f.nameAr.setValue(this.QuestionBankCategory?.arabCatgName);
      this.f.nameEn.setValue(this.QuestionBankCategory?.engCatgName);
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

      if (this.QuestionBankCategoryId) {
        this.QuestionBankCategoryUpdate.id=this.QuestionBankCategoryId;
        this.QuestionBankCategoryUpdate.no=this.QuestionBankCategory?.no;
        this.QuestionBankCategoryUpdate.arabCatgName=this.f.nameAr.value;
        this.QuestionBankCategoryUpdate.engCatgName=this.f.nameEn.value;
      
        this.questionBankCategoryService.UpdateQuestionBankCategory(this.QuestionBankCategoryUpdate).subscribe(res => {
          if (res.isSuccess) {
            this.isSubmit = false;
            this.resultMessage = {
              message:res.message||"",
              type: BaseConstantModel.SUCCESS_TYPE
            }
          }
          else {
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
        this.QuestionBankCategoryCreat.arabCatgName=this.f.nameAr.value;
        this.QuestionBankCategoryCreat.engCatgName=this.f.nameEn.value;
        this.questionBankCategoryService.addQuestionBankCategory(this.QuestionBankCategoryCreat).subscribe(res => {
          this.isSubmit = false;
          if (res.isSuccess) {
            this.resultMessage = {
              message:res.message||"",
              type: BaseConstantModel.SUCCESS_TYPE
            }
           
          }
          else {
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
  onKeydownEnglish(event:any) {
    var regex = new RegExp("^[a-zA-Z''-'\s]{1,40}$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
    return true
  }
  onKeydownArabic(event:any) {
    // if (event.which === 32)
    //   event.preventDefault();
    var regex = new RegExp("^[\u0621-\u064A\u0660-\u0669 ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(key)) {
      event.preventDefault();
      return false;
    }
    return true;
  }


}
