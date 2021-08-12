import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStudentProgramVacationStudentViewModel} from '../../../core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-student-view-model';
import {StudentProgramVacationStatusEnum} from '../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';

@Component({
  selector: 'app-student-program-vacation-card-student-view',
  templateUrl: './student-program-vacation-card-student-view.component.html',
  styleUrls: ['./student-program-vacation-card-student-view.component.scss']
})
export class StudentProgramVacationCardStudentViewComponent implements OnInit {
  @Input() studentProgramVacationStudentViewModel: IStudentProgramVacationStudentViewModel = { totalRows: 0 }
  @Output() CancelStudentVacationRequest = new EventEmitter<IStudentProgramVacationStudentViewModel>();
  @Output() TerminateStudentVacationRequest = new EventEmitter<IStudentProgramVacationStudentViewModel>();
  // @Input() typeEnum: StudentProgramVacationStatusEnum = StudentProgramVacationStatusEnum;

  studentProgramVacationStatus = StudentProgramVacationStatusEnum;
  requestStatus? : string;

  constructor() { }

  ngOnInit(): void {
    this.studentProgramVacationStudentViewModel.statusEnum

    for (var status in this.studentProgramVacationStatus) {
      var vstatus = parseInt(status, 10) == this.studentProgramVacationStudentViewModel.statusEnum;
      if (vstatus) {
        this.requestStatus =  this.studentProgramVacationStatus[status];
      }
    }
  }

  cancelStudentReq() {
    this.CancelStudentVacationRequest.emit(this.studentProgramVacationStudentViewModel);
  }
  terminateStudentReq() {
    this.TerminateStudentVacationRequest.emit(this.studentProgramVacationStudentViewModel);
  }
}
