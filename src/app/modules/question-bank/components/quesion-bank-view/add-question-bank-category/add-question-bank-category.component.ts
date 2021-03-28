import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, Input, Output,EventEmitter,OnInit } from '@angular/core';
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
  @Output() closeCategoryForm = new EventEmitter<boolean>();
  @Output() addCategory = new EventEmitter<boolean>();
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
      this.isAdd=false;
      this.currentForm.reset();
     this.populate() ;
    }
    else {
      this.currentForm.reset();
      this.isAdd=true;
    }
    this.buildForm();
  }
  ngOnChanges(changes: any) {
    this.currentForm.reset();
    this.QuestionBankCategoryId=this.inputCategoryId||"";
    if(this.QuestionBankCategoryId !== "")
    {this.populate() ;}
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
    const arabicWordPattern = "^[\u0621-\u064A\u0660-\u0669 0-9]+$";
    const englishWordPattern ="^[a-zA-Z0-9' '-'\s]{1,40}$";

    const ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[\u0621-\u064A\u0660-\u0669 0-9_@./#&+-~؛)(÷*/'/!/$/u{1F600}/u{1F6FF}]+$";
    const ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[ A-Za-z0-9_@./#&+-~؛)(÷*/'/!/$/u{1F600}/u{1F6FF}]*$";
    const ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITH_EMOJI = "^[\u0621-\u064A\u0660-\u0669 0-9_@./#&+-~؛)(÷*/'/!/$]+$";
    const ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITH_EMOJI = "^[ A-Za-z0-9_@./#&+-~؛)(÷*/'/!/$]*$";
    this.currentForm = this.fb.group(
      {
       
        nameAr:['', [Validators.required,Validators.maxLength(500), Validators.pattern(ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],
        nameEn: ['', [Validators.required,Validators.maxLength(500),  Validators.pattern(ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],

      })
  }
  
 
  populate() {
    this.questionBankCategoryService.getQuestionBankCategoryDetails(this.QuestionBankCategoryId).subscribe(
      res => {
        var response =res;
        if (response.isSuccess) {
          this.QuestionBankCategory =<IQuestionBankCategoriesModel> response.data;
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
            this. loodCategoryList();
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
            this. loodCategoryList();
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
  loodCategoryList(){

    this.addCategory.emit(true);
  }
  backListCatogry(){
    this.closeCategoryForm?.emit(false);
  }

}
