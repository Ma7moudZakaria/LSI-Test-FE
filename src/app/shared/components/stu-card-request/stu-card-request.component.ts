import { Component, OnInit } from '@angular/core';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';

@Component({
  selector: 'app-stu-card-request',
  templateUrl: './stu-card-request.component.html',
  styleUrls: ['./stu-card-request.component.scss']
})
export class StuCardRequestComponent implements OnInit {

  StudentSubscriptionModel: IStudentSubscriptionModel = {}

  constructor() { }

  ngOnInit(): void {
  }

}
