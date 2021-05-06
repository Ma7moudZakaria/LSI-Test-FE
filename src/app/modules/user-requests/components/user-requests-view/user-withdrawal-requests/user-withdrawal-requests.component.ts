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
  selector: 'app-user-withdrawal-requests',
  templateUrl: './user-withdrawal-requests.component.html',
  styleUrls: ['./user-withdrawal-requests.component.scss']
})
export class UserWithdrawalRequestsComponent implements OnInit {
  filterErrorMessage?:string;
  questionBankQuestionList: IQuestionBankQuestionsModel[] = [];
  questionBankQuestionFilter: IQuestionBankQuestionsFilterRequest = {};
  @Input() selectedCategoryId={id:'',arabCatgName:'',engCatgName:''}; 
  @Output() selectedQuestionId = new EventEmitter<string>();
  @Output() isViewAdd = new EventEmitter<boolean>();
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
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
  }

  getQuestionBankQuestions(CategoryId?:string,text?:string) {
    this.filterErrorMessage = "";
    this.resultMessage = {};
    this.questionBankQuestionFilter.skip=0;
    this.questionBankQuestionFilter.take= 2147483647;
    this.questionBankQuestionFilter.catgyId=CategoryId;
    this.questionBankQuestionFilter.text=text;
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
}
