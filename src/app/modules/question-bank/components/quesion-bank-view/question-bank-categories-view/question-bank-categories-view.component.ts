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
  //currentWindowWidth?: number;
  //smallScreen: number = 426;
  //valueLang = "nameAr";
  filterErrorMessage?:string;
  QuestionBankCategoryList: IquestionBankCategoriesModel[] = []; ;
  QuestionBankCategoryFilter: IquestionBankCategoriesFilter = {};
  position: string="";
  //msgs: Message[] = [];
  isView: boolean = true;
  Title?: string;
  QuestionBankCategoryId:string='';
  QuestionBankCategory?: IquestionBankCategoriesModel ;
  QuestionBankCategoryCreat: IquestionBankCategoryCreatModel = {};
  QuestionBankCategoryUpdate: IquestionBankCategoryUpdateModel = {} ;
  isAdd:boolean=true;
  // currentWindowWidth?: number;
  errorMessage?:string;
  maxDate: any;
  // msgs: Message[] = [];
   currentForm: FormGroup=new FormGroup({});
   formImport: FormGroup;
  successMessage?:string;
  isSubmit = false;

@Output() selectedCategoryId= new EventEmitter<string>();
clickChangeCtogry:string="";
  constructor(private questionBankCategoryService: QuestionBankCategoryService,
    private activeroute: ActivatedRoute, 
    private router: Router, public translate: TranslateService,private fb: FormBuilder) { 

      this.formImport = new FormGroup({
        importFile: new FormControl('', Validators.required)
      });
    }

  ngOnInit(): void {
    // this.currentWindowWidth = window.innerWidth;
    // this.valueLang= this.translate.currentLang=='en-US'?'nameEn':'nameAr';
    // this.nav.show();
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
    this.QuestionBankCategoryId="";
    this.filterErrorMessage = "";
    if(name!=null||name!=""){ this.QuestionBankCategoryFilter.catgName=name;}
   
    this.QuestionBankCategoryFilter.pageNumber=1;
    this.QuestionBankCategoryFilter.pageSize=10;
    this.questionBankCategoryService.getQuestionBankCategoriesFilter(this.QuestionBankCategoryFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.QuestionBankCategoryList = response.data;
        this.loadCatogryQuiestion(this.QuestionBankCategoryList[0].id)
      }
      else {
        this.QuestionBankCategoryList = [];
        this.filterErrorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      }
    )
  }
  clearFilter(){
    this.QuestionBankCategoryFilter = {};
    this.QuestionBankCategoryFilter.pageSize =0 ;
    this.QuestionBankCategoryFilter.pageNumber = 10;
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

  confirmPosition(position: string) {
    this.position = position;

    // this.confirmationService.confirm({
    //   message: this.translate.currentLang == Languages.English ?'Do you want to delete this record?':'هل تريد حذف هذا السجل؟',
    //   header:this.translate.currentLang == Languages.English ? 'Delete Confirmation':'تأكيد الحذف',
    //   icon: 'pi pi-info-circle',
    //   accept: () => {
    //     // this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
    //   },
    //   reject: () => {
    //     // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
    //   },
    //   key: "positionDialog"
    // });
  }
  ChangCTg(categoryId:string) {
  
    this.router.navigateByUrl('/questionBank/question-bank-questions-view/'+categoryId);
 
    
   }
   loadQuestionBankCategoryDetails(id?:string) {
     this.isView=false;
     this.isAdd=false;
    this.QuestionBankCategoryId=id ||'';
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
  PopulateForm() {
  }
  Submit() {
   
    this.isSubmit = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.QuestionBankCategoryId) {
      this.QuestionBankCategoryUpdate.id=this.QuestionBankCategoryId;
      this.QuestionBankCategoryUpdate.no=this.QuestionBankCategory?.no;
      this.QuestionBankCategoryUpdate.arabCatgName=this.f.nameAr.value;
      this.QuestionBankCategoryUpdate.engCatgName=this.f.nameEn.value;
    
      this.questionBankCategoryService.UpdateQuestionBankCategory(this.QuestionBankCategoryUpdate).subscribe(res => {
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
      this.QuestionBankCategoryCreat.arabCatgName=this.f.nameAr.value;
      this.QuestionBankCategoryCreat.engCatgName=this.f.nameEn.value;
      this.questionBankCategoryService.addQuestionBankCategory(this.QuestionBankCategoryCreat).subscribe(res => {
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
