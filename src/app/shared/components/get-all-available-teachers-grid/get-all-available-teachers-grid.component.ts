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
import { IAvailableTeacher } from 'src/app/core/interfaces/calls/iavailable-teacher';
import { IAvailableTeacherResonse } from 'src/app/core/interfaces/calls/iavailable-teacher-resonse';

@Component({
  selector: 'app-get-all-available-teachers-grid',
  templateUrl: './get-all-available-teachers-grid.component.html',
  styleUrls: ['./get-all-available-teachers-grid.component.scss']
})
export class GetAllAvailableTeachersGridComponent implements OnInit {
  @Input() availableTeachersList: IAvailableTeacherResonse[] = []
  @Input() numberPerRow: number = 2;
  @Input() totalCount: number = 0;
  @Input() filterAvailableTeacher: IAvailableTeacher = { skip: 0, take: 9, page: 1 };
  @Output() availableTeachersFilterEvent = new EventEmitter<IAvailableTeacher>();

  // @Input() studentVacationFilterRequestModel: IStudentProgramVacationFilterRequestModel = { skip: 0, take: 9, page: 1 };

  // @Output() acceptAllStudentProgramVacationChecked = new EventEmitter<IStudentProgramVacationModel>();
  // @Output() acceptStudentProgramVacation = new EventEmitter<IStudentProgramVacationModel>();
  @Output() sendStudentVacationId = new EventEmitter<ITeacherStudentViewModel>();

  // @Input() studentProgramVacationFilterRequestModel: IStudentProgramVacationFilterRequestModel = { skip: 0, take: 9, page: 1 };
  // @Output() studentProgramVacationStudentViewModel = new EventEmitter<IStudentProgramVacationStudentViewModel>();
  // @Output() terminateStudentProgramVacation = new EventEmitter<IStudentProgramVacationStudentViewModel>();
  // @Output() cancelStudentProgramVacation = new EventEmitter<IStudentProgramVacationStudentViewModel>();

  // orderTypeToggel = 1;
  // allSelected: boolean = false;
  // stuTabTypeSelected = StudentProgramVacationStatusEnum;
  // currentUser: IUser | undefined;
  // userRole: any;

  constructor(public translate: TranslateService,
    private exportationService: ExportationService) { }

  ngOnInit(): void {
    // this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    // this.userRole = this.currentUser.usrRoles?.usrRoles?.[0].enRoleName.toString();

  }

  onPageChange() {
    this.filterAvailableTeacher.skip = (this.filterAvailableTeacher.page - 1) * (this.filterAvailableTeacher.take);
    this.availableTeachersFilterEvent.emit(this.filterAvailableTeacher);

  }

  // getStudentVacationId(event: ITeacherStudentViewModel) {
  //   this.sendStudentVacationId.emit(event);
  // }

  // sortStudentByName() {
  //   this.studentProgramVacationFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
  //   this.studentProgramVacationFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
  //   this.availableTeachersFilterEvent.emit(this.studentProgramVacationFilterRequestModel);
  // }
  // sortByProgramName() {
  //   this.studentProgramVacationFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'programName' : 'programName';
  //   this.studentProgramVacationFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
  //   this.availableTeachersFilterEvent.emit(this.studentProgramVacationFilterRequestModel);
  // }

  // sortStudentByNameOrderType() {
  //   if ((this.studentProgramVacationFilterRequestModel.sortField === "userNameAr" || this.studentProgramVacationFilterRequestModel.sortField === "UserNameEn") && this.studentProgramVacationFilterRequestModel.sortOrder == 1) { return 'asend' }
  //   if ((this.studentProgramVacationFilterRequestModel.sortField === "userNameAr" || this.studentProgramVacationFilterRequestModel.sortField === "UserNameEn") && this.studentProgramVacationFilterRequestModel.sortOrder == -1) { return 'desend' }

  //   return '';
  // }

  // sortByStudentRequestDate() {
  //   this.studentProgramVacationFilterRequestModel.sortField = 'requestdate';
  //   this.studentProgramVacationFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
  //   this.availableTeachersFilterEvent.emit(this.studentProgramVacationFilterRequestModel);
  // }

  // sortByStudentRequestDateOrderType() {
  //   if (this.studentProgramVacationFilterRequestModel.sortField === 'requestdate' && this.studentProgramVacationFilterRequestModel.sortOrder == 1) { return 'asend' }
  //   if (this.studentProgramVacationFilterRequestModel.sortField === 'requestdate' && this.studentProgramVacationFilterRequestModel.sortOrder == -1) { return 'desend' }

  //   return '';
  // }

  // enableStudentSelectOperations(): boolean {
  //   return this.availableTeachers.filter(t => t.checked).length > 0 || this.allSelected;
  // }

  // someStudentItemsChecked(): boolean {
  //   if (this.availableTeachers == null) {
  //     return false;
  //   }
  //   return this.availableTeachers.filter(t => t.checked).length > 0 && !this.allSelected;
  // }

  // setStudentAllChecked(completed: boolean) {
  //   this.allSelected = completed;
  //   if (this.availableTeachers == null) {
  //     return;
  //   }
  //   this.availableTeachers.forEach(t => t.checked = completed);
  // }

  // rejectStuRequest(event: IStudentProgramVacationModel) {
  //   this.studentProgramVacationStudentViewModel.emit(event)

  // }
  // acceptStuRequest(event: IStudentProgramVacationModel) {
  //   this.acceptStudentProgramVacation.emit(event)

  // }
  // cancelStuRequest(event: IStudentProgramVacationStudentViewModel) {
  //   this.cancelStudentProgramVacation.emit(event)

  // }
  // terminateStuRequest(event: IStudentProgramVacationStudentViewModel) {
  //   this.terminateStudentProgramVacation.emit(event)

  // }
  // acceptAllStudentProgramSubscriptionChechedEvent() {
  //   this.acceptAllStudentProgramVacationChecked.emit()
  // }

  // exportStudentCSV() {

  // }
  // updateAllItemsChecked() {
  //   this.allSelected = this.availableTeachers != null && this.availableTeachers.every(t => t.checked);
  // }

}
