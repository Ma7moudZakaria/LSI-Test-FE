import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
//
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
//
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { TeacherProfileService } from 'src/app/core/services/teacher-profile/teacher-profile.service';
import { UserService } from 'src/app/core/services/user-services/user.service';
//
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IUserProfilePicture } from 'src/app/core/interfaces/user-interfaces/iuser-profile-picture';

import { ITeacherProfile } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile';
import { IUpdateTeacherProfile } from 'src/app/core/interfaces/teacher-interfaces/iupdate-teacher-profile';

import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { ITelInputParams } from 'src/app/core/interfaces/shared-interfaces/tel-input-interfaces/itel-input-params';
//

@Component({
  selector: 'app-update-teacher-profile',
  templateUrl: './update-teacher-profile.component.html',
  styleUrls: ['./update-teacher-profile.component.scss']
})
export class UpdateTeacherProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({})
  currentUser: IUser | undefined;
  langEnum = LanguageEnum;
  telInputParam: ITelInputParams = {};
  teacherProfileDetails = {} as ITeacherProfile;
  resMessage: BaseMessageModel = {};
  listbadges = [1, 2];
  isSubmit = false;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['GENDER', 'EDU_LEVEL', 'NATIONALITY', 'COUNTRY', 'CITY'
    , 'DEGREE', 'EDU_YEAR', 'INTERVIEW_DAY', 'LANG', 'QUALIFI', 'SPECIAL', 'WORKING_PLATFORM'];


  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private teacherService: TeacherProfileService,
    private userProfilePicService: UserService,
    private userService: UserService,
    private attachmentService: AttachmentsService,
    public translate: TranslateService,
    public languageService: LanguageService) {
  }


  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.getUserProfile(this.currentUser.id);

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


  get f() {
    return this.profileForm.controls;
  }

  buildForm() {

    if (this.translate.currentLang === LanguageEnum.ar) {
      this.profileForm = this.fb.group(
        {
          firstAr: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          middleAr: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          familyAr: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          birthdate: [''],
          email: [''],
          nationality: [null, Validators.required],
          gender: [null, Validators.required],
          address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          interviewTime: ['', [Validators.required]],
          interviewDay: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required/*,Validators.pattern(BaseConstantModel.mobilePattern), Validators.minLength(6), Validators.maxLength(16)*/]],
          country: [null, Validators.required],
          // quraanMemorization: ['', Validators.required],
          city: ['', Validators.required],

          // 
          acEdu: ['', [Validators.required]], //QUALIFI
          educationallevel: [null, Validators.required],
          Special: [null, Validators.required],
          learnQuran: [null, Validators.required],
          side: [null, Validators.required],
          // Duration: [null, Validators.required],
          //
          improvingQuran: [null, Validators.required],
          experienceTeachingSunnah: [null, Validators.required],
          experienceTeachingOnline: [null, Validators.required],
          experienceTeachingforeigners: [null, Validators.required],
          leaveSave: [null, Validators.required],
          leaveRecitation: [null, Validators.required],
          typeReading: [null, Validators.required],
          languages: [null, Validators.required],
          //
          workPlatform: [null, Validators.required],
          bankName: [null, Validators.required],
          accountNumber: [null, Validators.required],
          chooseProgram: [null, Validators.required],
          proficiencyDegree: [null, Validators.required],
          //
          writeProgram: [null, Validators.required],
          proficiencyDegree_forSuggestion: [null, Validators.required],

        }
      )
    }
    else {
      this.profileForm = this.fb.group(
        {
          firstEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          middleEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          familyEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          birthdate: [''],
          email: [''],
          nationality: [null, Validators.required],
          educationallevel: [null, Validators.required],
          gender: [null, Validators.required],
          address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          phoneNumber: ['', [Validators.required, Validators.pattern(BaseConstantModel.mobilePattern)]],
          // occupation: [null, Validators.required],
          country: [null, Validators.required],
          quraanMemorization: ['', Validators.required],
          userSheikhs: [],
          userArchives: [],
          userCourses: []

        }
      )
    }
  }
  PopulateForm() {

    this.telInputParam.phoneNumber = this.teacherProfileDetails?.mobile;

  }

  getUserProfile(id?: string) {
    this.teacherService.viewTeacherProfileDetails(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.teacherProfileDetails = res.data as ITeacherProfile;
        if (!this.teacherProfileDetails?.proPic) {
          this.teacherProfileDetails.proPic = '../../../../../assets/images/Profile.svg';
        }
        // this.PopulateForm()
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

  onFileChange(files: any) {
    let profImagModel: IUserProfilePicture = {
      usrId: this.currentUser?.id,
      image: files[0]
    }
    this.updateProfilePic(profImagModel);
  }

  updateProfilePic(profImagModel: IUserProfilePicture) {
    const formData = new FormData();

    formData.append('UserProfilePictureModel.UserId', profImagModel.usrId || '');
    formData.append('UserProfilePictureModel.ProfileImage', profImagModel.image);

    this.userProfilePicService.updateUserProfilePic(formData).subscribe(res => {
      if (res.isSuccess) {
        this.teacherProfileDetails.proPic = res.data as string;
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
    })
  }
  onSubmit(value: string) { }

  applyPhoneNumber(phoneNumber: string) {
    this.f.phoneNumber.setValue(phoneNumber);
  }
  getCountryIsoCode() {
    this.userService.getCountryIsoCode().subscribe(res => {
      let code = res.data as string;
      this.telInputParam = {
        // phoneNumber:'+201062100486',
        isRequired: true,
        countryIsoCode: '{"initialCountry": "' + code.toLowerCase() + '"}'
      }
      // this.telInputParam.countryIsoCode = '{"initialCountry": "' + code.toLowerCase() +'"}';
    })
  }


}
