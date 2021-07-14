import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IRejectProgramSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/ireject-program-subscription-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';

@Component({
  selector: 'app-stu-rejected',
  templateUrl: './stu-rejected.component.html',
  styleUrls: ['./stu-rejected.component.scss']
})
export class StuRejectedComponent implements OnInit {
  @Output() closeRejectedRequest = new EventEmitter<IStudentSubscriptionModel>();

  @Input() itemStuReq: IStudentSubscriptionModel = {}
  rejectRequest: IRejectProgramSubscriptionModel = {}
  // var response = <BaseResponseModel>res;

  constructor(private stuSubRequestService: StudentProgramSubscriptionServicesService
    ,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
  }


  closeRejectRequest() {
    this.closeRejectedRequest.emit();

  }
  saveRejectRequest() {
    let model: IRejectProgramSubscriptionModel = {
      subscriptionId: this.itemStuReq.id,
      reasonReject: this.itemStuReq.reasonReject
    }
    if (model.reasonReject) {
      this.stuSubRequestService.rejectStudentProgramSubscription(model).subscribe(res => {

        if (res.isSuccess) {
          this.closeRejectRequest();
          this.alertify.success(res.message || '');

        }
        else {
          this.alertify.error(res.message || '');
        }
      }, error => {

      })
    }

  }
  // saveReplyToScientificProble() {
  //   let model: IAddScProbReply = {
  //     id: this.scProbObjForAddReplyView?.id,
  //     reply: this.scProbObjForAddReplyView?.repText
  //   };

  //   if (model.reply) {
  //     this.scientificProblemService.addScientificProblemReply(model).subscribe(res => {
  //       if (res.isSuccess) {
  //         this.alertify.success(res.message || '');
  //         this.closeAddReplyToScProblem.emit();
  //       }
  //       else {
  //         this.resultMessage = {
  //           message: res.message,
  //           type: BaseConstantModel.DANGER_TYPE
  //         }
  //       }
  //     }, error => {
  //       this.resultMessage = {
  //         message: error,
  //         type: BaseConstantModel.DANGER_TYPE
  //       }
  //     })
  //   }
  //   else {
  //     this.resultMessage = {
  //       message: this.tranlste.instant('SCIENTIFIC_PROBLEM.ENTER_REPLAY'),
  //       type: BaseConstantModel.DANGER_TYPE
  //     }
  //   }

  // }


}
