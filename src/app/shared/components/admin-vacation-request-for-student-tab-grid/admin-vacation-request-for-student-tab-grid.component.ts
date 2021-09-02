import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudentProgramVacationModel } from '../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import { StudentProgramVacationStatusEnum } from '../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import { IStudentProgramVacationFilterRequestModel } from '../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { ExportationService } from '../../../core/services/exportation-services/exportation.service';
import { IUser } from '../../../core/interfaces/auth-interfaces/iuser-model';
import { IStudentProgramVacationStudentViewModel } from '../../../core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-student-view-model';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-admin-vacation-request-for-student-tab-grid',
  templateUrl: './admin-vacation-request-for-student-tab-grid.component.html',
  styleUrls: ['./admin-vacation-request-for-student-tab-grid.component.scss']
})
export class AdminVacationRequestForStudentTabGridComponent implements OnInit {

  @Input() vacationTypeEnum: StudentProgramVacationStatusEnum = StudentProgramVacationStatusEnum.Pending;
  @Input() studentVacationItems: IStudentProgramVacationModel[] = []
  @Input() studentVacationFilterRequestModel: IStudentProgramVacationFilterRequestModel = { skip: 0, take: 9, page: 1 };
  @Output() studentVacationFilterEvent = new EventEmitter<IStudentProgramVacationFilterRequestModel>();
  @Output() acceptAllStudentProgramVacationChecked = new EventEmitter<IStudentProgramVacationModel>();
  @Output() acceptStudentProgramVacation = new EventEmitter<IStudentProgramVacationModel>();
  @Output() sendStudentVacationId = new EventEmitter<ITeacherStudentViewModel>();
  @Input() numberPerRow: number = 3;
  @Input() totalCount: number = 0;
  @Input() studentProgramVacationFilterRequestModel: IStudentProgramVacationFilterRequestModel = { skip: 0, take: 9, page: 1 };
  @Output() studentProgramVacationStudentViewModel = new EventEmitter<IStudentProgramVacationStudentViewModel>();
  @Output() terminateStudentProgramVacation = new EventEmitter<IStudentProgramVacationStudentViewModel>();
  @Output() cancelStudentProgramVacation = new EventEmitter<IStudentProgramVacationStudentViewModel>();

  orderTypeToggel = 1;
  allSelected: boolean = false;
  stuTabTypeSelected = StudentProgramVacationStatusEnum;
  currentUser: IUser | undefined;
  userRole: any;

  constructor(public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.userRole = this.currentUser.usrRoles?.usrRoles?.[0].enRoleName.toString();

  }
  // getStudentVacationId(event: ITeacherStudentViewModel) {
  //   this.sendStudentVacationId.emit(event);
  // }




  enableStudentSelectOperations(): boolean {
    return this.studentVacationItems.filter(t => t.checked).length > 0 || this.allSelected;
  }




  onStudentPageChange() {
    this.studentProgramVacationFilterRequestModel.skip = (this.studentProgramVacationFilterRequestModel.page - 1) * (this.studentProgramVacationFilterRequestModel.take);
    this.studentVacationFilterEvent.emit(this.studentProgramVacationFilterRequestModel);
    // this.setStudentAllChecked(false);
  }



  // terminateStuRequest(event: IStudentProgramVacationStudentViewModel) {
  //   this.terminateStudentProgramVacation.emit(event)

  // }


  // cancelStuRequest(event: IStudentProgramVacationStudentViewModel) {
  //   this.cancelStudentProgramVacation.emit(event)

  // }

}
