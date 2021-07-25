import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { ITeacherProfileLookup } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile-lookup';
import { ITeacherProfileProgramDegreeLookup } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile-program-lookup';
import { IProgramFilterAdvancedRequest, IProgramFilterByNameRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';
import { ITeacherProfileAvailabilityLookup } from 'src/app/core/interfaces/teacher-interfaces/iteacher-availability-lookup';
import {DateType} from "ngx-hijri-gregorian-datepicker";
import {BaseSelectedDateModel} from "../../../../core/ng-model/base-selected-date-model";

@Component({
  selector: 'app-update-teacher-profile',
  templateUrl: './update-teacher-profile.component.html',
  styleUrls: ['./update-teacher-profile.component.scss']
})
export class UpdateTeacherProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({})
  currentUser: IUser | undefined;
  telInputParam: ITelInputParams = {};
  teacherProfileDetails = {} as ITeacherProfile;
  updateTeacherModel: IUpdateTeacherProfile = {};
  teacherProgramModel: ITeacherProfileProgramDegreeLookup = {};
  availabilityDaysModel: ITeacherProfileAvailabilityLookup = {};
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['GENDER', 'EDU_LEVEL', 'NATIONALITY', 'COUNTRY'
    , 'DEGREE', 'EDU_DATE', 'DAYS', 'LANG', 'QUALIFI', 'SPECIAL', 'REWAYAT', 'AGENCY', 'WORKING_PLATFORM'];

  resMessage: BaseMessageModel = {};
  selecteddrgreeList = Array<BaseLookupModel>();
  drgreeList__addition = Array<BaseLookupModel>();
  degreeMessage: BaseMessageModel = {};
  isSubmit = false;
  hijri: boolean = false;
  milady: boolean = false;
  hijriBinding: any;
  hijriBirthDateInputParam: NgbDateStruct = { year: 0, day: 0, month: 0 };
  hijriInterviewDayInputParam: NgbDateStruct = { year: 0, day: 0, month: 0 };

  ProgramsList: IprogramsModel[] = [];
  ProgramFilter: IProgramFilterAdvancedRequest = {};

  rewayatsMessage: BaseMessageModel = {};
  selectedRewayatsList = Array<ITeacherProfileLookup>();

  languagesMessage: BaseMessageModel = {};
  selectedLanguagesList = Array<ITeacherProfileLookup>();

  availabilityDaysMessage: BaseMessageModel = {};
  selectedAvailabilityDaysList = Array<ITeacherProfileAvailabilityLookup>();

  teacherProgramsMessage: BaseMessageModel = {};
  selectedTeacherProgramsList = Array<ITeacherProfileProgramDegreeLookup>();

  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  ejazaAttachmentIds: string[] = [];

  programFilterByNameFilterRequest = {} as IProgramFilterByNameRequest;

  event = {
    eampm: "AM"
  }
  selectedDateType : any;
  selectedDateType_Melady = DateType.Gregorian;  // or DateType.Gregorian
  selectedDateType_Hijri = DateType.Hijri;
  updateCalenderType: BaseSelectedDateModel= new BaseSelectedDateModel();

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private teacherService: TeacherProfileService,
    private userProfilePicService: UserService,
    public userService: UserService,
    private attachmentService: AttachmentsService,
    public translate: TranslateService,
    private ProgramService: ProgramService,
    public languageService: LanguageService) {
  }


  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.setCurrentLang();
    this.getCountryIsoCode();
    this.buildForm();
    this.getPrograms();
    this.getLookupByKey();
  }
  // @HostListener('window:beforeunload', ['$event'])
  // public onPageUnload($event: BeforeUnloadEvent) {
  //   if (this.unsavedDataCheck()) {
  //     $event.returnValue = true;
  //     // return "message";
  //   }
  //   else {
  //     $event.returnValue = false;
  //     // return '';
  //   }
  // }

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event: any) {
  //   this.userService.setCanDeActivate(this.unsavedDataCheck());
  // }

  unsavedDataCheck(): boolean {
    return this.profileForm.value.firstAr != this.teacherProfileDetails?.fnameAr
      || this.profileForm.value.firstNameEn != this.teacherProfileDetails?.faNameEn
      || this.profileForm.value.middleAr != this.teacherProfileDetails?.mnameAr
      || this.profileForm.value.middleNameEn != this.teacherProfileDetails?.mnameEn
      || this.profileForm.value.familyAr != this.teacherProfileDetails?.fanameAr
      || this.profileForm.value.familyNameEn != this.teacherProfileDetails?.faNameEn
      || this.profileForm.value.nationality != this.teacherProfileDetails?.nationality
      // || this.profileForm.value.hijriBirthDate != this.teacherProfileDetails?.hijriBirthDate
      || this.profileForm.value.gender != this.teacherProfileDetails?.gender
      || this.profileForm.value.mobile != this.teacherProfileDetails?.mobile
      || this.profileForm.value.country != this.teacherProfileDetails?.country
      || this.profileForm.value.city != this.teacherProfileDetails?.city
      || this.profileForm.value.nationality != this.teacherProfileDetails?.nationality
      || this.profileForm.value.edulevel != this.teacherProfileDetails?.eduLevel
      || this.profileForm.value.qualifi != this.teacherProfileDetails?.qualifi
      || this.profileForm.value.specia != this.teacherProfileDetails?.specia
      || this.profileForm.value.eduDate != this.teacherProfileDetails?.eduDate
      || this.profileForm.value.eduNum != this.teacherProfileDetails?.eduNum
      || this.profileForm.value.isHasQuranExp != this.teacherProfileDetails?.isHasQuranExp?.toString()
      || this.profileForm.value.isHasTeachSunnaExp != this.teacherProfileDetails?.isHasTeachSunnaExp?.toString()
      || this.profileForm.value.isHasInternetTeachExp != this.teacherProfileDetails?.isHasInternetTeachExp?.toString()
      || this.profileForm.value.isHasTeachForeignerExp != this.teacherProfileDetails?.isHasTeachForeignerExp?.toString()
      || this.profileForm.value.isHasEjazaHafz != this.teacherProfileDetails?.isHasEjazaHafz?.toString()
      || this.profileForm.value.workingPlatForm != this.teacherProfileDetails?.workingPlatForm
      || this.profileForm.value.isHasEjazaTelawa != this.teacherProfileDetails?.isHasEjazaTelawa?.toString()
      || this.profileForm.value.bankName != this.teacherProfileDetails?.bankName
      || this.profileForm.value.agency != this.teacherProfileDetails?.agency
      || this.profileForm.value.address != this.teacherProfileDetails?.address
      || this.profileForm.value.bankNumber != this.teacherProfileDetails?.bankNumber
    //    || this.profileForm.value.ejazaAttachmentIds!= this.teacherProfileDetails?.ejazaAttachments
  }

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
      this.getLookupByKey();
      this.buildForm();
      this.PopulateForm();
    });
  }

  emitHeaderTitle() {
    this.languageService.headerPageNameEvent.emit(this.translate.instant('UPDATE_TEACHER_PG.TITLE'));
  }

  getPrograms() {
    this.programFilterByNameFilterRequest = {
      name: ""
    }

    this.ProgramService.getAllPrograms(this.programFilterByNameFilterRequest).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.ProgramsList = response.data;
      }
      else {
        this.ProgramsList = [];
        this.resMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    },
      error => {
        console.log(error);
      }
    )
  }

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

  getCitiesLookupByCountry(id?: string) {
    let countryId = this.f['country'].value;
    this.lookupService.getCitiesByCountryId(countryId || '').subscribe(res => {
      if (res.isSuccess) {
        this.collectionOfLookup.CITY = res.data;
        this.collectionOfLookup && this.collectionOfLookup.CITY ? this.f.city.setValue(this.collectionOfLookup.CITY[0].id) : '';
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
          hijriBirthDate: [null, Validators.required],
          gender: [null, Validators.required],
          mobile: [null, Validators.required],
          nationality: [null, Validators.required],
          address: [],
          country: [null, Validators.required],
          city: [null, Validators.required],
          email: [null, Validators.required],
          qualifi: [null, Validators.required],
          specia: [null, Validators.required],
          eduDate: [null, Validators.required],
          eduNum: [null, [Validators.min(1)]],
          entity: [null, Validators.required],
          agency: [null, Validators.required],
          edulevel: [null, Validators.required],
          isHasQuranExp: [null, Validators.required],
          isHasTeachSunnaExp: [null, Validators.required],
          isHasInternetTeachExp: [null, Validators.required],
          isHasTeachForeignerExp: [null, Validators.required],
          isHasEjazaHafz: [null, Validators.required],
          isHasEjazaTelawa: [null, Validators.required],
          workingPlatForm: [null, Validators.required],
          hijriInterviewDay: [null, Validators.required],
          bankName: [null],
          bankNumber: [null],
          ejazaAttachments: [],
          teacherPrograms: [],
          teacherProgramDegrees: [],
          availabilityDays: [],
          interviewDay: [],
          interviewTime: [],

          fromDayTimeinterview: [],
          toDayTimeinterview: [],
          rewayats: [],
          languages: [],
        }
      )
    }
    else {
      this.profileForm = this.fb.group(
        {
          firstEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          middleEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          familyEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          hijriBirthDate: [null, Validators.required],
          gender: [null, Validators.required],
          mobile: [null, Validators.required],
          nationality: [null, Validators.required],
          address: [],
          country: [null, Validators.required],
          city: [null, Validators.required],
          email: [null, Validators.required],
          qualifi: [null, Validators.required],
          specia: [null, Validators.required],
          eduDate: [null, Validators.required],
          eduNum: [null, [Validators.min(1)]],
          entity: [null, Validators.required],
          agency: [null, Validators.required],
          edulevel: [null, Validators.required],
          isHasQuranExp: [null, Validators.required],
          isHasTeachSunnaExp: [null, Validators.required],
          isHasInternetTeachExp: [null, Validators.required],
          isHasTeachForeignerExp: [null, Validators.required],
          isHasEjazaHafz: [null, Validators.required],
          isHasEjazaTelawa: [null, Validators.required],
          workingPlatForm: [null, Validators.required],
          hijriInterviewDay: [null, Validators.required],
          bankName: [null],
          bankNumber: [null],
          ejazaAttachments: [],
          teacherPrograms: [],
          teacherProgramDegrees: [],
          availabilityDays: [],
          interviewDay: [],
          interviewTime: [],

          fromDayTimeinterview: [],
          toDayTimeinterview: [],
          rewayats: [],
          languages: [],
        }
      )
    }
  }

  getTeacherProfile(id?: string) {
    this.teacherService.viewTeacherProfileDetails(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.teacherProfileDetails = res.data as ITeacherProfile;

        console.log("teacherProfileDetails ===========>", this.teacherProfileDetails);

        if (!this.teacherProfileDetails?.proPic) {
          this.teacherProfileDetails.proPic = '../../../../../assets/images/Profile.svg';
        }

        this.PopulateForm();
        this.getCitiesLookupByCountry(this.teacherProfileDetails.country);
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

  isRtlMode() {
    return this.translate.currentLang == LanguageEnum.ar ? true : false;
  }

  PopulateForm() {
    if (this.translate.currentLang === LanguageEnum.ar) {
      this.f.firstAr.setValue(this.teacherProfileDetails?.fnameAr);
      this.f.middleAr.setValue(this.teacherProfileDetails?.mnameAr);
      this.f.familyAr.setValue(this.teacherProfileDetails?.fanameAr);

    }
    if (this.translate.currentLang === LanguageEnum.en) {
      this.f.firstEn.setValue(this.teacherProfileDetails?.fnameEn);
      this.f.middleEn.setValue(this.teacherProfileDetails?.mnameEn);
      this.f.familyEn.setValue(this.teacherProfileDetails?.faNameEn);
    }
    if(this.teacherProfileDetails.birthDispMode == 1){
      //let date = new Date(this.teacherProfileDetails?.hijriBirthDate || '');
      //this.hijriBirthDateInputParam = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDay() }
      this.updateCalenderType.selectedDateType = DateType.Hijri;
      let date = new Date(this.teacherProfileDetails?.hijriBirthDate || '');
      this.hijriBirthDateInputParam = { year: date.getFullYear(), month: date.getMonth() +1, day: date.getDate() }
      this.f.hijriBirthDate.setValue(this.teacherProfileDetails?.hijriBirthDate);

    }else {
      //this.updateCalenderType=new BaseSelectedDateModel();
      // if (this.updateCalenderType){
        // this.updateCalenderType.selectedDateValue =  this.teacherProfileDetails?.birthGregorian;
        this.updateCalenderType.selectedDateType = DateType.Gregorian;
      // }
      let date = new Date(this.teacherProfileDetails?.birthGregorian || '');
      this.hijriBirthDateInputParam = { year: date.getFullYear(), month: date.getMonth() +1, day: date.getDate() }
     // this.SendData(this.updateCalenderType)
      //this.updateCalenderType.date = this.teacherProfileDetails?.birthGregorian;
      // let date = new Date(this.teacherProfileDetails?.birthGregorian || '');
      // this.hijriBirthDateInputParam = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDay() }
      this.f.hijriBirthDate.setValue(this.teacherProfileDetails?.birthGregorian);
    }


    this.f.nationality.setValue(this.teacherProfileDetails?.nationality)
    this.f.country.setValue(this.teacherProfileDetails?.country)
    this.f.address.setValue(this.teacherProfileDetails?.address)
    this.f.city.setValue(this.teacherProfileDetails?.city)
    this.f.email.setValue(this.teacherProfileDetails?.usrEmail)

    this.f.mobile.setValue(this.teacherProfileDetails?.mobile)
    this.telInputParam.phoneNumber = this.teacherProfileDetails?.mobile;

    this.f.gender.setValue(this.teacherProfileDetails?.gender)
    this.f.qualifi.setValue(this.teacherProfileDetails?.qualifi)
    this.f.specia.setValue(this.teacherProfileDetails?.specia)
    this.f.eduDate.setValue(this.teacherProfileDetails?.eduDate)
    this.f.edulevel.setValue(this.teacherProfileDetails?.eduLevel)
    this.f.entity.setValue(this.teacherProfileDetails?.entity)
    this.f.agency.setValue(this.teacherProfileDetails?.agency)
    this.f.eduNum.setValue(this.teacherProfileDetails?.eduNum)
    this.f.isHasQuranExp.setValue(this.teacherProfileDetails.isHasQuranExp?.toString())
    this.f.isHasTeachSunnaExp.setValue(this.teacherProfileDetails.isHasTeachSunnaExp?.toString())
    this.f.isHasInternetTeachExp.setValue(this.teacherProfileDetails.isHasInternetTeachExp?.toString())
    this.f.isHasTeachForeignerExp.setValue(this.teacherProfileDetails.isHasTeachForeignerExp?.toString())
    this.f.isHasEjazaHafz.setValue(this.teacherProfileDetails.isHasEjazaHafz?.toString())
    this.f.isHasEjazaTelawa.setValue(this.teacherProfileDetails.isHasEjazaTelawa?.toString())
    this.f.workingPlatForm.setValue(this.teacherProfileDetails?.workingPlatForm)
    this.f.bankName.setValue(this.teacherProfileDetails?.bankName)
    this.f.bankNumber.setValue(this.teacherProfileDetails?.bankNumber)

    let dateInterviewDay = new Date(this.teacherProfileDetails?.interviewHijri || '');
    this.hijriInterviewDayInputParam = { year: dateInterviewDay.getFullYear(), month: dateInterviewDay.getMonth() + 1, day: dateInterviewDay.getDay() }
    this.f.hijriInterviewDay.setValue(dateInterviewDay);

    this.f.interviewTime.setValue(this.teacherProfileDetails?.interviewTime)

    this.fileList = this.teacherProfileDetails?.ejazaAttachments;
    this.teacherProfileDetails?.ejazaAttachments?.forEach(element => {
      this.ejazaAttachmentIds.push(element.id);
    });

    if (this.teacherProfileDetails?.rewayats) {
      this.selectedRewayatsList = this.teacherProfileDetails?.rewayats;
    }

    if (this.teacherProfileDetails?.teacherPrograms) {
      this.selectedTeacherProgramsList = this.teacherProfileDetails?.teacherPrograms;
    }

    if (this.teacherProfileDetails?.availabilityDays) {
      this.selectedAvailabilityDaysList = this.teacherProfileDetails?.availabilityDays;
    }

    if (this.teacherProfileDetails?.languages) {
      this.selectedLanguagesList = this.teacherProfileDetails?.languages;
    }

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
        hijriBirthDate: this.selectedDateType == 1 ? this.profileForm.value.hijriBirthDate : null,
        birthGregorian: this.selectedDateType == 2 ? this.profileForm.value.hijriBirthDate : null,
        gender: this.profileForm.value.gender,
        mobile: this.profileForm.value.mobile,
        country: this.profileForm.value.country,
        city: this.profileForm.value.city,
        edulevel: this.profileForm.value.edulevel,
        qualifi: this.profileForm.value.qualifi,
        specia: this.profileForm.value.specia,
        workingPlatForm: this.profileForm.value.workingPlatForm,
        entity: this.profileForm.value.entity,
        eduDate: this.profileForm.value.eduDate,
        eduNum: this.profileForm.value.eduNum,
        isHasQuranExp: this.profileForm.value.isHasQuranExp,
        isHasTeachSunnaExp: this.profileForm.value.isHasTeachSunnaExp,
        isHasInternetTeachExp: this.profileForm.value.isHasInternetTeachExp,
        isHasTeachForeignerExp: this.profileForm.value.isHasTeachForeignerExp,
        isHasEjazaHafz: this.profileForm.value.isHasEjazaHafz,
        isHasEjazaTelawa: this.profileForm.value.isHasEjazaTelawa,
        agency: this.profileForm.value.agency,
        bankName: this.profileForm.value.bankName,
        bankNumber: this.profileForm.value.bankNumber,

        interviewHijri: this.profileForm.value.hijriInterviewDay,
        interviewTime: this.profileForm.value.interviewTime,

        address: this.profileForm.value.address,
        ejazaAttachments: this.ejazaAttachmentIds,
        birthDispMode : this.selectedDateType
      }

      this.rewayatsMessage = {};

      this.updateTeacherModel.rewayats = [];
      if (this.selectedRewayatsList.length) {
        Array.from(this.selectedRewayatsList).forEach((elm: ITeacherProfileLookup) => {
          if (this.updateTeacherModel.rewayats) {
            this.updateTeacherModel.rewayats.push({
              rewayat: elm.id
            });
          }
        });
      }

      this.languagesMessage = {};

      this.updateTeacherModel.languages = [];
      if (this.selectedLanguagesList.length) {
        Array.from(this.selectedLanguagesList).forEach((elm: ITeacherProfileLookup) => {
          if (this.updateTeacherModel.languages) {
            this.updateTeacherModel.languages.push({
              language: elm.id
            });
          }
        });
      }

      this.availabilityDaysMessage = {};

      this.updateTeacherModel.availabilityDays = [];
      if (this.selectedAvailabilityDaysList.length) {
        Array.from(this.selectedAvailabilityDaysList).forEach((elm: ITeacherProfileAvailabilityLookup) => {
          if (this.updateTeacherModel.availabilityDays) {
            this.updateTeacherModel.availabilityDays.push({
              availableDay: elm.id,
              fromTime:elm.fromTime,
              toTime:elm.toTime
            });
          }
        });
      }

      this.teacherProgramsMessage = {};

      this.updateTeacherModel.teacherPrograms = [];
      if (this.selectedTeacherProgramsList.length) {
        Array.from(this.selectedTeacherProgramsList).forEach((elm: ITeacherProfileProgramDegreeLookup) => {
          if (this.updateTeacherModel.teacherPrograms) {
            this.updateTeacherModel.teacherPrograms.push({
              program: elm.programId,
              degree: elm.degreeId
            });
          }
        });
      }

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

  addTeacherRewayats() {
    if (!this.profileForm.value.rewayats) {
      this.rewayatsMessage = {
        message: this.translate.instant('UPDATE_TEACHER_PG.CHOOSE_TEACHER_REWAYAT'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return;
    }
    this.rewayatsMessage = {};

    const exist = this.selectedRewayatsList.some(el => el.id === this.profileForm.value.rewayats)
    if (!exist) {
      if (this.collectionOfLookup.REWAYAT) {
        this.selectedRewayatsList.push(
          this.collectionOfLookup.REWAYAT.filter(el => el.id == this.profileForm.value.rewayats)[0]);
      }
    }
  }

  removeItemFromSelectedTeacherRewayats(item: any) {
    let index = this.selectedRewayatsList.indexOf(item);
    this.selectedRewayatsList.splice(index, 1);
  }

  addTeacherLanguages() {
    if (!this.profileForm.value.languages) {
      this.languagesMessage = {
        message: this.translate.instant('UPDATE_TEACHER_PG.CHOOSE_TEACHER_LANGUAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return;
    }
    this.languagesMessage = {};

    const exist = this.selectedLanguagesList.some(el => el.id === this.profileForm.value.languages)
    if (!exist) {
      if (this.collectionOfLookup.LANG) {
        this.selectedLanguagesList.push(
          this.collectionOfLookup.LANG.filter(el => el.id == this.profileForm.value.languages)[0]);
      }
    }
  }

  removeItemFromSelectedTeacherLanguages(item: any) {
    let index = this.selectedLanguagesList.indexOf(item);
    this.selectedLanguagesList.splice(index, 1);
  }

  addAvailabilityDays() {
    if (!this.profileForm.value.availabilityDays && !this.profileForm.value.timeinterview) {
      this.availabilityDaysMessage = {
        message: this.translate.instant('UPDATE_TEACHER_PG.CHOOSE_TEACHER_AVAILABILITY'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return;
    }
    this.availabilityDaysMessage = {};

    const existAvailabilityDays = this.selectedAvailabilityDaysList.some(el => el.id === this.profileForm.value.availabilityDays)
    const existFromTime = this.profileForm.value.fromDayTimeinterview;
    const existtoTime = this.profileForm.value.toDayTimeinterview;

    if (!existAvailabilityDays && existFromTime != null && existtoTime != null && existtoTime > existFromTime) {
      if (this.collectionOfLookup.DAYS) {
        this.availabilityDaysModel = {
          id: this.collectionOfLookup.DAYS.filter(el => el.id == this.profileForm.value.availabilityDays)[0].id,

          nameAr: this.collectionOfLookup.DAYS.filter(el => el.id == this.profileForm.value.availabilityDays)[0].nameAr,
          nameEn: this.collectionOfLookup.DAYS.filter(el => el.id == this.profileForm.value.availabilityDays)[0].nameEn,

          fromTime: this.profileForm.value.fromDayTimeinterview,
          toTime: this.profileForm.value.toDayTimeinterview
        }

        this.selectedAvailabilityDaysList.push(this.availabilityDaysModel);
      }
    }
    // else{
    //   this.availabilityDaysMessage = {
    //     message: this.translate.instant('UPDATE_TEACHER_PG.TEACHER_AVAILABILITY_FROM_TIME'),
    //     type: BaseConstantModel.DANGER_TYPE
    //   }
    // }
  }

  removeItemFromSelectedAvailabilityDays(item: any) {
    let index = this.selectedAvailabilityDaysList.indexOf(item);
    this.selectedAvailabilityDaysList.splice(index, 1);
  }

  addTeacherPrograms() {
    if (!this.profileForm.value.teacherPrograms && !this.profileForm.value.teacherProgramDegrees) {
      this.teacherProgramsMessage = {
        message: this.translate.instant('UPDATE_TEACHER_PG.CHOOSE_TEACHER_PROGRAM'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return;
    }
    this.teacherProgramsMessage = {};

    const existDegree = this.selectedTeacherProgramsList.some(el => el.degreeId === this.profileForm.value.teacherProgramDegrees)
    const existProgram = this.selectedTeacherProgramsList.some(el => el.programId === this.profileForm.value.teacherPrograms)
    if (!existDegree && !existProgram) {
      if (this.collectionOfLookup.DEGREE && this.ProgramsList) {
        this.teacherProgramModel = {
          programId: this.ProgramsList.filter(el => el.id == this.profileForm.value.teacherPrograms)[0].id,
          degreeId: this.collectionOfLookup.DEGREE.filter(el => el.id == this.profileForm.value.teacherProgramDegrees)[0].id,

          progName: this.ProgramsList.filter(el => el.id == this.profileForm.value.teacherPrograms)[0].progName,

          degreeNameEn: this.collectionOfLookup.DEGREE.filter(el => el.id == this.profileForm.value.teacherProgramDegrees)[0].nameEn,
          degreeNameAr: this.collectionOfLookup.DEGREE.filter(el => el.id == this.profileForm.value.teacherProgramDegrees)[0].nameAr,
        }

        this.selectedTeacherProgramsList.push(this.teacherProgramModel);
      }
    }
  }

  removeItemFromSelectedTeacherPrograms(item: any) {
    let index = this.selectedTeacherProgramsList.indexOf(item);
    this.selectedTeacherProgramsList.splice(index, 1);
  }

  applyPhoneNumber(phoneNumber: string) {
    this.f.mobile.setValue(phoneNumber);
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

  SendData(data: any) {
     // console.log("data 777sent", data)
     data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    // console.log("Hijri date", data.date)
    this.hijriBinding = data.selectedDateValue
    this.selectedDateType = data.selectedDateType;
    // console.log("this.selectedDateType",this.selectedDateType);
    this.f.hijriBirthDate.setValue(data.selectedDateValue);

  }

  HijriInterviewDay(date: any) {
    date = date.year + '/' + date.month + '/' + date.day;
    this.hijriBinding = date

    this.f.hijriInterviewDay.setValue(date);
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

      const exist = this.selecteddrgreeList.some(el => el.id === this.profileForm.value.proficiencyDegree)
      if (!exist) {
        if (this.collectionOfLookup.DEGREE) {
          this.selecteddrgreeList.push(
            this.collectionOfLookup.DEGREE.filter(el => el.id == this.profileForm.value.proficiencyDegree)[0]);
        }
      }
    }
  }

  removeItemFromselecteddrgreeList(item: any) {
    let index = this.selecteddrgreeList.indexOf(item);
    this.selecteddrgreeList.splice(index, 1)
  }

  DeleteAttachment(index: number, id: string) {
    this.fileList?.splice(index, 1);
    this.ejazaAttachmentIds = this.ejazaAttachmentIds.filter(a => a !== id);
  }

  onEjazaFileChange(files: FileList) {
    if (files.length > 0) {
      Array.from(files).forEach(element => {
        var fileUploadObj: IFileUpload = {
          containerNameIndex: 1, // need to be changed based on file type
          file: element

        }
        this.fileUploadModel?.push(fileUploadObj)
      });
      this.UploadFiles(this.fileUploadModel);
    }

  }

  UploadFiles(files: any) {
    if (files.length === 0) {
      return;
    }
    this.attachmentService.upload(files).subscribe(
      (res: any) => {
        Array.from(res.data).forEach((elm: any) => {
          this.ejazaAttachmentIds.push(elm.id);
          this.fileList?.push(elm);

        })
        this.fileUploadModel = [];
      }, error => {
        console.log(error);
        this.fileUploadModel = [];
        this.resMessage =
        {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
  }
  onDragOver(event: any) {
    event.preventDefault();
  }

// From drag and drop
  onDropSuccess(event: any) {
    event.preventDefault();

    this.onFileChange(event.dataTransfer.files);
  }

// From attachment link
  onChange(event: any) {
    this.onFileChange(event.target.files);
  }


}
