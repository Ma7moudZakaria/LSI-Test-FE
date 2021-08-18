import { Component, OnInit } from '@angular/core';
import { IPredefinedCondtionSubscriptionModel, IStudentSubscriptionPredefinedConditionResponse } from 'src/app/core/interfaces/student-program-subscription-interfaces/ipredefined-condtion-subscription-model';
import { IProgramSubscriptionDetails } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprogram-subscription-details';

@Component({
  selector: 'app-student-program-sub-view',
  templateUrl: './student-program-sub-view.component.html',
  styleUrls: ['./student-program-sub-view.component.scss']
})
export class StudentProgramSubViewComponent implements OnInit {
  predefinedConditionOverlay: boolean = false;
  customConditionOverlay: boolean = false;

  predefinedCondition: IStudentSubscriptionPredefinedConditionResponse | undefined
  customCondition: IProgramSubscriptionDetails | undefined
  constructor() { }

  ngOnInit(): void {
  }
  ShowVerifyProgramPredefinedConditionOverlay(event: IStudentSubscriptionPredefinedConditionResponse) {
    this.predefinedCondition = event
    this.predefinedConditionOverlay = true;
  }
  ShowCustomConditionOverlay(event: IProgramSubscriptionDetails) {
    this.customCondition = event
    this.customConditionOverlay = true;

  }
  closeOverlay() {
    this.predefinedConditionOverlay = false;

  }
}
