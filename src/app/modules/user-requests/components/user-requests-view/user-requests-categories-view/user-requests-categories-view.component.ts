import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IUserRequestsCategory } from 'src/app/core/interfaces/scientific-problrm/iuser-requests';

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

  @Output() selectedCategoryId = new EventEmitter<{}>();
  @Output() openScientificProblem = new EventEmitter<boolean>();
  @Output() inputCategoryId = new EventEmitter<string>();

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
    this.selectedCategoryId.emit({ userRequestNum: userRequestNum, nameAr: nameAr, nameEn: nameEn });
  }

  loadCatogry(id?: string) {
    this.inputCategoryId?.emit(id);
  }

  newScientificProblem() {
    this.openScientificProblem.emit(true);
  }
}
