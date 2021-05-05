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
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { ITeacherProfileLookup } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile-lookup';
import { ITeacherProfileInterviewDay } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile-interview-day';
import { ITeacherProfileProgram } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile-program';
import { ITeacherProfileProgramDegreeLookup } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile-program-lookup';
import { IprogramFilterRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-request';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { ITeacherProfileInterviewDayLookup } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile-interview-day-lookup';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  interviewDaysModel: ITeacherProfileInterviewDayLookup = {};
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['GENDER', 'EDU_LEVEL', 'NATIONALITY', 'COUNTRY'
    , 'DEGREE', 'EDU_YEAR', 'INTERVIEW_DAY', 'LANG', 'QUALIFI', 'SPECIAL', 'REWAYAT' , 'AGENCY', 'WORKING_PLATFORM'];

  resMessage: BaseMessageModel = {};
  selecteddrgreeList = Array<BaseLookupModel>();
  drgreeList__addition = Array<BaseLookupModel>();
  degreeMessage: BaseMessageModel = {};
  isSubmit = false;
  hijri: boolean = false;
  milady: boolean = false;
  higriPinding: any;
  hijriBirthDateInputParam:NgbDateStruct= {year:0,day:0,month:0};

  ProgramsList: IprogramsModel[] = []; ;
  ProgramFilter: IprogramFilterRequest = {};

  rewayatsMessage: BaseMessageModel = {};
  selectedRewayatsList = Array<ITeacherProfileLookup>();

  languagesMessage: BaseMessageModel = {};
  selectedLanguagesList = Array<ITeacherProfileLookup>();

  interviewDaysMessage: BaseMessageModel = {};
  selectedInterviewDaysList = Array<ITeacherProfileInterviewDayLookup>();

  teacherProgramsMessage: BaseMessageModel = {};
  selectedTeacherProgramsList = Array<ITeacherProfileProgramDegreeLookup>();

  event = {
    eampm: "AM"
  }

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private teacherService: TeacherProfileService,
    private userProfilePicService: UserService,
    private userService: UserService,
    private attachmentService: AttachmentsService,
    public translate: TranslateService, 
    private ProgramService: ProgramService,
    public languageService: LanguageService) {
  }


  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.buildForm();
    this.getPrograms();
    this.getLookupByKey();
  }

  getPrograms() {
    this.ProgramService.getAllPrograms().subscribe(res => {
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

  getCitiesLookupByCountry(id?:string){
    let countryId = this.f['country'].value;
    this.lookupService.getCitiesByCountryId(countryId || '').subscribe(res => {
      if (res.isSuccess) {
        this.collectionOfLookup.CITY = res.data;
        this.collectionOfLookup && this.collectionOfLookup.CITY ? this.f.city.setValue(this.collectionOfLookup.CITY[0].id):'';
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
          firstAr:['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          middleAr:['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          familyAr:['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          hijriBirthDate: [],
          gender: [null, Validators.required],
          mobile: [null, Validators.required],
          nationality: [null, Validators.required],
          address: [null, Validators.required],
          country: [null, Validators.required],
          city: [null, Validators.required],
          email: [null, Validators.required],
          qualifi: [null, Validators.required],
          specia: [null, Validators.required],
          eduYear: [null, Validators.required],
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
          bankName: [null, Validators.required],
          bankNumber: [null, Validators.required],
          ejazaAttachments: [],
          teacherPrograms: [],
          teacherProgramDegrees: [],
          interviewDays: [],
          fromTimeinterview: [],
          toTimeinterview: [],
          rewayats: [],
          languages: [],
        }
      )
    }
    else {
      this.profileForm = this.fb.group(
        {
          firstEn:['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          middleEn:['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          familyEn:['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          hijriBirthDate: [],
          gender: [null, Validators.required],
          mobile: [null, Validators.required],
          nationality: [null, Validators.required],
          address: [null, Validators.required],
          country: [null, Validators.required],
          city: [null, Validators.required],
          email: [null, Validators.required],
          qualifi: [null, Validators.required],
          specia: [null, Validators.required],
          eduYear: [null, Validators.required],
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
          bankName: [null, Validators.required],
          bankNumber: [null, Validators.required],
          ejazaAttachments: [],
          teacherPrograms: [],
          teacherProgramDegrees: [],
          interviewDays: [],
          fromTimeinterview: [],
          toTimeinterview: [],
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
    // this.f.hijriBirthDate.setValue(this.teacherProfileDetails?.hijriBirthDate)
    // let birthdate = new Date(this.teacherProfileDetails?.hijriBirthDate || '');
    // if (!isNaN(birthdate.getTime())) {
    //   this.f.hijriBirthDate.setValue(
    //     new Date(birthdate.setDate(birthdate.getDate() + 1))
    //       .toISOString()
    //       .slice(0, 10)
    //   );
    // }


    let date = new Date(this.teacherProfileDetails?.hijriBirthDate || '');
    // date = date.year + '/' + date.month + '/' + date.day;

    this.hijriBirthDateInputParam = {year : date.getFullYear(), month : date.getMonth() + 1, day:date.getDay()}

    this.f.email.setValue(this.teacherProfileDetails?.usrEmail)
    this.f.nationality.setValue(this.teacherProfileDetails?.nationality)
    this.f.country.setValue(this.teacherProfileDetails?.country)
    this.f.address.setValue(this.teacherProfileDetails?.address)
    this.f.city.setValue(this.teacherProfileDetails?.city)
    this.f.email.setValue(this.teacherProfileDetails?.usrEmail)
    this.telInputParam.phoneNumber = this.teacherProfileDetails?.mobile;
    this.f.gender.setValue(this.teacherProfileDetails?.gender)
    this.f.qualifi.setValue(this.teacherProfileDetails?.qualifi)
    this.f.specia.setValue(this.teacherProfileDetails?.specia)
    this.f.eduYear.setValue(this.teacherProfileDetails?.eduYear)
    this.f.edulevel.setValue(this.teacherProfileDetails?.eduLevel)
    this.f.entity.setValue(this.teacherProfileDetails?.entity)
    this.f.agency.setValue(this.teacherProfileDetails?.agency)
    this.f.isHasQuranExp.setValue(this.teacherProfileDetails.isHasQuranExp?.toString())
    this.f.isHasTeachSunnaExp.setValue(this.teacherProfileDetails.isHasTeachSunnaExp?.toString())
    this.f.isHasInternetTeachExp.setValue(this.teacherProfileDetails.isHasInternetTeachExp?.toString())
    this.f.isHasTeachForeignerExp.setValue(this.teacherProfileDetails.isHasTeachForeignerExp?.toString())
    this.f.isHasEjazaHafz.setValue(this.teacherProfileDetails.isHasEjazaHafz?.toString())
    this.f.isHasEjazaTelawa.setValue(this.teacherProfileDetails.isHasEjazaTelawa?.toString())
    this.f.workingPlatForm.setValue(this.teacherProfileDetails?.workingPlatForm)
    this.f.bankName.setValue(this.teacherProfileDetails?.bankName)
    this.f.bankNumber.setValue(this.teacherProfileDetails?.bankNumber)

    if (this.teacherProfileDetails?.rewayats) {
      this.selectedRewayatsList = this.teacherProfileDetails?.rewayats;
    }

    if (this.teacherProfileDetails?.teacherPrograms) {
      this.selectedTeacherProgramsList = this.teacherProfileDetails?.teacherPrograms;
    }

    if (this.teacherProfileDetails?.interviewDays) {
      this.selectedInterviewDaysList = this.teacherProfileDetails?.interviewDays;
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
        hijriBirthDate: this.profileForm.value.hijriBirthDate,
        gender: this.profileForm.value.gender,
        mobile: this.profileForm.value.mobile,
        country: this.profileForm.value.country,
        city: this.profileForm.value.city,
        edulevel: this.profileForm.value.edulevel,
        qualifi: this.profileForm.value.qualifi,
        specia: this.profileForm.value.specia,
        workingPlatForm: this.profileForm.value.workingPlatForm,
        entity: this.profileForm.value.entity,
        eduYear: this.profileForm.value.eduYear,
        isHasQuranExp: this.profileForm.value.isHasQuranExp,
        isHasTeachSunnaExp: this.profileForm.value.isHasTeachSunnaExp,
        isHasInternetTeachExp: this.profileForm.value.isHasInternetTeachExp,
        isHasTeachForeignerExp: this.profileForm.value.isHasTeachForeignerExp,
        isHasEjazaHafz: this.profileForm.value.isHasEjazaHafz,
        isHasEjazaTelawa: this.profileForm.value.isHasEjazaTelawa,
        agency: this.profileForm.value.agency,
        bankName: this.profileForm.value.bankName,
        bankNumber: this.profileForm.value.bankNumber,
        address:this.profileForm.value.address,
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

      this.interviewDaysMessage = {};

      this.updateTeacherModel.interviewDays = [];
      if (this.selectedInterviewDaysList.length) {
        Array.from(this.selectedInterviewDaysList).forEach((elm: ITeacherProfileInterviewDayLookup) => {
          if (this.updateTeacherModel.interviewDays) {
            this.updateTeacherModel.interviewDays.push({
              interviewDay: elm.id,
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
              degree:elm.degreeId
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
        message: this.translate.instant('UPDATE_USER_PG.CHOOSE_SHEIKHS'),
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
        message: this.translate.instant('UPDATE_USER_PG.CHOOSE_SHEIKHS'),
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

  addInterviewDays() {
    if (!this.profileForm.value.interviewDays && !this.profileForm.value.timeinterview) {
      this.interviewDaysMessage = {
        message: this.translate.instant('UPDATE_USER_PG.CHOOSE_SHEIKHS'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return;
    }
    this.interviewDaysMessage = {};

    const existInterviewDays = this.selectedInterviewDaysList.some(el => el.id === this.profileForm.value.interviewDays)
    const existFromTime = this.profileForm.value.fromTimeinterview;
    const existtoTime = this.profileForm.value.toTimeinterview;
    if (!existInterviewDays && existFromTime != null && existtoTime != null ) {
      if (this.collectionOfLookup.INTERVIEW_DAY ) {
        this.interviewDaysModel = {
          id:this.collectionOfLookup.INTERVIEW_DAY.filter(el => el.id == this.profileForm.value.interviewDays)[0].id,
          
          nameAr:this.collectionOfLookup.INTERVIEW_DAY.filter(el => el.id == this.profileForm.value.interviewDays)[0].nameAr,
          nameEn:this.collectionOfLookup.INTERVIEW_DAY.filter(el => el.id == this.profileForm.value.interviewDays)[0].nameEn,
          
          fromTime:this.profileForm.value.fromTimeinterview,
          toTime:this.profileForm.value.toTimeinterview
        }

        this.selectedInterviewDaysList.push(this.interviewDaysModel);
      }
    }
  }

  removeItemFromSelectedInterviewDays(item: any) {
    let index = this.selectedInterviewDaysList.indexOf(item);
    this.selectedInterviewDaysList.splice(index, 1);
  }

  addTeacherPrograms() {
    if (!this.profileForm.value.teacherPrograms && !this.profileForm.value.teacherProgramDegrees) {
      this.teacherProgramsMessage = {
        message: this.translate.instant('UPDATE_USER_PG.CHOOSE_SHEIKHS'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return;
    }
    this.teacherProgramsMessage = {};

    const existDegree = this.selectedTeacherProgramsList.some(el => el.id === this.profileForm.value.teacherProgramDegrees)
    const existProgram = this.selectedTeacherProgramsList.some(el => el.id === this.profileForm.value.teacherPrograms)
    if (!existDegree && !existProgram) {
      if (this.collectionOfLookup.DEGREE && this.ProgramsList) {
        this.teacherProgramModel = {
          programId:this.ProgramsList.filter(el => el.id == this.profileForm.value.teacherPrograms)[0].id,
          degreeId:this.collectionOfLookup.DEGREE.filter(el => el.id == this.profileForm.value.teacherProgramDegrees)[0].id,
        
          programNameEn:this.ProgramsList.filter(el => el.id == this.profileForm.value.teacherPrograms)[0].engName,
          programNameAr:this.ProgramsList.filter(el => el.id == this.profileForm.value.teacherPrograms)[0].arabName,

          degreeNameEn:this.collectionOfLookup.DEGREE.filter(el => el.id == this.profileForm.value.teacherProgramDegrees)[0].nameEn,
          degreeNameAr:this.collectionOfLookup.DEGREE.filter(el => el.id == this.profileForm.value.teacherProgramDegrees)[0].nameAr,
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

  Hijri(date: any) {
    date = date.year + '/' + date.month + '/' + date.day;
    console.log("Hijri date", date)
    this.higriPinding = date

    this.f.hijriBirthDate.setValue(date);
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
}
