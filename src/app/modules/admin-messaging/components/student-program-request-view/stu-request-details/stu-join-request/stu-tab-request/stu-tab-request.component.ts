import { Component, Input, OnInit } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';

@Component({
  selector: 'app-stu-tab-request',
  templateUrl: './stu-tab-request.component.html',
  styleUrls: ['./stu-tab-request.component.scss']
})
export class StuTabRequestComponent implements OnInit {

  @Input() typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;

  ngOnInit(): void {
  }

}
