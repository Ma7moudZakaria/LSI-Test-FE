import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { UserService } from 'src/app/core/services/user-services/user.service';

@Component({
  selector: 'app-view-user-profile-custom',
  templateUrl: './view-user-profile-custom.component.html',
  styleUrls: ['./view-user-profile-custom.component.scss']
})
export class ViewUserProfileCustomComponent implements OnInit {


  RouteParams: any;
  userProfileDetails: any;
  isSuccess: any;
  successMessage: any;
  allLookups: any;
  listOfLookupProfile: string[] = ['GENDER', 'EDU_LEVEL', 'NATIONALITY', 'COUNTRY'];
  currentUser: any;
  errorMessage: any;
  collectionOfLookup = {} as ILookupCollection;
  profileForm: FormGroup = new FormGroup({})
  genderData: any;
  countryData: any;
  nationalityData: any;
  educationalLevelData: any;
  language: any;
  langEnum = LanguageEnum;
  birthdate: any;
  @Output() submitClose = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public translate: TranslateService,
    private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.language = this.language === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.userProfileDetails as IUserProfile;
    this.RouteParams = this.router.url;
    this.getUserProfile(this.currentUser.id);
  }

  getUserProfile(id: any) {
    this.userService.viewUserProfileDetails(id).subscribe(res => {

      this.userProfileDetails = res.data;
      this.birthdate = new Date(this.userProfileDetails.birthdate);
      this.birthdate = new Date(this.birthdate.setDate(this.birthdate.getDate() + 1)).toISOString().slice(0, 10);

      if (res.isSuccess) {
      }
      else {
        this.errorMessage = res.message;
      }
    });
  }

  logout(){
    this.authService.logout();
  }

  closeNav() {
    this.submitClose.emit(true);
  }

}
