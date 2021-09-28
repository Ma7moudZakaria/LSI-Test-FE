import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from '../../../core/interfaces/auth-interfaces/iuser-model';
import {TranslateService} from '@ngx-translate/core';
import {ExportationService} from '../../../core/services/exportation-services/exportation.service';
import {LanguageEnum} from '../../../core/enums/language-enum.enum';
import {ITeachersAppointmentRequestsModel} from '../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-model';
import {TeacherAppointmentRequestsEnum} from '../../../core/enums/teacher-appointment-requests-enums/teacher-appointment-requests-enum.enum';
import {ITeacherAppointmentFilterRequestModel} from '../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-filter-request-model';
import {ITeacherStudentViewModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-teacher-appointment-requests-grid',
  templateUrl: './teacher-appointment-requests-grid.component.html',
  styleUrls: ['./teacher-appointment-requests-grid.component.scss']
})
export class TeacherAppointmentRequestsGridComponent implements OnInit {
  @Input() teacherAppointmentRequestsEnum: TeacherAppointmentRequestsEnum = TeacherAppointmentRequestsEnum.Pending;
  @Input() teacherAppointmentRequestsItems: ITeachersAppointmentRequestsModel[] = [];
  @Output() teacherAppointmentFilterEvent = new EventEmitter<ITeacherAppointmentFilterRequestModel>();
  @Output() acceptAllTeacherAppointmentRequestsChecked = new EventEmitter<ITeachersAppointmentRequestsModel>();
  @Output() teacherAppointmentRequest = new EventEmitter<ITeachersAppointmentRequestsModel>();
  @Output() rejectTeacherAppointmentRequest = new EventEmitter<ITeachersAppointmentRequestsModel>();
  @Input() numberPerRow: number = 3;
  @Input() totalCount: number = 0;
  @Input() teacherAppointmentFilterRequestModel: ITeacherAppointmentFilterRequestModel = {skip: 0, take: 9, page: 1};
  @Output() cancelTeacherAppointment = new EventEmitter<ITeachersAppointmentRequestsModel>();
  @Output() userIdInput = new EventEmitter<ITeacherStudentViewModel>();

  orderTypeToggel = 1;
  allSelected: boolean = false;
  teacherAppointmentRequestTabTypeSelected = TeacherAppointmentRequestsEnum;
  currentUser: IUser | undefined;
  userRole: any;


  constructor(public translate: TranslateService,
              private exportationService: ExportationService) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') as string) as IUser;
    this.userRole = this.currentUser.usrRoles?.usrRoles?.[0].enRoleName.toString();

  }

  sortTeacherAppointmentByName() {
    this.teacherAppointmentFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
    this.teacherAppointmentFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherAppointmentFilterEvent.emit(this.teacherAppointmentFilterRequestModel);
  }

  sortTeacherAppointmentByNameOrderType() {
    if ((this.teacherAppointmentFilterRequestModel.sortField === 'userNameAr' || this.teacherAppointmentFilterRequestModel.sortField === 'UserNameEn') && this.teacherAppointmentFilterRequestModel.sortOrder == 1) {
      return 'asend';
    }
    if ((this.teacherAppointmentFilterRequestModel.sortField === 'userNameAr' || this.teacherAppointmentFilterRequestModel.sortField === 'UserNameEn') && this.teacherAppointmentFilterRequestModel.sortOrder == -1) {
      return 'desend';
    }

    return '';
  }

  sortByTeacherAppointmentRequestDate() {
    this.teacherAppointmentFilterRequestModel.sortField = 'requestdate';
    this.teacherAppointmentFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherAppointmentFilterEvent.emit(this.teacherAppointmentFilterRequestModel);
  }

  sortByTeacherAppointmentRequestDateOrderType() {
    if (this.teacherAppointmentFilterRequestModel.sortField === 'requestdate' && this.teacherAppointmentFilterRequestModel.sortOrder == 1) {
      return 'asend';
    }
    if (this.teacherAppointmentFilterRequestModel.sortField === 'requestdate' && this.teacherAppointmentFilterRequestModel.sortOrder == -1) {
      return 'desend';
    }

    return '';
  }

  enableTeacherAppointmentSelectOperations(): boolean {
    return this.teacherAppointmentRequestsItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someTeacherAppointmentItemsChecked(): boolean {
    if (this.teacherAppointmentRequestsItems == null) {
      return false;
    }
    return this.teacherAppointmentRequestsItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setTeacherAppointmentAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.teacherAppointmentRequestsItems == null) {
      return;
    }
    this.teacherAppointmentRequestsItems.forEach(t => t.checked = completed);
  }

  onTeacherAppointmentPageChange() {
    this.teacherAppointmentFilterRequestModel.skip = (this.teacherAppointmentFilterRequestModel.page - 1) * (this.teacherAppointmentFilterRequestModel.take);
    this.teacherAppointmentFilterEvent.emit(this.teacherAppointmentFilterRequestModel);
    this.setTeacherAppointmentAllChecked(false);
  }

  rejectTeacherAppointmentReq(event: ITeachersAppointmentRequestsModel) {
    this.rejectTeacherAppointmentRequest.emit(event);

  }

  acceptTeacherAppointmentReq(event: ITeachersAppointmentRequestsModel) {
    this.teacherAppointmentRequest.emit(event);

  }

  cancelTeacherAppointmentRequest(event: ITeachersAppointmentRequestsModel) {
    this.cancelTeacherAppointment.emit(event);

  }

  acceptAllTeacherAppointmentCheckedEvent() {
    this.acceptAllTeacherAppointmentRequestsChecked.emit();
  }

  exportStudentCSV() {

  }

  updateAllItemsChecked() {
    this.allSelected = this.teacherAppointmentRequestsItems != null && this.teacherAppointmentRequestsItems.every(t => t.checked);
  }

  userId(event: ITeacherStudentViewModel) {
    this.userIdInput.emit(event);
  }
}
