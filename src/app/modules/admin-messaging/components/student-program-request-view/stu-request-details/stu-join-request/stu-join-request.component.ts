import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { StuTabRequestComponent } from './stu-tab-request/stu-tab-request.component';

@Component({
  selector: 'app-stu-join-request',
  templateUrl: './stu-join-request.component.html',
  styleUrls: ['./stu-join-request.component.scss']
})
export class StuJoinRequestComponent implements OnInit {
  @ViewChild(StuTabRequestComponent) stuRejectReq: StuTabRequestComponent | undefined;

  showTap: string = 'Pending';
  // roleEnum: RoleEnum = RoleEnum.Teacher;
  itemStuReq: IStudentSubscriptionModel = {};
  openStuRejectOverlay: boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  openRejectRequest(event: IStudentSubscriptionModel) {
    this.itemStuReq = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;

  }
  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.stuRejectReq?.getStudentProgramSubscriptionsFilter();

  }

  closeOverlay() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.stuRejectReq?.getStudentProgramSubscriptionsFilter();

  }

}
