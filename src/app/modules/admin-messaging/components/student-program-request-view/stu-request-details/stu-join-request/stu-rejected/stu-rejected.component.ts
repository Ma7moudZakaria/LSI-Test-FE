import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IRejectProgramSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/ireject-program-subscription-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';

@Component({
  selector: 'app-stu-rejected',
  templateUrl: './stu-rejected.component.html',
  styleUrls: ['./stu-rejected.component.scss']
})
export class StuRejectedComponent implements OnInit {
  @Output() closeRejectedRequest = new EventEmitter<boolean>();

  @Input() itemStuReq: IStudentSubscriptionModel = {}
  // rejectRequest: IRejectProgramSubscriptionModel = {}
  // var response = <BaseResponseModel>res;
  resultMessage: BaseMessageModel = {};

  constructor(private stuSubRequestService: StudentProgramSubscriptionServicesService
    ,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
  }


  closeRejectRequest(btn: boolean) {
    this.closeRejectedRequest.emit(btn);

  }
  cancelRejectRequest() {
    this.closeRejectRequest(false);

  }
  saveRejectRequest() {
    let model: IRejectProgramSubscriptionModel = {
      subscriptionId: this.itemStuReq.id,
      reasonReject: this.itemStuReq.rejReas
    }
    if (model.reasonReject) {
      this.stuSubRequestService.rejectStudentProgramSubscription(model).subscribe(res => {

        if (res.isSuccess) {
          this.closeRejectRequest(true);
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
