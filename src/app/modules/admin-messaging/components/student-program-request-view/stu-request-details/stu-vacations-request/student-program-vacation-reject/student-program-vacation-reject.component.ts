import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStudentProgramVacationModel} from '../../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {BaseMessageModel} from '../../../../../../../core/ng-model/base-message-model';
import {AlertifyService} from '../../../../../../../core/services/alertify-services/alertify.service';
import {BaseConstantModel} from '../../../../../../../core/ng-model/base-constant-model';
import {IRejectStudentProgramVacationModel} from '../../../../../../../core/interfaces/student-program-vacation-interfaces/ireject-student-program-vacation-model';
import {StudentProgramVacationServicesService} from '../../../../../../../core/services/student-program-vacation-services/student-program-vacation-services.service';

@Component({
  selector: 'app-student-program-vacation-reject',
  templateUrl: './student-program-vacation-reject.component.html',
  styleUrls: ['./student-program-vacation-reject.component.scss']
})
export class StudentProgramVacationRejectComponent implements OnInit {
  @Output() closeRejectedRequest = new EventEmitter<IStudentProgramVacationModel>();

  @Input() itemStuReq: IStudentProgramVacationModel = {}
  rejectRequest: IRejectStudentProgramVacationModel = {}
  // var response = <BaseResponseModel>res;
  resultMessage: BaseMessageModel = {};

  constructor(private stuSubRequestService: StudentProgramVacationServicesService
    ,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
  }


  closeRejectRequest() {
    this.closeRejectedRequest.emit();

  }
  saveRejectRequest() {
    let model: IRejectStudentProgramVacationModel = {
      batchId: this.itemStuReq.id,
      reasonReject: this.itemStuReq.rejReason
    }
    if (model.reasonReject) {
      this.stuSubRequestService.rejectStudentProgramVacation(model).subscribe(res => {

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
