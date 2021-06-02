import { AlertifyService } from './../../../../../../core/services/alertify-services/alertify.service';
import { UpdateTeacherProfileComponent } from './../../../../../teacher/components/update-teacher-profile/update-teacher-profile.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { TranslateService } from '@ngx-translate/core';
import { IProgramNotificationDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-details';
import { IProgramUpdateNotifacationModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-update-notification-model';
import { IProgramNotificationModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-model';
import { ProgramNotificationService } from 'src/app/core/services/program-services/program-notification.service';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-add-edit-notification',
  templateUrl: './add-edit-notification.component.html',
  styleUrls: ['./add-edit-notification.component.scss']
})
export class AddEditNotificationComponent implements OnInit {
  @Output() closeNotifyForm = new EventEmitter<boolean>();
  //@Input() IProgramNotificationDetails: IProgramNotificationDetails = {};
  notifyForm: FormGroup = new FormGroup({});
  isSubmit = false;
  langEnum = LanguageEnum;
  resultMessage: BaseMessageModel = {};
  @Input() notificationDetails = {} as IProgramNotificationDetails;
  @Input() notificationInputs = {} as IProgramNotificationModel;

  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['PROG_NOTIF_TYPES'];

  notificationAddModel: IProgramNotificationModel | undefined;
  notificationEditModel: IProgramUpdateNotifacationModel | undefined;

  constructor(
    private fb: FormBuilder, private alert: AlertifyService,
    public translate: TranslateService,
    private notificationService: ProgramNotificationService,
    private lookupService: LookupService,

  ) { }

  ngOnInit(): void {
    // console.log(this.notificationDetails);
    this.buildForm();
    this.getLookupByKey();

    // in case edit form 
    if (this.notificationDetails) {
      this.PopulateForm();
    }
  }

  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {

      if (res.isSuccess) {
        this.collectionOfLookup = res.data as ILookupCollection;
      }
      else {
        this.resultMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    });
  }
  closeNotify() {
    this.closeNotifyForm.emit(false)

  }
  get f() {
    return this.notifyForm.controls;

  }

  buildForm() {
    this.notifyForm = this.fb.group(
      {
        notifyName: ['', [Validators.required]],
        numberNotify: ['', [Validators.required]],
        notifyType: ['', [Validators.required]],
        messageAr: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(BaseConstantModel.ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],
        messageEn: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(BaseConstantModel.ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]]
      })
  }


  PopulateForm() {

    this.f.notifyName.setValue(this.notificationDetails?.notifyName);
    this.f.numberNotify.setValue(this.notificationDetails?.no);
    this.f.notifyType.setValue(this.notificationDetails?.notifyType);
    this.f.messageAr.setValue(this.notificationDetails?.msgAr);
    this.f.messageEn.setValue(this.notificationDetails?.msgEn);

  }
  onSubmit() {
    this.isSubmit = true;
    this.resultMessage = {}
    //form is valid
    if (this.notifyForm.valid) {

      // edit mode 
      if (this.notificationDetails) {
        // fill edit model 
        this.notificationEditModel = {
          progId: this.notificationDetails.progId,
          notifyId: this.notificationDetails.notifyId,
          notifyName: this.notifyForm.value.notifyName,
          no: this.notifyForm.value.numberNotify,
          notifyType: this.notifyForm.value.notifyType,
          msgAr: this.notifyForm.value.messageAr,
          msgEn: this.notifyForm.value.messageEn,

        }
        // send edit model to api 
        this.editNotification();
      }
      // add mode
      else {
        // 1- fill add model 
        this.notificationAddModel = {
          progId: 'a7cc7cec-8a16-403e-9343-2d7f0e994856',
          notifyName: this.notifyForm.value.notifyName,
          no: this.notifyForm.value.numberNotify,
          notifyType: this.notifyForm.value.notifyType,
          msgAr: this.notifyForm.value.messageAr,
          msgEn: this.notifyForm.value.messageEn,


        }
        // 2- send add  model to api 
        this.addNotifcation()

      }


    }
    // form is invalid
    else {
      this.resultMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    } //close else if in case form not invalid
  }
  addNotifcation() {

    this.notificationService.addNotification(this.notificationAddModel || {}).subscribe(res => {

      if (res.isSuccess) {

        this.closeNotify();
        this.alert.success(res.message || '');
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });


  }

  editNotification() {
    this.notificationService.updateNotification(this.notificationEditModel || {}).subscribe(res => {

      if (res.isSuccess) {
        this.closeNotify();
        this.alert.success(res.message || '');
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });

  }


}

