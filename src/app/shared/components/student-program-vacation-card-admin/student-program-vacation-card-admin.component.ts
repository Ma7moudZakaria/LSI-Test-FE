import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStudentProgramVacationModel} from '../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {StudentProgramVacationStatusEnum} from '../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';

@Component({
  selector: 'app-student-program-vacation-card-admin',
  templateUrl: './student-program-vacation-card-admin.component.html',
  styleUrls: ['./student-program-vacation-card-admin.component.scss']
})
export class StudentProgramVacationCardAdminComponent implements OnInit {
  @Output() rejectStudentVacationRequest = new EventEmitter<IStudentProgramVacationModel>();
  @Output() acceptStudentVacationRequest = new EventEmitter<IStudentProgramVacationModel>();
  @Input() typeEnum: StudentProgramVacationStatusEnum = StudentProgramVacationStatusEnum.Pending;

  tabTypeSelected = StudentProgramVacationStatusEnum;
  langEnum = LanguageEnum;

  @Input() studentSubscripModel: IStudentProgramVacationModel = { totalRows: 0 }

  constructor(public translate:TranslateService) { }

  ngOnInit(): void {
  }

  rejectedStudentReq() {
    this.rejectStudentVacationRequest.emit(this.studentSubscripModel);
    // console.log("rejected",this.studentSubscripModel )
  }
  acceptStudentReq() {
    this.acceptStudentVacationRequest.emit(this.studentSubscripModel);
  }

}
