import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IRejectTeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/ireject-teacher-system-subscription';
import { ITeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/iteacher-systems-subscription';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TeacherProfileService } from 'src/app/core/services/teacher-profile/teacher-profile.service';

@Component({
  selector: 'app-teacher-system-subscription-rejected',
  templateUrl: './teacher-system-subscription-rejected.component.html',
  styleUrls: ['./teacher-system-subscription-rejected.component.scss']
})
export class TeacherSystemSubscriptionRejectedComponent implements OnInit {

  @Output() closeRejectedRequest = new EventEmitter<ITeacherSystemSubscription>();

  @Input() itemTeacherSystemSubscriptionReq: ITeacherSystemSubscription = {};

  rejectRequest: IRejectTeacherSystemSubscription = {};
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;

  constructor(private teacherService: TeacherProfileService,
    private alertify: AlertifyService , public translate: TranslateService) { }

  ngOnInit(): void {
  }

  closeRejectRequest() {
    this.closeRejectedRequest.emit();
  }

  saveRejectRequest() {
    let model: IRejectTeacherSystemSubscription = {
      usrId: this.itemTeacherSystemSubscriptionReq.id,
      reasonReject: this.itemTeacherSystemSubscriptionReq.reasonReject
    }
    if (model.reasonReject) {
      this.teacherService.teacherSubscriptionsRejection(model).subscribe(res => {

        if (res.isSuccess) {
          this.closeRejectRequest();
          this.alertify.success(res.message || '');
        }
        else {
          this.alertify.error(res.message || '');
        }
      }, error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
    }    
  }
}
