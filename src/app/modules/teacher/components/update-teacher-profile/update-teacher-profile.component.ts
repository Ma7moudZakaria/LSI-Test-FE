import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { ITelInputParams } from 'src/app/core/interfaces/shared-interfaces/tel-input-interfaces/itel-input-params';
import { IUpdateUserProfile } from 'src/app/core/interfaces/user-interfaces/iupdateuserprofile';
import { IUserProfilePicture } from 'src/app/core/interfaces/user-interfaces/iuser-profile-picture';
import { IteacherProfile } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { TeacherService } from 'src/app/core/services/teacher-services/teacher.service';
import { UserService } from 'src/app/core/services/user-services/user.service';

@Component({
  selector: 'app-update-teacher-profile',
  templateUrl: './update-teacher-profile.component.html',
  styleUrls: ['./update-teacher-profile.component.scss']
})
export class UpdateTeacherProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({})
  currentUser: IUser | undefined;
  langEnum = LanguageEnum;
  telInputParam: ITelInputParams = {}
  userProfileDetails = {} as IteacherProfile;
  resMessage: BaseMessageModel = {};
  listbadges = [1, 2]
  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private teacherService: TeacherService,
    private userProfilePicService: UserService,
    private attachmentService: AttachmentsService,
    public translate: TranslateService,
    public languageService: LanguageService) {
  }


  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;

    this.buildForm();

  }


  get f() {
    return this.profileForm.controls;
  }

  buildForm() {

    if (this.translate.currentLang === LanguageEnum.ar) {
      this.profileForm = this.fb.group(
        {
          firstNameAr: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          middleNameAr: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          familyNameAr: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          birthdate: [''],
          email: [''],
          nationality: [null, Validators.required],
          gender: [null, Validators.required],
          address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          SelectTime: ['', [Validators.required]],
          SelectDay: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required/*,Validators.pattern(BaseConstantModel.mobilePattern), Validators.minLength(6), Validators.maxLength(16)*/]],
          countryCode: [null, Validators.required],
          quraanMemorization: ['', Validators.required],
          userSheikhs: [],
          userArchives: [],
          userCourses: [],
          // 
          AcademiceEducation: ['', [Validators.required]],
          educationallevel: [null, Validators.required],
          occupation: [null, Validators.required],
          LearnQuran: [null, Validators.required],
          side: [null, Validators.required],
          Duration: [null, Validators.required],
          //
          improvingQuran: [null, Validators.required],
          ExperienceTeachingSunnah: [null, Validators.required],
          ExperienceTeachingOnline: [null, Validators.required],
          ExperienceTeachingforeigners: [null, Validators.required],
          LeaveSave: [null, Validators.required],
          LeaveRecitation: [null, Validators.required],
          TypeReading: [null, Validators.required],
          Languages: [null, Validators.required],
          //
          workPlatform: [null, Validators.required],
          bankName: [null, Validators.required],
          accountNumber: [null, Validators.required],
          ChooseProgram: [null, Validators.required],
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
          firstNameEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          middleNameEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          familyNameEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          birthdate: [''],
          email: [''],
          nationality: [null, Validators.required],
          educationallevel: [null, Validators.required],
          gender: [null, Validators.required],
          address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          phoneNumber: ['', [Validators.required, Validators.pattern(BaseConstantModel.mobilePattern)]],
          occupation: [null, Validators.required],
          countryCode: [null, Validators.required],
          quraanMemorization: ['', Validators.required],
          userSheikhs: [],
          userArchives: [],
          userCourses: []

        }
      )
    }
  }

  getUserProfile(id?: string) {
    this.teacherService.viewTeacherProfileDetails(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.userProfileDetails = res.data as IteacherProfile;
        if (!this.userProfileDetails?.proPic) {
          this.userProfileDetails.proPic = '../../../../../assets/images/Profile.svg';
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
        this.userProfileDetails.proPic = res.data as string;
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



}
