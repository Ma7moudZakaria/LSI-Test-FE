import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStudentProgramVacationModel} from '../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {StudentProgramVacationStatusEnum} from '../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import {IStudentProgramVacationFilterRequestModel} from '../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import {RoleEnum} from '../../../core/enums/role-enum.enum';
import {LanguageEnum} from '../../../core/enums/language-enum.enum';
import {TranslateService} from '@ngx-translate/core';
import {ExportationService} from '../../../core/services/exportation-services/exportation.service';
import {StudentProgramVacationUsersEnum} from '../../../core/enums/StudentProgramVacationStatus/student-program-vacation-users.enum';
import {IUser} from '../../../core/interfaces/auth-interfaces/iuser-model';

@Component({
  selector: 'app-student-program-vacation-grid',
  templateUrl: './student-program-vacation-grid.component.html',
  styleUrls: ['./student-program-vacation-grid.component.scss']
})
export class StudentProgramVacationGridComponent implements OnInit {
  @Input() vacationTypeEnum: StudentProgramVacationStatusEnum = StudentProgramVacationStatusEnum.Pending;
  @Input() studentVacationItems: IStudentProgramVacationModel[] = []
  @Input() studentVacationFilterRequestModel: IStudentProgramVacationFilterRequestModel = { skip: 0, take: 9, page: 1 };
  @Output() studentVacationFilterEvent = new EventEmitter<IStudentProgramVacationFilterRequestModel>();
  @Output() acceptAllStudentProgramVacationChecked = new EventEmitter<IStudentProgramVacationModel>();
  @Output() acceptStudentProgramVacation = new EventEmitter<IStudentProgramVacationModel>();
  @Input() numberPerRow: number = 3;
  @Input() totalCount: number = 0;
  @Input() studentProgramVacationFilterRequestModel: IStudentProgramVacationFilterRequestModel = { skip: 0, take: 9, page: 1 };
  @Output() itemStuReq = new EventEmitter<IStudentProgramVacationModel>();

  orderTypeToggel = 1;
  allSelected: boolean = false;
  stuTabTypeSelected = StudentProgramVacationStatusEnum;
  currentUser: IUser | undefined;
  userRole : any;

  constructor( public translate: TranslateService,
               private exportationService: ExportationService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.userRole= this.currentUser.usrRoles?.usrRoles?.[0].enRoleName.toString();

  }

  sortStudentByName() {
    this.studentProgramVacationFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
    this.studentProgramVacationFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentVacationFilterEvent.emit(this.studentProgramVacationFilterRequestModel);
  }

  sortStudentByNameOrderType() {
    if ((this.studentProgramVacationFilterRequestModel.sortField === "userNameAr" || this.studentProgramVacationFilterRequestModel.sortField === "UserNameEn") && this.studentProgramVacationFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.studentProgramVacationFilterRequestModel.sortField === "userNameAr" || this.studentProgramVacationFilterRequestModel.sortField === "UserNameEn") && this.studentProgramVacationFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortByStudentRequestDate() {
    this.studentProgramVacationFilterRequestModel.sortField = 'requestdate';
    this.studentProgramVacationFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentVacationFilterEvent.emit(this.studentProgramVacationFilterRequestModel);
  }

  sortByStudentRequestDateOrderType() {
    if (this.studentProgramVacationFilterRequestModel.sortField === 'requestdate' && this.studentProgramVacationFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.studentProgramVacationFilterRequestModel.sortField === 'requestdate' && this.studentProgramVacationFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  enableStudentSelectOperations(): boolean {
    return this.studentVacationItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someStudentItemsChecked(): boolean {
    if (this.studentVacationItems == null) {
      return false;
    }
    return this.studentVacationItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setStudentAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.studentVacationItems == null) {
      return;
    }
    this.studentVacationItems.forEach(t => t.checked = completed);
  }
  onStudentPageChange() {
    this.studentProgramVacationFilterRequestModel.skip = (this.studentProgramVacationFilterRequestModel.page - 1) * (this.studentProgramVacationFilterRequestModel.take);
    this.studentVacationFilterEvent.emit(this.studentProgramVacationFilterRequestModel);
    this.setStudentAllChecked(false);
  }
  rejectStuRequest(event: IStudentProgramVacationModel) {
    this.itemStuReq.emit(event)

  }
  acceptStuRequest(event: IStudentProgramVacationModel) {
    this.acceptStudentProgramVacation.emit(event)

  }
  cancelStuRequest(event: IStudentProgramVacationModel) {
    this.itemStuReq.emit(event)

  }
  terminateStuRequest(event: IStudentProgramVacationModel) {
    this.acceptStudentProgramVacation.emit(event)

  }
  acceptAllStudentProgramSubscriptionChechedEvent() {
    this.acceptAllStudentProgramVacationChecked.emit()
  }

  exportStudentCSV() {

  }
}
