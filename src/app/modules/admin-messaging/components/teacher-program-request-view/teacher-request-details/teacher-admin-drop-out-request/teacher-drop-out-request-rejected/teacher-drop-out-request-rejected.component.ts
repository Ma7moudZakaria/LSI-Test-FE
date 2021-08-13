import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IRejectTeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/ireject-teacher-drop-out-request-model';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';

@Component({
  selector: 'app-teacher-drop-out-request-rejected',
  templateUrl: './teacher-drop-out-request-rejected.component.html',
  styleUrls: ['./teacher-drop-out-request-rejected.component.scss']
})
export class TeacherDropOutRequestRejectedComponent implements OnInit {

  @Output() closeRejectedRequest = new EventEmitter<ITeacherDropOutRequestModel>();

  @Input() itemTeacherDropOutRequestForReject: ITeacherDropOutRequestModel = {};

  rejectRequest: IRejectTeacherDropOutRequestModel = {};
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;

  constructor( 
    private teacherDropOutRequestService: TeacherDropOutRequestService,
    private alertify: AlertifyService , 
    public translate: TranslateService) { }

  ngOnInit(): void {
  }

  closeRejectRequest() {
    this.closeRejectedRequest.emit();
  }

  saveRejectRequest() {
    let model: IRejectTeacherDropOutRequestModel = {
      teacherDropOutRequest: this.itemTeacherDropOutRequestForReject.id,
      reasonReject: this.itemTeacherDropOutRequestForReject.reasonReject
    }
    
    if (model.reasonReject) {
      this.teacherDropOutRequestService.teacherDropOutRequestsRejection(model).subscribe(res => {

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
