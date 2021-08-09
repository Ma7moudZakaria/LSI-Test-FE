import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStudentProgramVacationModel} from '../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {StudentProgramSubscriptionStatusEnum} from '../../../core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import {StudentProgramVacationStatusEnum} from '../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import {IStudentSubscriptionModel} from '../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';

@Component({
  selector: 'app-student-program-vacation-card-admin',
  templateUrl: './student-program-vacation-card-admin.component.html',
  styleUrls: ['./student-program-vacation-card-admin.component.scss']
})
export class StudentProgramVacationCardAdminComponent implements OnInit {
  @Output() rejecteStuRequest1 = new EventEmitter<IStudentProgramVacationModel>();
  @Output() acceptStuRequest1 = new EventEmitter<IStudentProgramVacationModel>();
  @Input() typeEnum: StudentProgramVacationStatusEnum = StudentProgramVacationStatusEnum.Pending;

  tabTypeSelected = StudentProgramVacationStatusEnum;

  @Input() studentSubscripModel: IStudentProgramVacationModel = { totalRows: 0 }

  constructor() { }

  ngOnInit(): void {
  }

  rejectedStudentReq() {
    this.rejecteStuRequest1.emit(this.studentSubscripModel)
  }
  acceptStudentReq() {
    this.acceptStuRequest1.emit(this.studentSubscripModel);
  }

}
