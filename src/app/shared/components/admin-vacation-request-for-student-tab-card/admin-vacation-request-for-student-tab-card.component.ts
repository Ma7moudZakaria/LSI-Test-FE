import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { StudentProgramVacationStatusEnum } from 'src/app/core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import { IStudentProgramVacationStudentViewModel } from 'src/app/core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-student-view-model';

@Component({
  selector: 'app-admin-vacation-request-for-student-tab-card',
  templateUrl: './admin-vacation-request-for-student-tab-card.component.html',
  styleUrls: ['./admin-vacation-request-for-student-tab-card.component.scss']
})
export class AdminVacationRequestForStudentTabCardComponent implements OnInit {

  @Input() studentProgramVacationStudentViewModel: IStudentProgramVacationStudentViewModel = { totalRows: 0 }
  // @Output() CancelStudentVacationRequest = new EventEmitter<IStudentProgramVacationStudentViewModel>();
  @Output() TerminateStudentVacationRequest = new EventEmitter<IStudentProgramVacationStudentViewModel>();

  studentProgramVacationStatus = StudentProgramVacationStatusEnum;
  requestStatus?: string;
  langEnum = LanguageEnum;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  // cancelStudentReq() {
  //   this.CancelStudentVacationRequest.emit(this.studentProgramVacationStudentViewModel);
  // }
  // terminateStudentReq() {
  //   this.TerminateStudentVacationRequest.emit(this.studentProgramVacationStudentViewModel);
  // }

}
