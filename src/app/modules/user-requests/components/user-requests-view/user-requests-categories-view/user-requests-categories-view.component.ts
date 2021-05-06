import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IQuestionBankCategoriesFilter } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-filter-.request';
import { IQuestionBankCategoriesModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
import { IQuestionBankCategoryCreatModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-category-creat-model';
import { IQuestionBankCategoryUpdateModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-category-update-model';
import { IUserRequestsCategory } from 'src/app/core/interfaces/scientific-problrm/iuser-requests';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { QuestionBankCategoryService } from 'src/app/core/services/question-bank-services/question-bank-category.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-requests-categories-view',
  templateUrl: './user-requests-categories-view.component.html',
  styleUrls: ['./user-requests-categories-view.component.scss']
})
export class UserRequestsCategoriesViewComponent implements OnInit {
  userRequestsCategoryList: IUserRequestsCategory[] = 
  [ 
    { userRequestNum : "1" , nameAr : "طلبات الانضمام" , nameEn : "JoinRequest" } , 
    { userRequestNum : "2" , nameAr : "طلبات الانسحاب" , nameEn : "ScientificProblem" } ,
    { userRequestNum : "3" , nameAr : "إشكالات علمية" , nameEn : "Withdrawal" } 
  ];

  @Output() selectedUserRequest = new EventEmitter<{}>();
  @Output() openScientificProblem = new EventEmitter<boolean>();
  langEnum = LanguageEnum;
  currentUser: IUser | undefined;
  role = RoleEnum;

  constructor(public translate: TranslateService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.selectedIndex = 0;
  }

  selectedIndex?: Number;
  loadUserRequests(userRequestNum?: string, nameAr?: string, nameEn?: string) {
    this.selectedUserRequest.emit({ userRequestNum: userRequestNum, nameAr: nameAr, nameEn: nameEn });
  }

  newScientificProblem() {
    this.openScientificProblem.emit(true);
  }
}
