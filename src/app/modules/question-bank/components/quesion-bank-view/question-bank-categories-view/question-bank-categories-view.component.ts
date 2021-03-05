import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IquestionBankCategoriesFilter } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-filter-.request';
import { IquestionBankCategoriesModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
import { IquestionBankCategoryCreatModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-category-creat-model';
import { IquestionBankCategoryUpdateModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-category-update-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankCategoryService } from 'src/app/core/services/question-bank-services/question-bank-category.service';

@Component({
  selector: 'app-question-bank-categories-view',
  templateUrl: './question-bank-categories-view.component.html',
  styleUrls: ['./question-bank-categories-view.component.scss']
})
export class QuestionBankCategoriesViewComponent implements OnInit {
  filterErrorMessage?:string;
  questionBankCategoryList: IquestionBankCategoriesModel[] = []; ;
  questionBankCategoryFilter: IquestionBankCategoriesFilter = {};
  position: string="";
  isView: boolean = true;
  title?: string;
  questionBankCategoryId:string='';
  questionBankCategory?: IquestionBankCategoriesModel ;
  questionBankCategoryCreat: IquestionBankCategoryCreatModel = {};
  questionBankCategoryUpdate: IquestionBankCategoryUpdateModel = {} ;
  isAdd:boolean=true;
  errorMessage?:string;
  maxDate: any;
   currentForm: FormGroup=new FormGroup({});
   formImport: FormGroup;
  successMessage?:string;
  isSubmit = false;
@Output() selectedCategoryId= new EventEmitter<string>();
clickChangeCtogry:string="";
valueLang = "nameAr";

  constructor(private questionBankCategoryService: QuestionBankCategoryService,
    private activeroute: ActivatedRoute, 
    private router: Router, public translate: TranslateService,private fb: FormBuilder) { 
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
    this.questionBankCategoryFilter.pageNumber=1;
    this.questionBankCategoryFilter.pageSize=10;
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
    this.questionBankCategoryFilter.pageSize =0 ;
    this.questionBankCategoryFilter.pageNumber = 10;
    this.getQuestionBankCategories();
  }

  delete_Categor(id?:string) {
    this.questionBankCategoryService.deleteQuestionBankCategory(id||'').subscribe(
      res => {
alert("تم الحذف")
        
        this.getQuestionBankCategories();
      }, error => {

      }
    )
  
  }
  ChangCTg(categoryId:string) {
    this.router.navigateByUrl('/questionBank/question-bank-questions-view/'+categoryId);
   }
   loadQuestionBankCategoryDetails(id?:string) {
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
          this.successMessage = res.message;
          // setTimeout(() => {
          //   this.router.navigateByUrl('/question-bank-categories-view/question-bank-categories-view');
          // }, 1500)
          this.isView=true;
          setTimeout(() => {
            this.getQuestionBankCategories();
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
      this.questionBankCategoryCreat.arabCatgName=this.f.nameAr.value;
      this.questionBankCategoryCreat.engCatgName=this.f.nameEn.value;
      this.questionBankCategoryService.addQuestionBankCategory(this.questionBankCategoryCreat).subscribe(res => {
        this.isSubmit = false;
        if (res.isSuccess) {
          this.isView=true;
          this.successMessage = res.message;
          setTimeout(() => {
            this.getQuestionBankCategories();
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
  addCatogry(){
    this.currentForm.reset();
this.isView=false;
this.isAdd=true;
  }
  back_list_Catogry(){
this.isView=true;
this.isAdd=false;
  }

 
  loadCatogryQuiestion(id?:string){
    this.selectedCategoryId?.emit(id);
  }

}
