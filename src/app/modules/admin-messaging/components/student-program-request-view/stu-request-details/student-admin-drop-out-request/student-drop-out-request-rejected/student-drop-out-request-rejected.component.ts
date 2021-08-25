import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IRejectStudentDropOutRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/ireject-student-drop-out-request-model';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentDropOutRequestService } from 'src/app/core/services/student-drop-out-request-services/student-drop-out-request.service';

@Component({
  selector: 'app-student-drop-out-request-rejected',
  templateUrl: './student-drop-out-request-rejected.component.html',
  styleUrls: ['./student-drop-out-request-rejected.component.scss']
})
export class StudentDropOutRequestRejectedComponent implements OnInit {

  @Output() closeRejectedRequest = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();

  @Input() itemStudentDropOutRequestForReject: IStudentDropOutRequestsFilterResponseModel = {};

  rejectRequest: IRejectStudentDropOutRequestModel = {};
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;

  constructor( 
    private studentDropOutRequestService: StudentDropOutRequestService,
    private alertify: AlertifyService , 
    public translate: TranslateService) { }

  ngOnInit(): void {
  }

  closeRejectRequest() {
    this.closeRejectedRequest.emit();
  }

  saveRejectRequest() {
    this.resultMessage= {};
    if(this.itemStudentDropOutRequestForReject.reasonReject ){
      if(this.itemStudentDropOutRequestForReject.reasonReject?.length > 256){
        this.resultMessage = {
          message: this.translate.instant('GENERAL_DROP_OUT_REQUEST.REJECT_REASON_LENGHT'),
          type: BaseConstantModel.DANGER_TYPE
        }

        return;
      }
    }

    let model: IRejectStudentDropOutRequestModel = {
      studentDropOutRequest: this.itemStudentDropOutRequestForReject.id,
      reasonReject: this.itemStudentDropOutRequestForReject.reasonReject
    }
    
    if (model.reasonReject) {
      this.studentDropOutRequestService.studentDropOutRequestsRejection(model).subscribe(res => {

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
