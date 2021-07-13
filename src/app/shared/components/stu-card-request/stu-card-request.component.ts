import { Component, Input, OnInit } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';

@Component({
  selector: 'app-stu-card-request',
  templateUrl: './stu-card-request.component.html',
  styleUrls: ['./stu-card-request.component.scss']
})
export class StuCardRequestComponent implements OnInit {
  @Input() typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;
  tabTypeSelected = StudentProgramSubscriptionStatusEnum;

  StudentSubscriptionModel: IStudentSubscriptionModel = {}

  constructor() { }

  ngOnInit(): void {
  }

}
