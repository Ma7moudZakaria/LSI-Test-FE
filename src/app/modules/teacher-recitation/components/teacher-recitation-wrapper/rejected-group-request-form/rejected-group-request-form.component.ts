import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRejectGroupExplanationRequest } from 'src/app/core/interfaces/calls/ireject-group-explanation-request';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { CallsService } from 'src/app/core/services/calls-services/calls.service';

@Component({
  selector: 'app-rejected-group-request-form',
  templateUrl: './rejected-group-request-form.component.html',
  styleUrls: ['./rejected-group-request-form.component.scss']
})
export class RejectedGroupRequestFormComponent implements OnInit {
  itemRejectedReq: IRejectGroupExplanationRequest = {}
  @Output() hideform = new EventEmitter<boolean>();
  @Input() rejectedRequestId: string = ''

  constructor(
    private groupExplanationServices: CallsService,
    private alertify: AlertifyService

  ) { }

  ngOnInit(): void {
  }
  saveData() {

    let model: IRejectGroupExplanationRequest = {
      reqId: this.rejectedRequestId,
      reason: this.itemRejectedReq.reason
    }

    this.groupExplanationServices.rejectedGroupRequest(model).subscribe(res => {
      if (res.isSuccess) {
        this.cancelData();
        this.alertify.success(res.message || '');

      }
      else {
        this.alertify.error(res.message || '');
      }
    }, error => {


    })

  }
  cancelData() {
    this.hideform?.emit(false);
  }
}
