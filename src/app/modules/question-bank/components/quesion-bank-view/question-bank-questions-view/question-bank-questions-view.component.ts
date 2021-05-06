import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit ,EventEmitter, Input, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IQuestionBankQuestionUpdateModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-question-update-model';
import { IQuestionBankQuestionUpdateOrderBy } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-question-update-order-by';
import { IQuestionBankQuestionsFilterRequest } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-filter-request';
import { IQuestionBankQuestionsModel } from 'src/app/core/interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-model';
import { IDragDropAccordionItems } from 'src/app/core/interfaces/shared-interfaces/accordion-interfaces/idrag-drop-accordion-items';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-question-bank-questions-view',
  templateUrl: './question-bank-questions-view.component.html',
  styleUrls: ['./question-bank-questions-view.component.scss']
})
export class QuestionBankQuestionsViewComponent implements OnInit {
  filterErrorMessage?:string;
  questionBankQuestionList: IQuestionBankQuestionsModel[] = [];
  questionBankQuestionFilter: IQuestionBankQuestionsFilterRequest = {};
  @Input() selectedCategoryId={id:'',arabCatgName:'',engCatgName:''}; 
  @Output() selectedQuestionId = new EventEmitter<string>();
  @Output() isViewAdd = new EventEmitter<boolean>();
  // @Input() isQuestionSave={isSave:false,catogeryId:''}; 
  @Input() isQuestionSave?:boolean; 
  panelOpenState = false;
  currentlyOpenedItemIndex = -1;
  langEnum = LanguageEnum;
  isSave=false;
  resultMessage:BaseMessageModel = {};
  items1:any;
  questionBankQuestionUpdateOrderBy:IQuestionBankQuestionUpdateOrderBy={};
  listOrder?: number[];

  currentUser: IUser | undefined;
  role = RoleEnum;
  isView = true;

  constructor(private questionBankQuestionService: QuestionBankQuestionService,
     public translate: TranslateService,public dialog: MatDialog) {
      }

  ngOnInit(): void {
    this.getQuestionBankQuestions("");

    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;

    let res = this.currentUser.usrRoles?.usrRoles?.some(x => x.roleNo == this.role.Student.toString() || x.roleNo == this.role.Teacher.toString());

    if(res == true){
      this.isView = false;
    }
    else{
      this.isView = true;
    }
  }

  ngOnChanges(changes: any) {
    if(this.isQuestionSave===true){ this.getQuestionBankQuestions(this.selectedCategoryId.id);}
    if(changes.selectedCategoryId?.currentValue.id!==undefined)
   {
    this.getQuestionBankQuestions(changes.selectedCategoryId.currentValue.id);
    this.selectedCategoryId.id=changes.selectedCategoryId.currentValue.id;
   }
   this.getQuestionBankQuestions("");
  }

  searchQuestions(text?:string){
    this.questionBankQuestionList=[];
    this.getQuestionBankQuestions(this.selectedCategoryId.id,text);
   
  }

  getQuestionBankQuestions(CategoryId?:string,text?:string) {
    this.filterErrorMessage = "";
    this.resultMessage = {};
    this.questionBankQuestionFilter.skip=0;
    this.questionBankQuestionFilter.take= 2147483647;
    this.questionBankQuestionFilter.catgyId=CategoryId;
    this.questionBankQuestionFilter.text=text;
    if(CategoryId!=""){
      this.questionBankQuestionService.getQuestionBankQuestionsFilter(this.questionBankQuestionFilter).subscribe(res => {
        let response = <BaseResponseModel>res;
        if (response.isSuccess) {
          this.questionBankQuestionList = response.data;
        }
        else {
          this.questionBankQuestionList = [];
          this.filterErrorMessage = response.message;
        }
      },
      error => {
        this.resultMessage ={
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
      )
    }
else{
  this.questionBankQuestionList = [];
}
  }

  clearFilter(){
    this.questionBankQuestionFilter = {};
    this.questionBankQuestionFilter.skip=0;
    this.questionBankQuestionFilter.take= 1000;
    this.getQuestionBankQuestions(this.selectedCategoryId.id);
  }

  delete_Question(id?:string) {
    this.questionBankQuestionService.deleteQuestionBankQuestion(id||'').subscribe(
      res => {

        alert("Delete Sucssed")
        this.getQuestionBankQuestions(this.selectedCategoryId.id);
      }, error => {
        this.resultMessage ={
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
  
  }

  loadQuestion(id?:string){
    this.selectedQuestionId?.emit(id);
  }

  NewQuestion(){
    this.selectedQuestionId?.emit('');
  }

   confirmDialog(id?:string){
    const message =this.translate.currentLang === LanguageEnum.en ?"Are you sure that you want to delete this question":"هل متأكد من حذف هذا السؤال";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Question' : 'حذف سؤال', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.questionBankQuestionService.deleteQuestionBankQuestion(id||'').subscribe(
          res => {
            res.message;
            this.getQuestionBankQuestions(this.selectedCategoryId.id);
          }, error => {
            this.resultMessage ={
              message: error,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        )
      }     
    });
  }

  setOpened(itemIndex:number) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex:Number) {
    if(this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

  onCheckboxChange(questionBankQuestionUpdate: IQuestionBankQuestionUpdateModel){

    this.questionBankQuestionService.updateQuestionBankQuestion(questionBankQuestionUpdate).subscribe(res => {
      if (res.isSuccess) {
        this.resultMessage = {
          message:res.message||"",
          type: BaseConstantModel.SUCCESS_TYPE
        }
        setTimeout(() => {
          this.resultMessage = {
            message:"",
            type:""
          }
        }, 1500)
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
        setTimeout(() => {
          this.resultMessage = {
            message:"",
            type:""
          }
        }, 1500)
      }
      
    },
      error => {
        this.resultMessage = {
          message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
          type: BaseConstantModel.DANGER_TYPE
        }
        setTimeout(() => {
          this.resultMessage = {
            message:"",
            type:""
          }
        }, 1500)
      })

  }

  drop(event: CdkDragDrop<IDragDropAccordionItems[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.listOrder=[];
      for(let i =0;i<=event.container.data.length-1;i++){
        this.listOrder?.push(event.previousContainer.data[i].order||(i+1));
      }
      this.questionBankQuestionUpdateOrderBy.categoryId=this.selectedCategoryId.id;
      this.questionBankQuestionUpdateOrderBy.orderList=this.listOrder;
    
      this.questionBankQuestionService.updateOrderQuestionBankQuestion(this.questionBankQuestionUpdateOrderBy).subscribe(res => {
        if (res.isSuccess) {
       this.getQuestionBankQuestions(this.selectedCategoryId.id);
        }
        else {
     
        }
        
      },
      error => {
        this.resultMessage ={
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
