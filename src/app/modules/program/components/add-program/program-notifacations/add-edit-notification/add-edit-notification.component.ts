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

  notificationAddModel: IProgramNotificationModel | undefined;
  notificationEditModel: IProgramUpdateNotifacationModel | undefined;

  constructor(
    private fb: FormBuilder,
    public translate: TranslateService,
    private notificationService: ProgramNotificationService,

  ) { }

  ngOnInit(): void {
    // console.log(this.notificationDetails);
    this.buildForm();
    // in case edit form 
    if (this.notificationDetails) {
      this.PopulateForm();
    }
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
        messageEn: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(BaseConstantModel.ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]]
      })
  }


  PopulateForm() {

    this.f.notifyName.setValue(this.notificationDetails?.notifyName);
    this.f.numberNotify.setValue(this.notificationDetails?.numberNotify);
    this.f.notifyType.setValue(this.notificationDetails?.notifyType);
    this.f.messageAr.setValue(this.notificationDetails?.messageAr);
    this.f.messageEn.setValue(this.notificationDetails?.messageEn);

  }
  onSubmit() {
    this.isSubmit = true;

    // stop here if form is invalid
    if (this.notifyForm.invalid) {
      return;
    }

    else {

      // edit mode 
      if (this.notificationDetails) {
        // fill edit model 
        this.notificationEditModel = {

          notificationId: this.notificationDetails.notificationId,
          notifyName: this.notificationDetails.notifyName,
          numberNotify: this.notificationDetails.numberNotify,
          notifyType: this.notificationDetails.notifyType,
          messageAr: this.notificationDetails.messageAr,
          messageEn: this.notificationDetails.messageEn,

        }
        // send edit model to api 
        this.editNotification();
      }
      // add mode
      else {
        // 1- fill add model 
        this.notificationAddModel = {
          notifyName: this.notificationInputs.notifyName,
          numberNotify: this.notificationInputs.numberNotify,
          notifyType: this.notificationInputs.notifyType,
          messageAr: this.notificationInputs.messageAr,
          messageEn: this.notificationInputs.messageEn,


        }
        // 2- send add  model to api 
        this.addNotifcation()

      }


    } //clse else in case vaild form
  }

  addNotifcation() {

    this.notificationService.addNotification(this.notificationAddModel || {}).subscribe(res => {

      if (res.isSuccess) {
        this.resultMessage = {
          message: res.message || "",
          type: BaseConstantModel.SUCCESS_TYPE
        }
        this.closeNotify();
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
        this.resultMessage = {
          message: res.message || "",
          type: BaseConstantModel.SUCCESS_TYPE
        }
        this.closeNotify();
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

  onReset() {
    this.isSubmit = false;
    this.notifyForm.reset();
  }
}

