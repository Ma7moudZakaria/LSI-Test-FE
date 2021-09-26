import { IAvailableTeacherResonse } from './../../../core/interfaces/calls/iavailable-teacher-resonse';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudentProgramVacationModel } from '../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import { StudentProgramVacationStatusEnum } from '../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { IAvailableTeacher } from 'src/app/core/interfaces/calls/iavailable-teacher';

@Component({
  selector: 'app-get-all-available-teachers-card',
  templateUrl: './get-all-available-teachers-card.component.html',
  styleUrls: ['./get-all-available-teachers-card.component.scss']
})
export class GetAllAvailableTeachersCardComponent implements OnInit {

  @Output() studentVacationId = new EventEmitter<ITeacherStudentViewModel>();
  langEnum = LanguageEnum;
  starsSelected = 0;
  @Input() availableTeacherResponseModel: IAvailableTeacherResonse = { totalRows: 0 }

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }
  // showStudentDetails(id?: string, JoinedProgName?: string) {
  //   let UserModel: ITeacherStudentViewModel = { progName: JoinedProgName, usrId: id };
  //   this.studentVacationId.emit(UserModel);
  // }


}
