import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRejectTeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/ireject-teacher-program-subscription-model';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';

@Component({
  selector: 'app-teache-rejected',
  templateUrl: './teache-rejected.component.html',
  styleUrls: ['./teache-rejected.component.scss']
})
export class TeacheRejectedComponent implements OnInit {

  @Output() closeRejectedRequest = new EventEmitter<ITeacherProgramSubscriptionModel>();
  @Input() itemTeacherReq: ITeacherProgramSubscriptionModel= {totalRows:0}

  constructor(
    private teatchSubRequestService: TeacherProgramSubscriptionServicesService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  closeRejectRequest() {
    this.closeRejectedRequest.emit();
  }

  saveRejectRequest() {
    let model: IRejectTeacherProgramSubscriptionModel = {
      subscriptionId: this.itemTeacherReq.id,
      reasonReject: this.itemTeacherReq.reasonReject
    }
    if (model.reasonReject) {
      this.teatchSubRequestService.rejectTeachersProgramSubscription(model).subscribe(res => {

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


}
