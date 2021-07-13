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

  constructor() { }

  ngOnInit(): void {
  }
}
