import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStudentProgramVacationStudentViewModel} from '../../../core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-student-view-model';
import {StudentProgramVacationStatusEnum} from '../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from '../../../core/enums/language-enum.enum';

@Component({
  selector: 'app-student-program-vacation-card-student-view',
  templateUrl: './student-program-vacation-card-student-view.component.html',
  styleUrls: ['./student-program-vacation-card-student-view.component.scss']
})
export class StudentProgramVacationCardStudentViewComponent implements OnInit {
  @Input() studentProgramVacationStudentViewModel: IStudentProgramVacationStudentViewModel = { totalRows: 0 }
  @Output() CancelStudentVacationRequest = new EventEmitter<IStudentProgramVacationStudentViewModel>();
  @Output() TerminateStudentVacationRequest = new EventEmitter<IStudentProgramVacationStudentViewModel>();

  studentProgramVacationStatus = StudentProgramVacationStatusEnum;
  requestStatus? : string;
  langEnum = LanguageEnum;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  cancelStudentReq() {
    this.CancelStudentVacationRequest.emit(this.studentProgramVacationStudentViewModel);
  }
  terminateStudentReq() {
    this.TerminateStudentVacationRequest.emit(this.studentProgramVacationStudentViewModel);
  }
}
