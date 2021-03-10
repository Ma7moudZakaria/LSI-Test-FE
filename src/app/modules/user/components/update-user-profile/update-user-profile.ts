import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IProfileUser } from 'src/app/core/interfaces/user-interfaces/iprofileuser';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { UserService } from 'src/app/core/services/user-services/user.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.html',
  styleUrls: ['./update-user-profile.scss']
})

export class UpdateUserProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({})
  userProfile = {} as IProfileUser;
  completeUserProfile = false;
  updateUserProfile = false;
  errorMessage: any;
  currentUser: any;
  routeParams: any;
  isSubmit = false;
  listOfLookupProfile: string[] = ['GENDER', 'EDU_LEVEL', 'NATIONALITY', 'COUNTRY'];
  successMessage: any;
  userProfileDetails: any;
  updateUserModel = {};
  collectionOfLookup = {} as ILookupCollection;

  genderData: any;
  countryData: any;
  nationalityData: any;
  educationalLevelData: any;
  language: any;

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private userService: UserService,
    private userProfileService: UserService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.language = this.language === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.buildForm();
    this.userProfileDetails as IUserProfile;
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {
      this.collectionOfLookup = res.data;
      if (res.isSuccess) {
        this.getUserProfile(this.currentUser.id)
        this.successMessage = {
          message: res.message,
          type: 'success'
        }
      }
      else {
        this.errorMessage = res.message;
      }
    });
  }

  getUserProfile(id: any) {
    this.userService.viewUserProfileDetails(id).subscribe(res => {
      this.userProfileDetails = res.data;
      if (res.isSuccess) {
        this.PopulateForm()
      }
      else {
        this.errorMessage = res.message;
      }
    });
  }

  onSubmit(value: string) {

    this.updateUserModel = {
      usrId: this.currentUser.id,
      firstAr: this.language == LanguageEnum.ar ? this.profileForm.value.name : this.userProfile.firstNameAr,
      firstEn: this.language == LanguageEnum.en ? this.profileForm.value.name : this.userProfile.firstNameEn,
      middleAr: this.language == LanguageEnum.ar ? this.profileForm.value.fatherName : this.userProfile.middleNameAr,
      middleEn: this.language == LanguageEnum.en ? this.profileForm.value.fatherName : this.userProfile.middleNameEn,
      familyAr: this.language == LanguageEnum.ar ? this.profileForm.value.familyName : this.userProfile.familyNameAr,
      familyEn: this.language == LanguageEnum.en ? this.profileForm.value.familyName : this.userProfile.familyNameEn,
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
          this.successMessage = {
            message: res.message,
            type: 'success'
          }
        }
        else {
          this.errorMessage = res.message;
        }
      }
    );
  }

  mappModel(form: NgForm) {
    this.userProfile.firstNameAr = this.language == LanguageEnum.ar ? form.value.name : this.userProfile.firstNameAr;
    this.userProfile.firstNameEn = this.language == LanguageEnum.en ? form.value.name : this.userProfile.firstNameEn;
    this.userProfile.middleNameAr = this.language == LanguageEnum.ar ? form.value.fatherName : this.userProfile.middleNameAr;
    this.userProfile.middleNameEn = this.language == LanguageEnum.en ? form.value.fatherName : this.userProfile.middleNameEn;
    this.userProfile.familyNameAr = this.language == LanguageEnum.ar ? form.value.familyName : this.userProfile.familyNameAr;
    this.userProfile.familyNameEn = this.language == LanguageEnum.en ? form.value.familyName : this.userProfile.familyNameEn;
    this.userProfile.address = form.value.address;
    this.userProfile.birthdate = form.value.birthdate;
    this.userProfile.occupation = form.value.occupation;
    this.userProfile.educationalLevelId = form.value.educationalLevelId;
    this.userProfile.genderId = form.value.genderId;
    this.userProfile.countryId = form.value.countryId;
    this.userProfile.nationalityId = form.value.nationalityId;
    this.userProfile.phoneNumber = form.value.phoneNumber;
    this.userProfile.userId = form.value.userId;
  }

  get f() {
    return this.profileForm.controls;
  }

  buildForm() {
    var mobilePattern = "^(05)([0-9]{8})*$|^(\\+\\d{1,3}[- ]?)?\\d{10}";
    this.profileForm = this.fb.group(
      {
        // firstNameAr: ['', Validators.required],
        // firstNameEn: ['', Validators.required],
        name: ['', Validators.required],
        fatherName: ['', Validators.required],
        familyName: ['', Validators.required],

        // middleNameAr: ['', Validators.required],
        // middleNameEn: ['', Validators.required],
        // familyNameAr: ['', Validators.required],
        // familyNameEn: ['', Validators.required],
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
    this.f.name.setValue(this.userProfileDetails.fnameAr);
    this.f.fatherName.setValue(this.userProfileDetails.mnameAr);
    this.f.familyName.setValue(this.userProfileDetails.mnameAr);
    // this.f.firstNameAr.setValue(this.userProfileDetails.fnameAr);
    // this.f.firstNameEn.setValue(this.userProfileDetails.fnameEn);
    // this.f.middleNameAr.setValue(this.userProfileDetails.mnameAr);
    // this.f.middleNameEn.setValue(this.userProfileDetails.mnameEn);
    // this.f.familyNameAr.setValue(this.userProfileDetails.fanameAr);
    // this.f.familyNameEn.setValue(this.userProfileDetails.faNameEn);
    this.f.address.setValue(this.userProfileDetails.address);
    this.f.gender.setValue(this.userProfileDetails.Gender);
    this.f.email.setValue(this.userProfileDetails.usrEmail);
    var birthdate = new Date(this.userProfileDetails.birthdate.toString());
    this.f.birthdate.setValue(
      new Date(birthdate.setDate(birthdate.getDate() + 1))
        .toISOString()
        .slice(0, 10)
    );
    this.f.nationality.setValue(this.userProfileDetails.Nationality);
    this.f.occupation.setValue(this.userProfileDetails.occupation);
    this.f.educationallevel.setValue(this.userProfileDetails.eduLevel);
    this.f.phoneNumber.setValue(this.userProfileDetails.Mobile);
    this.f.countryCode.setValue(this.userProfileDetails.CountryCode);
  }
}