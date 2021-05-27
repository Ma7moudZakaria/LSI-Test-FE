import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { TranslateService } from '@ngx-translate/core';
import { IProgramNotificationDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-details';

@Component({
  selector: 'app-add-notifacations',
  templateUrl: './add-notifacations.component.html',
  styleUrls: ['./add-notifacations.component.scss']
})
export class AddNotifacationsComponent implements OnInit {
  @Output() closeNotifyForm = new EventEmitter<boolean>();
  @Input() IProgramNotificationDetails: IProgramNotificationDetails = {};
  notifyForm: FormGroup = new FormGroup({});
  langEnum = LanguageEnum;

  notificationDetails = {} as IProgramNotificationDetails;

  constructor(
    private fb: FormBuilder,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
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
        notifyNameAr: ['', []],
        // notifyNameEn: ['', []],
        numberNotify: ['', [Validators.required]],
        notifyType: ['', [Validators.required]],
        questionAr: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(BaseConstantModel.ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],
        questionEn: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(BaseConstantModel.ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]]
      })
  }

  getdata() {

  }
  PopulateForm() {

    this.f.notifyNameAr.setValue(this.notificationDetails?.notifyName);
    // this.f.notifyNameEn.setValue(this.notificationDetails?.notifyNameEn);
    this.f.numberNotify.setValue(this.notificationDetails?.numberNotify);
    this.f.notifyType.setValue(this.notificationDetails?.notifyType);
    this.f.questionAr.setValue(this.notificationDetails?.messageAr);
    this.f.questionEn.setValue(this.notificationDetails?.messageEn);

  }
  Submit() { }
}
