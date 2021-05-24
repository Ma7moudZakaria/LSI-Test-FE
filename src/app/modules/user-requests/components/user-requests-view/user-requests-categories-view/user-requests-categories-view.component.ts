import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { UserRequests } from 'src/app/core/enums/user-requests.enum.enum';
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
    { userRequestNum : UserRequests.JoinRequest , nameAr : "طلبات الانضمام" , nameEn : "Join Request" } , 
    { userRequestNum : UserRequests.Withdrawal , nameAr : "طلبات الانسحاب" , nameEn : "Withdrawal" } ,
    { userRequestNum : UserRequests.ScientificProblem , nameAr : "الإشكالات علمية" , nameEn : "Scientific Problems" } 
  ];

  @Output() selectedCategoryId = new EventEmitter<UserRequests>();
  // @Output() openScientificProblem = new EventEmitter<boolean>();
  // @Output() inputCategoryId = new EventEmitter<string>();

  langEnum = LanguageEnum;
  currentUser: IUser | undefined;
  role = RoleEnum;
  selectedIndex: Number = 0;

  constructor(public translate: TranslateService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
  }

  
  loadUserRequests(item : IUserRequestsCategory) {
    this.selectedCategoryId.emit(item.userRequestNum);
   // this.selectedIndex = this.selectedIndex;
  }
}
