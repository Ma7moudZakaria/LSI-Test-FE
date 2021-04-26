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
import * as moment from 'moment-hijri';

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
  updateTeacherModel: IUpdateTeacherProfile = {};

  resMessage: BaseMessageModel = {};
  degreeMessage: BaseMessageModel = {};
  drgreeList = Array<BaseLookupModel>();
  drgreeList__addition = Array<BaseLookupModel>();

  listbadges = [1, 2];
  isSubmit = false;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['GENDER', 'EDU_LEVEL', 'NATIONALITY', 'COUNTRY', 'CITY'
    , 'DEGREE', 'EDU_YEAR', 'INTERVIEW_DAY', 'LANG', 'QUALIFI', 'SPECIAL', 'WORKING_PLATFORM'];

  hijri: boolean = false;
  milady: boolean = false;
  dataPinding: any;
  higriPinding: any;
  MiladyPinding: any;
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
    this.buildForm();
    this.getLookupByKey();
  }

  //  retrunProgramAndDegreeData(){
  //   this.updateTeacherModel.teacherPrograms = [];
  //   this.updateTeacherModel.degree = [];

  //   if (this.drgreeList.length) {
  //     Array.from(this.drgreeList).forEach((elm: BaseLookupModel) => {
  //       if (this.updateTeacherModel.degree) {
  //         this.updateTeacherModel.degree.push({
  //          // sheikhsIds: elm.id
  //         });
  //       }

  //     })
  //   }}

  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;
      if (res.isSuccess) {
        this.getTeacherProfile(this.currentUser?.id)
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
          hijriBirthDate: [''],
          email: [''],
          nationality: [null, Validators.required],
          gender: [null, Validators.required],
          interviewTime: ['', [Validators.required]],
          interviewDay: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required/*,Validators.pattern(BaseConstantModel.mobilePattern), Validators.minLength(6), Validators.maxLength(16)*/]],
          country: [null, Validators.required],
          city: ['', Validators.required],

          // 
          acEdu: ['', [Validators.required]], //edu level
          qualifi: [null, Validators.required],
          special: [null, Validators.required],
          workingPlatForm: [null, Validators.required],
          entity: [null, Validators.required],
          eduYear: [null, Validators.required],

          //
          isHasQuranExp: [null, Validators.required],
          isHasTeachSunnaExp: [null, Validators.required],
          isHasInternetTeachExp: [null, Validators.required],
          isHasTeachForeignerExp: [null, Validators.required],
          isHasEjazaHafz: [null, Validators.required],
          isHasEjazaTelawa: [null, Validators.required],
          anyLangReading: [null, Validators.required],
          languages: [null, Validators.required],
          //
          workPlatform: [null, Validators.required],
          bankName: [null, Validators.required],
          bankNumber: [null, Validators.required],
          teacherPrograms: [null, Validators.required],
          proficiencyDegree: [null, Validators.required],
          //
          // writeProgram: [null, Validators.required],
          // proficiencyDegree_forSuggestion: [null, Validators.required],

        }
      )
    }
    else {
      this.profileForm = this.fb.group(
        {
          firstEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          middleEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          familyEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

          hijriBirthDate: [''],
          email: [''],
          nationality: [null, Validators.required],
          gender: [null, Validators.required],
          interviewTime: ['', [Validators.required]],
          interviewDay: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required/*,Validators.pattern(BaseConstantModel.mobilePattern), Validators.minLength(6), Validators.maxLength(16)*/]],
          country: [null, Validators.required],
          city: ['', Validators.required],

          // 
          acEdu: ['', [Validators.required]], //edu level
          qualifi: [null, Validators.required],
          special: [null, Validators.required],
          workingPlatForm: [null, Validators.required],
          entity: [null, Validators.required],
          eduYear: [null, Validators.required],

          //
          isHasQuranExp: [null, Validators.required],
          isHasTeachSunnaExp: [null, Validators.required],
          isHasInternetTeachExp: [null, Validators.required],
          isHasTeachForeignerExp: [null, Validators.required],
          isHasEjazaHafz: [null, Validators.required],
          isHasEjazaTelawa: [null, Validators.required],
          anyLangReading: [null, Validators.required],
          languages: [null, Validators.required],
          //
          workPlatform: [null, Validators.required],
          bankName: [null, Validators.required],
          bankNumber: [null, Validators.required],
          teacherPrograms: [null, Validators.required],
          proficiencyDegree: [null, Validators.required],
          // writeProgram: [null, Validators.required],
          // proficiencyDegree_forSuggestion: [null, Validators.required],

        }
      )
    }
  }


  PopulateForm() {
    if (this.translate.currentLang === LanguageEnum.ar) {
      this.f.fnameAr.setValue(this.teacherProfileDetails?.fnameAr);
      this.f.mnameAr.setValue(this.teacherProfileDetails?.mnameAr);
      this.f.familyAr.setValue(this.teacherProfileDetails?.fanameAr);

    }
    if (this.translate.currentLang === LanguageEnum.en) {
      this.f.firstEn.setValue(this.teacherProfileDetails?.fnameEn);
      this.f.middleEn.setValue(this.teacherProfileDetails?.mnameEn);
      this.f.familyEn.setValue(this.teacherProfileDetails?.faNameEn);
    }
    this.f.hijriBirthDate.setValue(this.teacherProfileDetails?.hijriBirthDate)
    this.f.email.setValue(this.teacherProfileDetails?.usrEmail)
    this.f.nationality.setValue(this.teacherProfileDetails?.nationality)
    this.f.country.setValue(this.teacherProfileDetails?.country)
    this.f.city.setValue(this.teacherProfileDetails?.city)
    this.f.gender.setValue(this.teacherProfileDetails?.gender)
    this.f.interviewTime.setValue(this.teacherProfileDetails?.interviewTime)
    this.f.interviewDay.setValue(this.teacherProfileDetails?.interviewDay)

    this.telInputParam.phoneNumber = this.teacherProfileDetails?.mobile;
    this.f.phoneNumber.setValue(this.teacherProfileDetails?.mobile);

    this.f.acEdu.setValue(this.teacherProfileDetails?.acEdu)
    this.f.qualifi.setValue(this.teacherProfileDetails?.qualifi)
    this.f.special.setValue(this.teacherProfileDetails?.specia)
    this.f.workingPlatForm.setValue(this.teacherProfileDetails?.workingPlatForm)
    this.f.entity.setValue(this.teacherProfileDetails?.entity)
    this.f.eduYear.setValue(this.teacherProfileDetails?.eduYear)

    this.f.isHasQuranExp.setValue(this.teacherProfileDetails?.isHasQuranExp)
    this.f.isHasTeachSunnaExp.setValue(this.teacherProfileDetails?.isHasTeachSunnaExp)
    this.f.isHasInternetTeachExp.setValue(this.teacherProfileDetails?.isHasInternetTeachExp)
    this.f.isHasTeachForeignerExp.setValue(this.teacherProfileDetails?.isHasTeachForeignerExp)
    this.f.isHasEjazaHafz.setValue(this.teacherProfileDetails?.isHasEjazaHafz)
    this.f.isHasEjazaTelawa.setValue(this.teacherProfileDetails?.isHasEjazaTelawa)

    this.f.anyLangReading.setValue(this.teacherProfileDetails?.anyLangReading)
    this.f.languages.setValue(this.teacherProfileDetails?.lang)
    //this.f.workPlatform.setValue(this.teacherProfileDetails?.workingPlatForm)
    this.f.bankName.setValue(this.teacherProfileDetails?.bankName)
    this.f.bankNumber.setValue(this.teacherProfileDetails?.bankNumber)
    this.f.teacherPrograms.setValue(this.teacherProfileDetails?.teacherPrograms)
    this.f.proficiencyDegree.setValue(this.teacherProfileDetails?.degree)




  }

  getTeacherProfile(id?: string) {
    this.teacherService.viewTeacherProfileDetails(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.teacherProfileDetails = res.data as ITeacherProfile;
        if (!this.teacherProfileDetails?.proPic) {
          this.teacherProfileDetails.proPic = '../../../../../assets/images/Profile.svg';
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

  onSubmit(value: string) {
    this.isSubmit = true;
    this.resMessage = {}
    if (this.profileForm.valid) {
      this.updateTeacherModel = {
        usrId: this.currentUser?.id,
        firstAr: this.profileForm.value.firstAr != null ? this.profileForm.value.firstAr : this.teacherProfileDetails.fnameAr,
        firstEn: this.profileForm.value.firstEn != null ? this.profileForm.value.firstEn : this.teacherProfileDetails.faNameEn,
        middleAr: this.profileForm.value.middleAr != null ? this.profileForm.value.middleAr : this.teacherProfileDetails.mnameAr,
        middleEn: this.profileForm.value.middleEn != null ? this.profileForm.value.middleEn : this.teacherProfileDetails.mnameEn,

        familyAr: this.profileForm.value.familyAr != null ? this.profileForm.value.familyAr : this.teacherProfileDetails.fanameAr,
        familyEn: this.profileForm.value.familyEn != null ? this.profileForm.value.familyEn : this.teacherProfileDetails.fanameAr,
        nationality: this.profileForm.value.nationality,
        hijriBirthDate: this.profileForm.value.hijriBirthDate,
        gender: this.profileForm.value.gender,
        mobile: this.profileForm.value.phoneNumber,

        country: this.profileForm.value.country,
        city: this.profileForm.value.city,
        interviewDay: this.profileForm.value.interviewDay,
        interviewTime: this.profileForm.value.interviewTime,

        acEdu: this.profileForm.value.acEdu,
        qualifi: this.profileForm.value.qualifi,
        specia: this.profileForm.value.special,

        workingPlatForm: this.profileForm.value.workingPlatForm,
        entity: this.profileForm.value.entity,
        eduYear: this.profileForm.value.eduYear,
        isHasQuranExp: this.profileForm.value.isHasQuranExp,
        isHasTeachSunnaExp: this.profileForm.value.isHasTeachSunnaExp,
        isHasInternetTeachExp: this.profileForm.value.isHasInternetTeachExp,
        isHasTeachForeignerExp: this.profileForm.value.isHasTeachForeignerExp,
        isHasEjazaHafz: this.profileForm.value.isHasEjazaHafz,
        isHasEjazaTelawa: this.profileForm.value.isHasEjazaTelawa,
        anyLangReading: this.profileForm.value.anyLangReading,
        lang: this.profileForm.value.languages,

        agency: this.profileForm.value.workPlatform,
        bankName: this.profileForm.value.bankName,
        bankNumber: this.profileForm.value.bankNumber,


        // ejazaAttachments?: string[];
        // teacherPrograms?: string[];
        // degree?: string[];
      }

      this.degreeMessage = {};


      // this.updateTeacherModel.degree = [];
      // if (this.drgreeList.length) {
      //   Array.from(this.drgreeList).forEach((elm: BaseLookupModel) => {
      //     if (this.updateTeacherModel.degree) {
      //       this.updateTeacherModel.degree.push({
      //         // sheikhsIds: elm.id
      //       });
      //     }

      //   });
      // }


      this.teacherService.updateTeacher(this.updateTeacherModel).subscribe(
        res => {
          if (res.isSuccess) {
            this.isSubmit = false;

            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.SUCCESS_TYPE
            }
          }
          else {
            this.isSubmit = false;
            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        }, error => {
          // this.isSubmit = false;
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      );
    }
    else {
      this.resMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }


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
  Hijri(date: any) {
    date = date.year + '/' + date.month + '/' + date.day;
    console.log("Hijri date", date)
    this.higriPinding = date
  }


  addDrgree() {
    if (!this.profileForm.value.proficiencyDegree) {
      this.degreeMessage = {
        message: this.translate.instant('UPDATE_TEACHER_PG.CHOOSE_DEGREE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
    else {

      this.degreeMessage = {};

      const exist = this.drgreeList.some(el => el.id === this.profileForm.value.proficiencyDegree)
      if (!exist) {
        if (this.collectionOfLookup.DEGREE) {
          this.drgreeList.push(
            this.collectionOfLookup.DEGREE.filter(el => el.id == this.profileForm.value.proficiencyDegree)[0]);
        }
      }
    }
  }


  removeItemFromdrgreeList(item: any) {
    let index = this.drgreeList.indexOf(item);
    this.drgreeList.splice(index, 1)
  }



}
