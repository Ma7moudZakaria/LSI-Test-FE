import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudentSubscriptionPredefinedConditionResponse } from '../../../../../../core/interfaces/student-program-subscription-interfaces/ipredefined-condtion-subscription-model';

@Component({
  selector: 'app-admin-teacher-add-program',
  templateUrl: './admin-teacher-add-program.component.html',
  styleUrls: ['./admin-teacher-add-program.component.scss']
})
export class AdminTeacherAddProgramComponent implements OnInit {

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
