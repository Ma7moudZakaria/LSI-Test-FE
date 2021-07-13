import { Component, OnInit } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';

@Component({
  selector: 'app-stu-join-request',
  templateUrl: './stu-join-request.component.html',
  styleUrls: ['./stu-join-request.component.scss']
})
export class StuJoinRequestComponent implements OnInit {
  showTap: string = 'Pending';
  // roleEnum: RoleEnum = RoleEnum.Teacher;
  typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;
  constructor() { }

  ngOnInit(): void {
  }
  PendingTab() {
    this.showTap = 'Pending';
    this.typeEnum = StudentProgramSubscriptionStatusEnum.Pending;
    console.log('Pending')
  }
  AcceptTab() {
    this.showTap = 'Accept';
    this.typeEnum = StudentProgramSubscriptionStatusEnum.Accept;
    console.log('Accept')

  }

  RejectedTab() {
    this.showTap = 'Rejected';
    this.typeEnum = StudentProgramSubscriptionStatusEnum.Rejected;
    console.log('Rejected')

  }
}
