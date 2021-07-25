import { LIVE_ANNOUNCER_DEFAULT_OPTIONS } from '@angular/cdk/a11y';
import { formatDate } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'selenium-webdriver';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { ITelInputParams } from 'src/app/core/interfaces/shared-interfaces/tel-input-interfaces/itel-input-params';
import { IUpdateUserProfile } from 'src/app/core/interfaces/user-interfaces/iupdateuserprofile';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
import { IUserProfilePicture } from 'src/app/core/interfaces/user-interfaces/iuser-profile-picture';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { UserService } from 'src/app/core/services/user-services/user.service';
import {BaseSelectedDateModel} from '../../../../core/ng-model/base-selected-date-model';
import {DateType} from 'ngx-hijri-gregorian-datepicker';

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
  listOfLookupProfile: string[] = ['GENDER', 'EDU_LEVEL', 'NATIONALITY', 'COUNTRY'
    , 'SCIENTIFIC_ARCHIVES', 'TRAINING_COURSES', 'SYSTEM_SHEIKHS'];
  userProfileDetails = {} as IUserProfile;
  updateUserModel: IUpdateUserProfile = {};
  collectionOfLookup = {} as ILookupCollection;
  fileUploadModel: IFileUpload[] = [];
  fileList: IAttachment[] = [];
  ejazaAttachmentIds: string[] = [];
  quraanParts = new Array(30);
  selectedShiekhsList = Array<BaseLookupModel>();
  selectedArchivesList = Array<BaseLookupModel>();
  archiveMessage: BaseMessageModel = {};
  shiekhsMessage: BaseMessageModel = {};
  selectedTrainingCourseList = Array<BaseLookupModel>();
  coursesMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;
  telInputParam: ITelInputParams = {}
  hijriBinding: any;
  hijri: boolean = false;
  milady: boolean = false;

  hijriBirthDateInputParam:NgbDateStruct= {year:0,day:0,month:0};
  // = {
  //   // phoneNumber:'+201062100486',
  //   isRequired : true,
  //   // countryIsoCode: '{"initialCountry": "eg"}'
  // }
  private selectedDateType: any;
  updateCalenderType: BaseSelectedDateModel= new BaseSelectedDateModel();

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    public userService: UserService,
    private attachmentService: AttachmentsService,
    private userProfileService: UserService,
    public translate: TranslateService,
    public languageService: LanguageService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.getCountryIsoCode();
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

  // @HostListener('window:beforeunload', ['$event'])
  // public onPageUnload($event: BeforeUnloadEvent) {
  //   if (this.unsavedDataCheck()) {
  //     $event.returnValue = true;
  //     // return "message";
  //   }
  //   else{
  //     $event.returnValue = false;
  //     // return '';
  //   }
  // }

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event:any) {
  //   this.userService.setCanDeActivate(this.unsavedDataCheck());
  // }

  unsavedDataCheck() : boolean{
    let  birthDateFromDetails=new Date(this.userProfileDetails?.hijriBirthDate||"");
    return this.profileForm.value.firstNameAr != this.userProfileDetails?.fnameAr
    || this.profileForm.value.firstNameEn != this.userProfileDetails?.faNameEn
    || this.profileForm.value.middleNameAr != this.userProfileDetails?.mnameAr
    || this.profileForm.value.middleNameEn != this.userProfileDetails?.mnameEn
    || this.profileForm.value. familyNameAr!= this.userProfileDetails?.fanameAr
    || this.profileForm.value. familyNameEn!= this.userProfileDetails?.faNameEn
    // || this.profileForm.value.birthdate.getTime() != birthDateFromDetails.getTime()
    // || this.profileForm.value.birthdate != this.userProfileDetails?.birthdate
    || this.profileForm.value.gender != this.userProfileDetails?.gender
    || this.profileForm.value.phoneNumber!= this.userProfileDetails?.mobile
    || this.profileForm.value.countryCode!= this.userProfileDetails?.countryCode
    || this.profileForm.value.city!= this.userProfileDetails?.city
    || this.profileForm.value.nationality!= this.userProfileDetails?.nationality
    || this.profileForm.value.educationallevel!= this.userProfileDetails?.eduLevel
    || this.profileForm.value.occupation!= this.userProfileDetails?.occupation
    || this.profileForm.value.address!= this.userProfileDetails?.address
    || this.profileForm.value.quraanMemorization!= this.userProfileDetails?.quraanMemorizeAmount
   // || this.profileForm.value.ejazaAttachments!= this.userProfileDetails?.ejazaAttachments
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

  getCitiesLookupByCountry(id?:string){
     let countryId = this.f['countryCode'].value;

    //let countryId = this.profileForm.value.countryCode;

    this.lookupService.getCitiesByCountryId(countryId || '').subscribe(res => {
      // this.collectionOfLookup.CITY = res.data;
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

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
      this.buildForm();
      this.PopulateForm();
    });
  }

  emitHeaderTitle() {
    this.languageService.headerPageNameEvent.emit(this.translate.instant('UPDATE_USER_PG.TITLE'));
  }

  isRtlMode() {
    return this.translate.currentLang == LanguageEnum.ar ? true : false;
  }

  getUserProfile(id?: string) {
    this.userService.viewUserProfileDetails(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.userProfileDetails = res.data as IUserProfile;

        if (!this.userProfileDetails?.proPic) {
          this.userProfileDetails.proPic = '../../../../../assets/images/Profile.svg';
        }

        this.PopulateForm();
        this.getCitiesLookupByCountry(this.userProfileDetails.countryCode);
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

  onSubmit(value: string) {
    this.isSubmit = true;
    this.resMessage = {}
    if (this.profileForm.valid) {
      this.updateUserModel = {
        usrId: this.currentUser?.id,
        firstAr: this.profileForm.value.firstNameAr != null ? this.profileForm.value.firstNameAr : this.userProfileDetails.fnameAr,
        firstEn: this.profileForm.value.firstNameEn != null ? this.profileForm.value.firstNameEn : this.userProfileDetails.fnameEn,
        middleAr: this.profileForm.value.middleNameAr != null ? this.profileForm.value.middleNameAr : this.userProfileDetails.mnameAr,
        middleEn: this.profileForm.value.middleNameEn != null ? this.profileForm.value.middleNameEn : this.userProfileDetails.mnameEn,
        familyAr: this.profileForm.value.familyNameAr != null ? this.profileForm.value.familyNameAr : this.userProfileDetails.fanameAr,
        familyEn: this.profileForm.value.familyNameEn != null ? this.profileForm.value.familyNameEn : this.userProfileDetails.faNameEn,
        // birthdate: this.profileForm.value.birthdate,
        birthdate: this.selectedDateType == 1 ? this.profileForm.value.birthdate : null,
        birthGregorian: this.selectedDateType == 2 ? this.profileForm.value.birthdate : null,
        gender: this.profileForm.value.gender,
        mobile: this.profileForm.value.phoneNumber,
        countryCode: this.profileForm.value.countryCode,
        city:this.profileForm.value.city,
        nationality: this.profileForm.value.nationality,
        eduLevel: this.profileForm.value.educationallevel,
        occupation: this.profileForm.value.occupation,
        address: this.profileForm.value.address,
        quraanMemorizeAmount: this.profileForm.value.quraanMemorization,
        ejazaIds: this.ejazaAttachmentIds,
        birthDispMode : this.selectedDateType
      }

      this.coursesMessage = {};
      this.archiveMessage = {};
      this.shiekhsMessage = {};

      this.updateUserModel.sheikhs = [];
      if (this.selectedShiekhsList.length) {
        Array.from(this.selectedShiekhsList).forEach((elm: BaseLookupModel) => {
          if (this.updateUserModel.sheikhs) {
            this.updateUserModel.sheikhs.push({
              sheikhsIds: elm.id
            });
          }

        });
      }
      this.updateUserModel.scientificArchives = [];
      if (this.selectedArchivesList.length) {
        Array.from(this.selectedArchivesList).forEach((elm: BaseLookupModel) => {
          if (this.updateUserModel.scientificArchives) {
            this.updateUserModel.scientificArchives.push({
              archiveId: elm.id
            });
          }

        });
      }
      this.updateUserModel.courses = [];
      if (this.selectedTrainingCourseList.length) {
        Array.from(this.selectedTrainingCourseList).forEach((elm: BaseLookupModel) => {
          if (this.updateUserModel.courses) {
            this.updateUserModel.courses.push({
              coursesIds: elm.id
            });
          }

        });
      }
      this.userProfileService.updateUser(this.updateUserModel).subscribe(
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
          birthdate: ['', [Validators.required]],
          email: [''],
          nationality: [null, Validators.required],
          educationallevel: [null, Validators.required],
          gender: [null, Validators.required],
          address: [''],// address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          phoneNumber: ['', [Validators.required/*,Validators.pattern(BaseConstantModel.mobilePattern), Validators.minLength(6), Validators.maxLength(16)*/]],
          occupation: [null, Validators.required],
          countryCode: [null, Validators.required],
          city: [null, Validators.required],
          quraanMemorization:['', [Validators.pattern(BaseConstantModel.numberBiggerThanZero)]],
          userSheikhs: [],
          userArchives: [],
          userCourses: []

        }
      )
    }
    else {
      this.profileForm = this.fb.group(
        {
          firstNameEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          middleNameEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          familyNameEn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          birthdate: ['', [Validators.required]],
          email: [''],
          nationality: [null, Validators.required],
          educationallevel: [null, Validators.required],
          gender: [null, Validators.required],
          address: [''],
          phoneNumber: ['', [Validators.required, Validators.pattern(BaseConstantModel.mobilePattern)]],
          occupation: [null, Validators.required],
          countryCode: [null, Validators.required],
          city: [null, Validators.required],
          quraanMemorization:['', [Validators.pattern(BaseConstantModel.numberBiggerThanZero)]],
          userSheikhs: [],
          userArchives: [],
          userCourses: []

        }
      )
    }
  }

  PopulateForm() {
    if (this.translate.currentLang === LanguageEnum.ar) {
      this.f.firstNameAr.setValue(this.userProfileDetails?.fnameAr ? this.userProfileDetails?.fnameAr : this.userProfileDetails?.fnameEn);
      this.f.middleNameAr.setValue(this.userProfileDetails?.mnameAr ? this.userProfileDetails?.mnameAr : this.userProfileDetails?.mnameEn );
      this.f.familyNameAr.setValue(this.userProfileDetails?.fanameAr ? this.userProfileDetails?.fanameAr : this.userProfileDetails?.faNameEn);
    }
    if (this.translate.currentLang === LanguageEnum.en) {
      this.f.firstNameEn.setValue(this.userProfileDetails?.fnameEn ? this.userProfileDetails?.fnameEn : this.userProfileDetails?.fnameAr);
      this.f.middleNameEn.setValue(this.userProfileDetails?.mnameEn ? this.userProfileDetails?.mnameEn : this.userProfileDetails?.mnameAr);
      this.f.familyNameEn.setValue(this.userProfileDetails?.faNameEn ? this.userProfileDetails?.faNameEn : this.userProfileDetails?.fanameAr);
    }
    this.f.address.setValue(this.userProfileDetails?.address);
    this.f.gender.setValue(this.userProfileDetails?.gender);
    this.f.email.setValue(this.userProfileDetails?.usrEmail);
    // let birthdate = new Date(this.userProfileDetails?.birthdate || '');
    // if (!isNaN(birthdate.getTime())) {
    //   this.f.birthdate.setValue(
    //     new Date(birthdate.setDate(birthdate.getDate() + 1))
    //       .toISOString()
    //       .slice(0, 10)
    //   );
    // }
    // let date = new Date(this.userProfileDetails?.birthdate || '');
    //
    // this.hijriBirthDateInputParam = {year : date.getFullYear(), month : date.getMonth() + 1, day:date.getDay()}
    // this.f.birthdate.setValue(date);
    if(this.userProfileDetails.birthDispMode == 1){
      this.updateCalenderType.selectedDateType = DateType.Hijri;
      let date = new Date(this.userProfileDetails?.hijriBirthDate || '');
      this.hijriBirthDateInputParam = { year: date.getFullYear(), month: date.getMonth() +1, day: date.getDate() }
      this.f.hijriBirthDate.setValue(this.userProfileDetails?.hijriBirthDate);

    }else {
      this.updateCalenderType.selectedDateType = DateType.Gregorian;
      let date = new Date(this.userProfileDetails?.birthGregorian || '');
      this.hijriBirthDateInputParam = { year: date.getFullYear(), month: date.getMonth() +1, day: date.getDate() }
      this.f.hijriBirthDate.setValue(this.userProfileDetails?.birthGregorian);
    }
    this.f.nationality.setValue(this.userProfileDetails?.nationality);
    this.f.occupation.setValue(this.userProfileDetails?.occupation);
    this.f.educationallevel.setValue(this.userProfileDetails?.eduLevel);
    this.f.phoneNumber.setValue(this.userProfileDetails?.mobile);
    this.telInputParam.phoneNumber = this.userProfileDetails?.mobile;
    this.f.countryCode.setValue(this.userProfileDetails?.countryCode);
    this.f.city.setValue(this.userProfileDetails?.city);
    this.f.quraanMemorization.setValue(this.userProfileDetails?.quraanMemorizeAmount);
    this.fileList = this.userProfileDetails?.ejazaAttachments;
    this.userProfileDetails?.ejazaAttachments.forEach(element => {
      this.ejazaAttachmentIds.push(element.id);
    });
    if (this.userProfileDetails?.usrSheikhs) {
      this.selectedShiekhsList = this.userProfileDetails?.usrSheikhs;
    }
    if (this.userProfileDetails?.usrScientificArchives) {
      this.selectedArchivesList = this.userProfileDetails?.usrScientificArchives;
    }
    if (this.userProfileDetails?.usrCourses) {
      this.selectedTrainingCourseList = this.userProfileDetails?.usrCourses;
    }
  }

  // fillUserShiekhsList(list) {
  //     let look = this.jobSectorsLookup;
  //     return list.map(function mapping(item) {
  //       let obj: BaseLookupModel;
  //       let fil = look.filter(i => i.id === item.jobSectorId)[0]
  //       obj = {
  //         id: fil.id,
  //         code: fil.code,
  //         nameAr: fil.nameAr,
  //         nameEn: fil.nameEn
  //       }
  //       return obj;
  //     });
  // }

  onFileChange(files: any) {
    let profImagModel: IUserProfilePicture = {
      usrId: this.currentUser?.id,
      image: files[0]
    }
    this.updateProfilePic(profImagModel);
  }

  updateProfilePic(profImagModel: IUserProfilePicture) {
    const formData = new FormData();
    // formData.append('image', profImagModel.image);

    // profImagModel.image = formData;
    formData.append('UserProfilePictureModel.UserId', profImagModel.usrId || '');
    formData.append('UserProfilePictureModel.ProfileImage', profImagModel.image);

    this.userService.updateUserProfilePic(formData).subscribe(res => {
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

  DeleteAttachment(index: number, id: string) {
    this.fileList.splice(index, 1);
    this.ejazaAttachmentIds = this.ejazaAttachmentIds.filter(a => a !== id);
  }

  onEjazaFileChange(files: FileList) {
    if (files.length > 0) {
      Array.from(files).forEach(element => {
        var fileUploadObj: IFileUpload = {
          containerNameIndex: 1, // need to be changed based on file type
          file: element

        }
        this.fileUploadModel.push(fileUploadObj)
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
          this.fileList.push(elm);

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

  addUserShiekhs() {
    if (!this.profileForm.value.userSheikhs) {
      this.shiekhsMessage = {
        message: this.translate.instant('UPDATE_USER_PG.CHOOSE_SHEIKHS'),
        type: BaseConstantModel.DANGER_TYPE
      }
      // if (this.translate.currentLang == 'ar') {
      //   this.shiekhsMessage = {
      //     message: this.translate.instant('UPDATE_USER_PG.CHOOSE_SHEIKHS'),
      //     type: BaseConstantModel.DANGER_TYPE
      //   }
      // } else {
      //   this.shiekhsMessage = {
      //     message: this.translate.instant('UPDATE_USER_PG.CHOOSE_SHEIKHS'),
      //     type: BaseConstantModel.DANGER_TYPE
      //   }
      // }
      return;
    }
    this.shiekhsMessage = {};

    const exist = this.selectedShiekhsList.some(el => el.id === this.profileForm.value.userSheikhs)
    if (!exist) {
      if (this.collectionOfLookup.SYSTEM_SHEIKHS) {
        this.selectedShiekhsList.push(
          this.collectionOfLookup.SYSTEM_SHEIKHS.filter(el => el.id == this.profileForm.value.userSheikhs)[0]);
      }
    }
  }

  removeItemFromSelectedShiekhs(item: any) {
    let index = this.selectedShiekhsList.indexOf(item);
    this.selectedShiekhsList.splice(index, 1);
  }

  addUserArchives() {
    if (!this.profileForm.value.userArchives) {
      // if (this.translate.currentLang == 'ar') {
      //   this.archiveMessage = {
      //     message: this.translate.instant('UPDATE_USER_PG.ASRCHIVE'),
      //     type: BaseConstantModel.DANGER_TYPE
      //   }
      // } else {
      //   this.archiveMessage = {
      //     message: this.translate.instant('UPDATE_USER_PG.ASRCHIVE'),
      //     type: BaseConstantModel.DANGER_TYPE
      //   }
      // }
      this.archiveMessage = {
        message: this.translate.instant('UPDATE_USER_PG.ASRCHIVE'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return;
    }
    this.archiveMessage = {};

    const exist = this.selectedArchivesList.some(el => el.id === this.profileForm.value.userArchives)
    if (!exist) {
      if (this.collectionOfLookup.SCIENTIFIC_ARCHIVES) {
        this.selectedArchivesList.push(
          this.collectionOfLookup.SCIENTIFIC_ARCHIVES.filter(el => el.id == this.profileForm.value.userArchives)[0]);
      }
    }
  }

  removeItemFromSelectedArchives(item: any) {
    let index = this.selectedArchivesList.indexOf(item);
    this.selectedArchivesList.splice(index, 1);
  }

  addUserCourses() {
    if (!this.profileForm.value.userCourses) {
      // if (this.translate.currentLang == 'ar') {
      //   this.coursesMessage = {
      //     message: this.translate.instant('UPDATE_USER_PG.COURSE'),
      //     type: BaseConstantModel.DANGER_TYPE
      //   }
      // } else {
      //   this.coursesMessage = {
      //     message: this.translate.instant('UPDATE_USER_PG.COURSE'),
      //     type: BaseConstantModel.DANGER_TYPE
      //   }
      // }
      this.coursesMessage = {
        message: this.translate.instant('UPDATE_USER_PG.COURSE'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return;
    }
    this.coursesMessage = {};

    const exist = this.selectedTrainingCourseList.some(el => el.id === this.profileForm.value.userCourses)
    if (!exist) {
      if (this.collectionOfLookup.TRAINING_COURSES) {
        this.selectedTrainingCourseList.push(
          this.collectionOfLookup.TRAINING_COURSES.filter(el => el.id == this.profileForm.value.userCourses)[0]);
      }
    }
  }

  removeItemFromSelectedCourses(item: any) {
    let index = this.selectedTrainingCourseList.indexOf(item);
    this.selectedTrainingCourseList.splice(index, 1);
  }

  applyPhoneNumber(phoneNumber: string) {
    this.f.phoneNumber.setValue(phoneNumber);
  }

  Hijri(data: any) {
    // date = date.year + '/' + date.month + '/' + date.day;
    // console.log("Hijri date", date)
    // this.hijriBinding = date
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    // console.log("Hijri date", data.date)
    this.hijriBinding = data.selectedDateValue
    this.selectedDateType = data.selectedDateType;
    this.f.birthdate.setValue(data.selectedDateValue);
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
