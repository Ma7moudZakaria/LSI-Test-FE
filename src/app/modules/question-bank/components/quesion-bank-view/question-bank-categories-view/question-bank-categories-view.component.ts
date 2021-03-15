import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IQuestionBankCategoriesFilter } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-filter-.request';
import { IQuestionBankCategoriesModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
import { IQuestionBankCategoryCreatModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-category-creat-model';
import { IQuestionBankCategoryUpdateModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-category-update-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankCategoryService } from 'src/app/core/services/question-bank-services/question-bank-category.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-question-bank-categories-view',
  templateUrl: './question-bank-categories-view.component.html',
  styleUrls: ['./question-bank-categories-view.component.scss']
})
export class QuestionBankCategoriesViewComponent implements OnInit {
  filterErrorMessage?:string;
  questionBankCategoryList: IQuestionBankCategoriesModel[] = []; ;
  questionBankCategoryFilter: IQuestionBankCategoriesFilter = {};
  position: string="";
  isView: boolean = true;
  title?: string;
  questionBankCategoryId:string='';
  questionBankCategory?: IQuestionBankCategoriesModel ;
  questionBankCategoryCreat: IQuestionBankCategoryCreatModel = {};
  questionBankCategoryUpdate: IQuestionBankCategoryUpdateModel = {} ;
  isAdd:boolean=true;
  errorMessage?:string;
   currentForm: FormGroup=new FormGroup({});
   formImport: FormGroup;
  successMessage?:string;
  isSubmit = false;
@Output() selectedCategoryId= new EventEmitter<string>();
clickChangeCtogry:string="";
valueLang = "nameAr";
resultMessage={message:"",type:""};
disableSaveButtons = false;
  constructor(private questionBankCategoryService: QuestionBankCategoryService,
    private activeroute: ActivatedRoute, 
    private router: Router, public translate: TranslateService,private fb: FormBuilder,public dialog: MatDialog) { 
      this.formImport = new FormGroup({
        importFile: new FormControl('', Validators.required)
      });
      this.valueLang = this.translate.currentLang == 'en-US' ? 'nameEn' : 'nameAr';
    }
  ngOnInit(): void {
    this.getQuestionBankCategories()
    this.buildForm();
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
    if(name!=null||name!=""){ this.questionBankCategoryFilter.catgName=name;}
    this.questionBankCategoryFilter.skip=0;
    this.questionBankCategoryFilter.take= 100;
    this.questionBankCategoryService.getQuestionBankCategoriesFilter(this.questionBankCategoryFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.questionBankCategoryList = response.data;
        this.loadCatogryQuiestion(this.questionBankCategoryList[0].id)
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

//   delete_Categor(id?:string) {
//     this.questionBankCategoryService.deleteQuestionBankCategory(id||'').subscribe(
//       res => {
// alert("تم الحذف")
        
//         this.getQuestionBankCategories();
//       }, error => {

//       }
//     )
  
//   }
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
    this.questionBankCategoryService.getQuestionBankCategoryDetails(this.questionBankCategoryId).subscribe(
      res => {
        var response =<BaseResponseModel>res;
        if (response.isSuccess) {
          this.questionBankCategory = response.data;
          this.f.nameAr.setValue(this.questionBankCategory?.arabCatgName);
      this.f.nameEn.setValue(this.questionBankCategory?.engCatgName);
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
    if (this.questionBankCategoryId) {
      this.questionBankCategoryUpdate.id=this.questionBankCategoryId;
      this.questionBankCategoryUpdate.no=this.questionBankCategory?.no;
      this.questionBankCategoryUpdate.arabCatgName=this.f.nameAr.value;
      this.questionBankCategoryUpdate.engCatgName=this.f.nameEn.value;
    
      this.questionBankCategoryService.UpdateQuestionBankCategory(this.questionBankCategoryUpdate).subscribe(res => {
        if (res.isSuccess) {
          this.isSubmit = false;
          // this.successMessage = res.message;
          this.disableSaveButtons = true;
          this.resultMessage = {
            message:res.message||"",
            type: 'success'
          }
          this.isView=false;
          setTimeout(() => {
            this.getQuestionBankCategories();
          }, 1500)
        }
        else {
          // this.errorMessage = res.message;
          this.disableSaveButtons = false;
          this.resultMessage = {
            message:res.message||"",
            type: 'danger'
          }
        }
        
      },
        error => {
          
        })
    }
    else {
      this.questionBankCategoryCreat.arabCatgName=this.f.nameAr.value;
      this.questionBankCategoryCreat.engCatgName=this.f.nameEn.value;
      this.questionBankCategoryService.addQuestionBankCategory(this.questionBankCategoryCreat).subscribe(res => {
        this.isSubmit = false;
        if (res.isSuccess) {
          this.isView=false;
          // this.successMessage = res.message;
          this.disableSaveButtons = true;
          this.resultMessage = {
            message:res.message||"",
            type: 'success'
          }
          setTimeout(() => {
            this.getQuestionBankCategories();
          }, 1500)
        }
        else {
          // this.errorMessage = res.message;
          this.disableSaveButtons = false;
          this.resultMessage = {
            message:res.message||"",
            type: 'danger'
          }
        }
      },
        error => {
          
        })
    }
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
  loadCatogryQuiestion(id?:string){
    this.selectedCategoryId?.emit(id);
  }
  result: string = '';
 async confirmDialog(id?:string){
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result= dialogResult;
      if(dialogResult==true){
        this.questionBankCategoryService.deleteQuestionBankCategory(id||'').subscribe(
          res => {
            res.message;
            
            this.getQuestionBankCategories();
          }, error => {
            error.errorMessage;
          }
        )

      }
     
    });
  }
  
//  async confirm_Delete(id?:string){
//     await this.confirmDialog();
//     await this.delete_Categor(id);
//   }
}
