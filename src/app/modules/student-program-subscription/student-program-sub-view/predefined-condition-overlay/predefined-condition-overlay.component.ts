import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPredefinedCondtionSubscriptionModel, IStudentSubscriptionPredefinedConditionResponse } from 'src/app/core/interfaces/student-program-subscription-interfaces/ipredefined-condtion-subscription-model';

@Component({
  selector: 'app-predefined-condition-overlay',
  templateUrl: './predefined-condition-overlay.component.html',
  styleUrls: ['./predefined-condition-overlay.component.scss']
})
export class PredefinedConditionOverlayComponent implements OnInit {
  @Input() predefinedCondition: IStudentSubscriptionPredefinedConditionResponse | undefined;
  @Output() closeOverlay = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    console.log("programPredefinedCondtion", this.predefinedCondition)
  }
  closeForm() {
    this.closeOverlay.emit(false)
  }
}
