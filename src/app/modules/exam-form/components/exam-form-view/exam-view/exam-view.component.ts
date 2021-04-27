import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IExamFormCreatModel } from 'src/app/core/interfaces/exam-form-interfaces/iexam-form-creat-model';
import { IExamFormFilter } from 'src/app/core/interfaces/exam-form-interfaces/iexam-form-filter-request';
import { IExamFormsModel } from 'src/app/core/interfaces/exam-form-interfaces/iexam-forms-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.scss']
})
export class ExamViewComponent implements OnInit {
  filterErrorMessage?:string;
  questionBankCategoryList: IExamFormsModel[] = []; ;
  questionBankCategoryFilter: IExamFormFilter = {};
  position: string="";
  isView: boolean = true;
  title?: string;
  questionBankCategoryId:string='';
  questionBankCategory?: IExamFormsModel ;
  questionBankCategoryCreat: IExamFormCreatModel = {};
  questionBankCategoryUpdate: IExamFormCreatModel = {} ;
  isAdd:boolean=true;
  errorMessage?:string;
   currentForm: FormGroup=new FormGroup({});
   formImport: FormGroup;
  successMessage?:string;
  isSubmit = false;
@Output() selectedCategoryId= new EventEmitter<{}>();
@Output() inputCategoryId= new EventEmitter<string>();
clickChangeCtogry:string="";
resultMessage:BaseMessageModel = {};
disableSaveButtons = false;
langEnum = LanguageEnum;
@Input() addCategory=false;
  constructor(private questionBankCategoryService: ExamFormService,
    private activeroute: ActivatedRoute, 
    private router: Router, public translate: TranslateService,private fb: FormBuilder,public dialog: MatDialog) {
      this.formImport = new FormGroup({
        importFile: new FormControl('', Validators.required)
      });

     }

  ngOnInit(): void {
    this.getQuestionBankCategories()
    this.buildForm();
    if(this.addCategory===true){  this.getQuestionBankCategories();}
  }

  ngOnChanges(changes: any) {
    if(this.addCategory==true){  this.getQuestionBankCategories();}
  }
  get f() {
    return this.currentForm?.controls;
  }
  buildForm() {
    this.currentForm = this.fb.group(
      {
        nameAr: ['', Validators.required],
        nameEn: ['', Validators.required],
      })
  }
  getQuestionBankCategories(name?:string) {
    this.isView=true;
    this.questionBankCategoryId="";
    this.filterErrorMessage = "";
    if(name!=null||name!=""){ this.questionBankCategoryFilter.examFormNam=name;}
    this.questionBankCategoryFilter.skip=0;
    this.questionBankCategoryFilter.take= 2147483647;
    this.questionBankCategoryService.getExamFormFilter(this.questionBankCategoryFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.questionBankCategoryList = response.data;
        if(this.addCategory===false)
        {this.loadCatogryQuiestion(this.questionBankCategoryList[0].id,this.questionBankCategoryList[0].arabExamFormNam,this.questionBankCategoryList[0].engExamFormNam);
          this.selectedIndex=0;
        }
        
      }
      else {
        this.questionBankCategoryList = [];
        this.filterErrorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      }
    )
  }
  clearFilter(){
    this.questionBankCategoryFilter = {};
    this.questionBankCategoryFilter.skip =0 ;
    this.questionBankCategoryFilter.take =  100;
    this.getQuestionBankCategories();
  }
  ChangCTg(categoryId:string) {
    this.router.navigateByUrl('/questionBank/question-bank-questions-view/'+categoryId);
   }
   loadQuestionBankCategoryDetails(id?:string) {
    this.disableSaveButtons = false;
    this.resultMessage = {
      message:'',
      type: ''
    }
     this.isView=false;
     this.isAdd=false;
    this.questionBankCategoryId=id ||'';
    this.questionBankCategoryService.getExamFormDetails(this.questionBankCategoryId).subscribe(
      res => {
        var response =<BaseResponseModel>res;
        if (response.isSuccess) {
          this.questionBankCategory = response.data;
          this.f.nameAr.setValue(this.questionBankCategory?.arabExamFormNam);
      this.f.nameEn.setValue(this.questionBankCategory?.engExamFormNam);
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
    this.resultMessage = {};

 
      this.questionBankCategoryCreat.arabExamFormNam=this.f.nameAr.value;
      this.questionBankCategoryCreat.engExamFormNam=this.f.nameEn.value;
      this.questionBankCategoryService.addExamForm(this.questionBankCategoryCreat).subscribe(res => {
        this.isSubmit = false;
        if (res.isSuccess) {
          this.isView=false;
          // this.successMessage = res.message;
          this.disableSaveButtons = true;
          this.resultMessage = {
            message:res.message||"",
            type: BaseConstantModel.SUCCESS_TYPE
          }
          setTimeout(() => {
            this.getQuestionBankCategories();
          }, 1500)
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
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
    
  }

  addCatogry(){
    this.currentForm.reset();
    this.isView=false;
    this.isAdd=true;
    this.disableSaveButtons = false;
    this.resultMessage = {
      message:'',
      type: ''
    }
  }

  back_list_Catogry(){
    this.isView=true;
    this.isAdd=false;
  }

  selectedIndex?:Number;
  loadCatogryQuiestion(id?:string,arabCatgName?:string,engCatgName?:string){
    this.selectedCategoryId.emit({id:id,arabCatgName:arabCatgName,engCatgName:engCatgName});
  }
  
  result: string = '';
  confirmDialog(id?:string){
    const message =this.translate.currentLang === LanguageEnum.en ?"Are you sure that you want to delete this department":"هل متأكد من حذف هذا القسم";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Category' : 'حذف قسم', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result= dialogResult;
      if(dialogResult==true){
        this.questionBankCategoryService.deleteExamForm(id||'').subscribe(
          res => {
            res.message;
            
            this.getQuestionBankCategories();
          }, 
          error => {
            this.resultMessage = {
              message: error,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        )
      }     
    });
  }

  selectedIndex?:Number;
  loadCatogry(id?:string){
    this.inputCategoryId?.emit(id);
  }
  newCatogry(){
    this.inputCategoryId?.emit('');
  }

}
