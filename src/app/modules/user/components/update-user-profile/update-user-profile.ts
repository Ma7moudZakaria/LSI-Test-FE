import { LIVE_ANNOUNCER_DEFAULT_OPTIONS } from '@angular/cdk/a11y';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IUpdateUserProfile } from 'src/app/core/interfaces/user-interfaces/iupdateuserprofile';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
import { IUserProfilePicture } from 'src/app/core/interfaces/user-interfaces/iuser-profile-picture';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { UserService } from 'src/app/core/services/user-services/user.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.html',
  styleUrls: ['./update-user-profile.scss']
})

export class UpdateUserProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({})
  completeUserProfile = false;
  updateUserProfile = false;
  resMessage: BaseMessageModel = {};
  currentUser: IUser | undefined;
  isSubmit = false;
  listOfLookupProfile: string[] = ['GENDER', 'EDU_LEVEL', 'NATIONALITY', 'COUNTRY'];
  userProfileDetails: IUserProfile = {};
  updateUserModel : IUpdateUserProfile = {};
  collectionOfLookup = {} as ILookupCollection;
  currentLang: LanguageEnum | undefined;

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private userService: UserService,
    private userProfileService: UserService,
    public translate: TranslateService) {
  }

  setCurrentLang(){
    this.currentLang = this.translate.currentLang == LanguageEnum.ar.split('-')[0] ? LanguageEnum.ar : LanguageEnum.en;
  }

  isRtlMode(){
    return this.currentLang == LanguageEnum.ar ? true : false;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.setCurrentLang();
    this.buildForm();
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;
      if (res.isSuccess) {
        this.getUserProfile(this.currentUser?.id)
      }
      else {
        this.resMessage = 
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    });
  }

  getUserProfile(id?: string) {
    this.userService.viewUserProfileDetails(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.userProfileDetails = res.data as IUserProfile;
        if (!this.userProfileDetails?.proPic){
          this.userProfileDetails.proPic = '../../../../../assets/images/profile1.png';
        }
        this.PopulateForm()
      }
      else {
        this.resMessage = 
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    });
  }

  onSubmit(value: string) {

    this.resMessage = {}
    if (this.profileForm.valid){
      this.updateUserModel = {
        usrId: this.currentUser?.id,
        firstAr: this.translate.currentLang === LanguageEnum.ar.split('-')[0] ? this.profileForm.value.firstName : this.userProfileDetails.fnameAr,
        firstEn:  this.translate.currentLang === LanguageEnum.en.split('-')[0] ? this.profileForm.value.firstName : this.userProfileDetails.fnameEn,
        middleAr: this.translate.currentLang === LanguageEnum.ar.split('-')[0] ? this.profileForm.value.middleName : this.userProfileDetails.mnameAr,
        middleEn: this.translate.currentLang === LanguageEnum.en.split('-')[0] ? this.profileForm.value.middleName : this.userProfileDetails.mnameEn,
        familyAr: this.translate.currentLang === LanguageEnum.ar.split('-')[0] ? this.profileForm.value.familyName : this.userProfileDetails.fanameAr,
        familyEn: this.translate.currentLang === LanguageEnum.en.split('-')[0] ? this.profileForm.value.familyName : this.userProfileDetails.faNameEn,
        birthdate: this.profileForm.value.birthdate,
        gender: this.profileForm.value.gender,
        mobile: this.profileForm.value.phoneNumber,
        countryCode: this.profileForm.value.countryCode,
        nationality: this.profileForm.value.nationality,
        eduLevel: this.profileForm.value.educationallevel,
        occupation: this.profileForm.value.occupation,
        address: this.profileForm.value.address
      }
  
      this.isSubmit = true;
      this.userProfileService.updateUser(this.updateUserModel).subscribe(
        res => {
          this.isSubmit = true;
          if (res.isSuccess) {
            this.resMessage = 
        {
          message: res.message,
          type: BaseConstantModel.SUCCESS_TYPE
        }
          }
          else {
            this.resMessage = 
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
          }
        }
      );
    }
    else{
      this.resMessage = 
        {
          message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
          type: BaseConstantModel.DANGER_TYPE
        }
    }
  }

  get f() {
    return this.profileForm.controls;
  }

  buildForm() {
    var mobilePattern = "^(05)([0-9]{8})*$|^(\\+\\d{1,3}[- ]?)?\\d{10}";
      this.profileForm = this.fb.group(
        {
          firstName: ['', Validators.required ],
          middleName: ['', Validators.required],
          familyName: ['', Validators.required],
          birthdate: [''],
          email: [''],
          nationality: [null, Validators.required],
          educationallevel: [null, Validators.required],
          gender: [null, Validators.required],
          address: ['', Validators.required],
          phoneNumber: ['', Validators.pattern(mobilePattern)],
          occupation: [null, Validators.required],
          countryCode: [null, Validators.required]
        }
      )
  }

  PopulateForm() {
    if (this.translate.currentLang === LanguageEnum.ar.split('-')[0]){
      this.f.firstName.setValue(this.userProfileDetails?.fnameAr ? this.userProfileDetails?.fnameAr : this.userProfileDetails?.fnameEn ? this.userProfileDetails?.fnameEn : '' );
      this.f.middleName.setValue(this.userProfileDetails?.mnameAr ? this.userProfileDetails?.mnameAr : this.userProfileDetails?.mnameEn ? this.userProfileDetails?.mnameEn : '');
      this.f.familyName.setValue(this.userProfileDetails?.fanameAr ? this.userProfileDetails?.fanameAr : this.userProfileDetails?.faNameEn ? this.userProfileDetails?.faNameEn : '');
    }
    else{
      this.f.firstName.setValue(this.userProfileDetails?.fnameEn ? this.userProfileDetails?.fnameEn : this.userProfileDetails?.fnameAr ? this.userProfileDetails?.fnameAr : '' );
      this.f.middleName.setValue(this.userProfileDetails?.mnameEn ? this.userProfileDetails?.mnameEn : this.userProfileDetails?.mnameAr ? this.userProfileDetails?.mnameAr : '');
      this.f.familyName.setValue(this.userProfileDetails?.faNameEn ? this.userProfileDetails?.faNameEn : this.userProfileDetails?.fanameAr ? this.userProfileDetails?.fanameAr : '');
    }
    this.f.address.setValue(this.userProfileDetails?.address);
    this.f.gender.setValue(this.userProfileDetails?.gender);
    this.f.email.setValue(this.userProfileDetails?.usrEmail);
    let birthdate = new Date(this.userProfileDetails?.birthdate || '');
    if (!isNaN(birthdate.getTime())){
      this.f.birthdate.setValue(
        new Date(birthdate.setDate(birthdate.getDate() + 1))
          .toISOString()
          .slice(0, 10)
      );
    }
    this.f.nationality.setValue(this.userProfileDetails?.nationality);
    this.f.occupation.setValue(this.userProfileDetails?.occupation);
    this.f.educationallevel.setValue(this.userProfileDetails?.eduLevel);
    this.f.phoneNumber.setValue(this.userProfileDetails?.mobile);
    this.f.countryCode.setValue(this.userProfileDetails?.countryCode);
  }

  onFileChange(files:any){
    let profImagModel: IUserProfilePicture = {
      usrId : this.currentUser?.id,
      image : files[0]
    }
    this.updateProfilePic(profImagModel);
  }

  updateProfilePic(profImagModel:IUserProfilePicture){
    const formData=new FormData();
    // formData.append('image', profImagModel.image);

    // profImagModel.image = formData;
    formData.append('UserProfilePictureModel.UserId',profImagModel.usrId || '');
    formData.append('UserProfilePictureModel.ProfileImage',profImagModel.image);

    this.userService.updateUserProfilePic(formData).subscribe(res => {
      if (res.isSuccess){
        this.userProfileDetails.proPic = res.data as string;
      }
      else{
        this.resMessage = {
          message : res.message,
          type : BaseConstantModel.DANGER_TYPE
        }
      }
    })
  }
}