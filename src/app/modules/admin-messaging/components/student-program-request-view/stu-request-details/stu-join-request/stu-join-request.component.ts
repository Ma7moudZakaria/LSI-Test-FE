import { Component, OnInit } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';

@Component({
  selector: 'app-stu-join-request',
  templateUrl: './stu-join-request.component.html',
  styleUrls: ['./stu-join-request.component.scss']
})
export class StuJoinRequestComponent implements OnInit {
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


  }
}
