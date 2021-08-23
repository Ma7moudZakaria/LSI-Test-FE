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
  joiningExamOverlay: Boolean = false;
  requestId: string | undefined;
  predefinedCondition: IStudentSubscriptionPredefinedConditionResponse | undefined
  progDetails: IProgramSubscriptionDetails | undefined
  constructor() { }

  ngOnInit(): void {
  }
  ShowVerifyProgramPredefinedConditionOverlay(event: IStudentSubscriptionPredefinedConditionResponse) {
    this.predefinedCondition = event
    this.predefinedConditionOverlay = true;
  }
  ShowCustomConditionOverlay(event: IProgramSubscriptionDetails) {
    this.progDetails = event
    this.customConditionOverlay = true;

  }
  sendRequestId(event: string) {
    this.requestId = event
  }
  closeOverlay() {
    this.predefinedConditionOverlay = false;
  }
  closeExamOverlay() {
    this.joiningExamOverlay = false;
  }
  openJoiningExamOverlay(event: IProgramSubscriptionDetails) {
    this.predefinedConditionOverlay = false;
    this.customConditionOverlay = false;
    this.joiningExamOverlay = true;
  }
}
