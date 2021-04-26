import { Component, HostListener, Input, Output,EventEmitter,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IExamFormCreatModel } from 'src/app/core/interfaces/exam-form-interfaces/iexam-form-creat-model';
import { IExamFormsModel } from 'src/app/core/interfaces/exam-form-interfaces/iexam-forms-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {
  Title?: string;
  QuestionBankCategoryId:string='';
  QuestionBankCategory?: IExamFormsModel ;
  QuestionBankCategoryCreat: IExamFormCreatModel = {};
  isAdd:boolean=true;
  errorMessage?:string;
  maxDate: any;
   currentForm: FormGroup=new FormGroup({});
   formImport: FormGroup;
  successMessage?:string;
  isSubmit = false;
  resultMessage:BaseMessageModel = {};
  disableSaveButtons = false;

  @Input() inputCategoryId?:string; 
  @Output() closeCategoryForm = new EventEmitter<boolean>();
  @Output() addCategory = new EventEmitter<boolean>();
  @Output() submitSuccess = new EventEmitter<boolean>();

  constructor(
    private examFormService: ExamFormService,
    private activeroute: ActivatedRoute, 
    private router: Router, 
    public translate: TranslateService,private fb: FormBuilder, private _alertify:AlertifyService
  ) {

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

    this.currentForm = this.fb.group(
      {
       
        nameAr:['', [Validators.required,Validators.maxLength(100), Validators.pattern(BaseConstantModel.ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],
        nameEn: ['', [Validators.required,Validators.maxLength(100),  Validators.pattern(BaseConstantModel.ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],

      })
  }
   
  populate() {
    this.examFormService.getExamFormDetails(this.QuestionBankCategoryId).subscribe(
      res => {
        var response =res;
        if (response.isSuccess) {
          this.QuestionBankCategory =<IExamFormsModel> response.data;
          this.f.nameAr.setValue(this.QuestionBankCategory?.arabExamFormNam);
          this.f.nameEn.setValue(this.QuestionBankCategory?.engExamFormNam);
        }
        else {
          this.resultMessage = {
            message: response.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
      
  }

  Submit() {
    this.isSubmit = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.resultMessage = {};
    
    if (this.currentForm.valid) {

   
        this.QuestionBankCategoryCreat.arabExamFormNam=this.f.nameAr.value;
        this.QuestionBankCategoryCreat.engExamFormNam=this.f.nameEn.value;
        this.examFormService.addExamForm(this.QuestionBankCategoryCreat).subscribe(res => {
          this.isSubmit = false;
          if (res.isSuccess) {
            this.resultMessage = {
              message:res.message||"",
              type: BaseConstantModel.SUCCESS_TYPE
            }
            this. loodCategoryList();
            this.submitSuccess?.emit(false);//close form after submit is success
            this._alertify.success(res.message||"");
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
              message: error,
              type: BaseConstantModel.DANGER_TYPE
            }
          })
    }

  }

  loodCategoryList(){

    this.addCategory.emit(true);
  }

  backListCatogry(){
    this.closeCategoryForm?.emit(false);
  }
}
