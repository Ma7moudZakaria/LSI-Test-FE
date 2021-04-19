import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { UserService } from 'src/app/core/services/user-services/user.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-view-user-profile-custom',
  templateUrl: './view-user-profile-custom.component.html',
  styleUrls: ['./view-user-profile-custom.component.scss']
})
export class ViewUserProfileCustomComponent implements OnInit {
  RouteParams = {} as string;
  userProfileDetails = {} as IUserProfile;
  currentUser: IUser | undefined;
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;
  birthdate: string | undefined;
  userName: string | undefined;
  lang = LanguageEnum;
  @Output() submitClose = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    public translate: TranslateService,
    private userService: UserService,
    private dialog: MatDialog,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.RouteParams = this.router.url;
    this.getUserProfile(this.currentUser.id);
  }

  getUserProfile(id: any) {
    this.userService.viewUserProfileDetails(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.userProfileDetails = res.data as IUserProfile;
        if (this.userProfileDetails?.birthdate) {
          let birthdateValue = new Date(this.userProfileDetails.birthdate || '');
          this.birthdate = new Date(birthdateValue.setDate(birthdateValue.getDate() + 1)).toISOString().slice(0, 10);
        }
        if (!this.userProfileDetails?.proPic) {
          this.userProfileDetails.proPic = '../../../../../assets/images/Profile.svg';
        }
      }
      else {
        this.resMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  closeNav() {
    this.submitClose.emit(true);
  }

  result: string = '';
  async confirmDialog(id?: string) {
    const confirm = this.translate.instant('GENERAL.LOGOUT_CONFIRM');
    const message = this.translate.instant('GENERAL.LOGOUT_MESSAGE');

    const dialogData = new ConfirmDialogModel(confirm, message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (dialogResult == true) {
        this.logout();
      }

    });
  }

  navViewProf() {
    this.closeNav();
    this.router.navigateByUrl('/user/view-user-profile-details');
  }
}
