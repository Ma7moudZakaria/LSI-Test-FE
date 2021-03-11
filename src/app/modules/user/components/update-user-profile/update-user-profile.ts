import { LIVE_ANNOUNCER_DEFAULT_OPTIONS } from '@angular/cdk/a11y';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IUpdateUserProfile } from 'src/app/core/interfaces/user-interfaces/iupdateuserprofile';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
import { IUserProfilePicture } from 'src/app/core/interfaces/user-interfaces/iuser-profile-picture';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
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
  listOfLookupProfile: string[] = ['GENDER', 'EDU_LEVEL', 'NATIONALITY', 'COUNTRY'
  ,'SCIENTIFIC_ARCHIVES','TRAINING_COURSES', 'SYSTEM_SHEIKHS'];
  userProfileDetails = {} as IUserProfile;
  updateUserModel : IUpdateUserProfile = {};
  collectionOfLookup = {} as ILookupCollection;
  currentLang: LanguageEnum | undefined;
  fileUploadModel: IFileUpload[] = [];
  fileList: IAttachment[] = [];
  ejazaAttachmentIds: string[] = [];
  quraanParts = new Array(30);
  selectedShiekhsList = Array<BaseLookupModel>();
  shiekhsMessage:any;
  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private userService: UserService,
    private attachmentService: AttachmentsService,
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
      this.updateUserModel.sheikhs = [];
      if (this.selectedShiekhsList.length) {
        Array.from(this.selectedShiekhsList).forEach((elm: BaseLookupModel) => {
          if (this.updateUserModel.sheikhs) {
            this.updateUserModel.sheikhs.push({
              sheikhsIds:elm.id
            }); 
          }
    
        });
      }
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
        address: this.profileForm.value.address,
        quraanMemorizeAmount : this.profileForm.value.quraanMemorization,
        ejazaIds : this.ejazaAttachmentIds,
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
          countryCode: [null, Validators.required],
          quraanMemorization: ['', Validators.required],
          userSheikhs: []
          
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
    this.f.quraanMemorization.setValue(this.userProfileDetails?.quraanMemorizeAmount);
    this.fileList   = this.userProfileDetails?.ejazaAttachments;
    this.userProfileDetails?.ejazaAttachments.forEach(element => {
      this.ejazaAttachmentIds.push(element.id);
    });
    if (this.userProfileDetails?.sheikhs) {      
      this.selectedShiekhsList =  this.userProfileDetails?.sheikhs;
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
          message: error.message,
          type: BaseConstantModel.DANGER_TYPE
        } 
      }
    )
  }
  addUserShiekhs(){
    if (!this.profileForm.value.userSheikhs) {
      if (this.translate.currentLang == 'ar') {
        this.shiekhsMessage = {
          message: "برجاء اختيار  شيخ ",
          type: 'danger'
        }
      } else {
        this.shiekhsMessage = {
          message: "Please select shiekh",
          type: 'danger'
        }
      }
      return;
    }
    this.shiekhsMessage = "";

    const exist = this.selectedShiekhsList.some(el => el.id === this.profileForm.value.userSheikhs)
    if (!exist) {
      if (this.collectionOfLookup.SYSTEM_SHEIKHS) {
        this.selectedShiekhsList.push(
          this.collectionOfLookup.SYSTEM_SHEIKHS.filter(el => el.id == this.profileForm.value.userSheikhs)[0]);  
      }
    }      
  }
  removeItemFromSelectedShiekhs(item:any) {
    let index = this.selectedShiekhsList.indexOf(item);
    this.selectedShiekhsList.splice(index, 1);
  }
}