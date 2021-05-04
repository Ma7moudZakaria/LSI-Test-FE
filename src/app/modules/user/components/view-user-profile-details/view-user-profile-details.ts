import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { UserService } from 'src/app/core/services/user-services/user.service';


@Component({
  selector: 'app-view-user-profile-details',
  templateUrl: './view-user-profile-details.html',
  styleUrls: ['./view-user-profile-details.scss']
})

export class ViewUserProfileDetailsComponent implements OnInit {
  listbadges = [1, 2]
  RouteParams = {} as string;
  userProfileDetails = {} as IUserProfile;
  currentUser: IUser | undefined;
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;
  birthdate: string | undefined;
  langEnum = LanguageEnum;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public translate: TranslateService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.RouteParams = this.router.url;
    this.getUserProfile(this.currentUser.id);
  }

  getUserProfile(id: any) {
    this.userService.viewUserProfileDetails(id).subscribe(res => {

      this.userProfileDetails = res.data as IUserProfile;
      
      if (res.isSuccess) {
      }
      else {
        this.resMessage = {
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

  navEditProf() {
    this.router.navigateByUrl('/user/update-user-profile');
  }
}