import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramSubscriptionUsersEnum } from '../../../core/enums/program-subscription-users-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { IStudentDropOutRequestsFilterStudentViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-request-model';
import { IStudentDropOutRequestsFilterStudentViewResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-response-model';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { ExportationService } from 'src/app/core/services/exportation-services/exportation.service';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-teacher-view-request-model';
import { ITeacherDropOutRequestTeacherViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-teacher-view-model';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { ITeacherDropOutRequestAdvFilterAdminViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-admin-view-request-model';

@Component({
  selector: 'app-admin-drop-out-request-for-teacher-tab-and-student-tab-grid',
  templateUrl: './admin-drop-out-request-for-teacher-tab-and-student-tab-grid.component.html',
  styleUrls: ['./admin-drop-out-request-for-teacher-tab-and-student-tab-grid.component.scss']
})
export class AdminDropOutRequestForTeacherTabAndStudentTabGridComponent implements OnInit {

  // @Input() userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.teacher;
  // @Input() userMode: DropOutRoleEnum | undefined;
  // programSubscriptionUsers = ProgramSubscriptionUsersEnum;
  @Input() userMode: DropOutRoleEnum | undefined;
  userRoleMode = DropOutRoleEnum;



  @Output() studentDropOutRequestFilterStudentEvent = new EventEmitter<IStudentDropOutRequestsFilterStudentViewRequestModel>();
  @Output() itemStudentDropOutRequestForStudentReject = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Output() rejectStudentDropOutStudentRequest = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Output() acceptStudentDropOutStudentRequest = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Output() cancelRequestOfStudent = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  @Output() acceptAllStudentDropOutRequestStudentChecked = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Input() studentDropOutRequestFilterRequestStudentModel: IStudentDropOutRequestsFilterStudentViewRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() studentDropOutRequestStudentItems: IStudentDropOutRequestsFilterStudentViewResponseModel[] = [];

  studentItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  teacherItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


  @Input() numberPerRow: number = 3;
  @Input() totalCount: number = 0;
  @Input() typeEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  @Input() typeDropOutRequestEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;

  studentTabTypeSelected = StudentDropOutRequestStatusEnum;
  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  allSelected: boolean = false;
  studentDropOutRequestStatus = StudentDropOutRequestStatusEnum;
  page = 1
  // ----------------------------


  // @Output() teacherDropOutRequestFilterEvent = new EventEmitter<ITeacherDropOutRequestAdvFilterAdminViewRequestModel>();
  // @Output() itemTeacherDropOutRequestForReject = new EventEmitter<ITeacherDropOutRequestModel>();
  // @Output() rejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  // @Output() acceptTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  // @Output() cancelRequestOfTeacher = new EventEmitter<ITeacherDropOutRequestModel>();
  // @Output() userIdInput = new EventEmitter<ITeacherStudentViewModel>();

  // @Output() acceptAllTeacherDropOutRequestChecked = new EventEmitter<ITeacherDropOutRequestModel>();

  @Input() teacherDropOutRequestFilterRequestModel: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { skip: 0, take: 9, page: 1 };
  // @Input() numberPerRow: number = 3;
  @Input() teacherDropOutRequestItems: ITeacherDropOutRequestModel[] = []

  @Input() teacherDropOutRequestFilterRequestTeacherViewModel: ITeacherDropOutRequestAdvFilterTeacherViewRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() teacherDropOutRequestTeacherViewItems: ITeacherDropOutRequestTeacherViewModel[] = [];


  // @Input() typeEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  // @Input() typeDropOutRequestEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;

  // @Input() userMode: DropOutRoleEnum | undefined ;
  // userRoleMode = DropOutRoleEnum;



  teacherTabTypeSelected = TeacherDropOutRequestStatusEnum;


  teacherDropOutRequestStatus = TeacherDropOutRequestStatusEnum;



  constructor(
    public translate: TranslateService,
    private exportationService: ExportationService
  ) { }

  ngOnInit(): void {
  }


  // Start Student View

  sortStudentByName() {
    this.studentDropOutRequestFilterRequestStudentModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'studentNameAr' : 'StudentNameAr';
    this.studentDropOutRequestFilterRequestStudentModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentDropOutRequestFilterStudentEvent.emit(this.studentDropOutRequestFilterRequestStudentModel);
  }

  sortStudentByNameOrderType() {
    if ((this.studentDropOutRequestFilterRequestStudentModel.sortField === "studentNameAr" || this.studentDropOutRequestFilterRequestStudentModel.sortField === "StudentNameEn") && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == 1) { return 'asend' }
    if ((this.studentDropOutRequestFilterRequestStudentModel.sortField === "studentNameAr" || this.studentDropOutRequestFilterRequestStudentModel.sortField === "StudentNameEn") && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortStudentRequestDate() {
    this.studentDropOutRequestFilterRequestStudentModel.sortField = 'requestdate';
    this.studentDropOutRequestFilterRequestStudentModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentDropOutRequestFilterStudentEvent.emit(this.studentDropOutRequestFilterRequestStudentModel);
  }

  sortStudentRequestDateOrderType() {
    if (this.studentDropOutRequestFilterRequestStudentModel.sortField === 'requestdate' && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == 1) { return 'asend' }
    if (this.studentDropOutRequestFilterRequestStudentModel.sortField === 'requestdate' && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  onStudentPageChange() {
    this.studentDropOutRequestFilterRequestStudentModel.skip = (this.studentDropOutRequestFilterRequestStudentModel.page - 1) * (this.studentDropOutRequestFilterRequestStudentModel.take || 0);
    this.studentDropOutRequestFilterStudentEvent.emit(this.studentDropOutRequestFilterRequestStudentModel);
    this.setStudentAllChecked(false);
  }

  sortStudentDropOutRequestByNameOrderType() {
    if ((this.studentDropOutRequestFilterRequestStudentModel.sortField === "studentNameAr" || this.studentDropOutRequestFilterRequestStudentModel.sortField === "StudentNameEn") && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == 1) { return 'asend' }
    if ((this.studentDropOutRequestFilterRequestStudentModel.sortField === "studentNameAr" || this.studentDropOutRequestFilterRequestStudentModel.sortField === "StudentNameEn") && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortByStudentDropOutRequestRequestDate() {
    this.studentDropOutRequestFilterRequestStudentModel.sortField = 'requestdate';
    this.studentDropOutRequestFilterRequestStudentModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentDropOutRequestFilterStudentEvent.emit(this.studentDropOutRequestFilterRequestStudentModel);
  }

  sortByStudentDropOutRequestDateOrderType() {
    if (this.studentDropOutRequestFilterRequestStudentModel.sortField === 'requestdate' && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == 1) { return 'asend' }
    if (this.studentDropOutRequestFilterRequestStudentModel.sortField === 'requestdate' && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortStudentBatchByName() {
    this.studentDropOutRequestFilterRequestStudentModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'batchNameAr' : 'BatchNameAr';
    this.studentDropOutRequestFilterRequestStudentModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentDropOutRequestFilterStudentEvent.emit(this.studentDropOutRequestFilterRequestStudentModel);
  }

  sortStudentBatchOrderType() {
    if ((this.studentDropOutRequestFilterRequestStudentModel.sortField === "batchNameAr" || this.studentDropOutRequestFilterRequestStudentModel.sortField === "BatchNameEn") && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == 1) { return 'asend' }
    if ((this.studentDropOutRequestFilterRequestStudentModel.sortField === "batchNameAr" || this.studentDropOutRequestFilterRequestStudentModel.sortField === "BatchNameEn") && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortStudentBatchByNameOrderType() {
    if ((this.studentDropOutRequestFilterRequestStudentModel.sortField === "batchNameAr" || this.studentDropOutRequestFilterRequestStudentModel.sortField === "BatchNameEn") && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == 1) { return 'asend' }
    if ((this.studentDropOutRequestFilterRequestStudentModel.sortField === "batchNameAr" || this.studentDropOutRequestFilterRequestStudentModel.sortField === "BatchNameEn") && this.studentDropOutRequestFilterRequestStudentModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  enableStudentSelectOperations(): boolean {
    return this.studentDropOutRequestStudentItems.filter(t => t.checked).length > 0 || this.allSelected;
  }
  onTeacherPageChange() { }
  someStudentItemsChecked(): boolean {
    if (this.studentDropOutRequestStudentItems == null) {
      return false;
    }
    return this.studentDropOutRequestStudentItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setStudentAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.studentDropOutRequestStudentItems == null) {
      return;
    }
    this.studentDropOutRequestStudentItems.forEach(t => t.checked = completed);
  }

  exportStudentCSV() {
    let expItems = this.studentDropOutRequestStudentItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' اسم البرنامج ',
        'اسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'student', data, headerLabels);
  }

  enableStudentDropOutRequestSelectOperations(): boolean {
    return this.studentDropOutRequestStudentItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someStudentDropOutRequestItemsChecked(): boolean {
    if (this.studentDropOutRequestStudentItems == null) {
      return false;
    }
    return this.studentDropOutRequestStudentItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setStudentDropOutRequestAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.studentDropOutRequestStudentItems == null) {
      return;
    }
    this.studentDropOutRequestStudentItems.forEach(t => t.checked = completed);
  }

  exportStudentDropOutRequestCSV() {
    let expItems = this.studentDropOutRequestStudentItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' أسم البرنامج ',
        'أسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'Student', data, headerLabels);
  }

  onStudentDropOutRequestPageChange() {
    this.studentDropOutRequestFilterRequestStudentModel.skip = (this.studentDropOutRequestFilterRequestStudentModel.page - 1) * (this.studentDropOutRequestFilterRequestStudentModel.take);
    this.studentDropOutRequestFilterStudentEvent.emit(this.studentDropOutRequestFilterRequestStudentModel);
    this.setStudentDropOutRequestAllChecked(false);
  }

  // acceptAllStudentDropOutRequestCheckedEvent() {
  //   this.acceptAllStudentDropOutRequestStudentChecked.emit()
  // }

  // rejectStudentDropOutRequestEvent(studentModel: IStudentDropOutRequestsFilterStudentViewResponseModel) {
  //   this.itemStudentDropOutRequestForStudentReject.emit(studentModel);
  // }

  // acceptStudentDropOutRequestEvent(studentModel: IStudentDropOutRequestsFilterStudentViewResponseModel) {
  //   this.acceptStudentDropOutStudentRequest.emit(studentModel);
  // }

  // cancelRequestOfStudentEvent(studentModel: IStudentDropOutRequestsFilterResponseModel) {
  //   this.cancelRequestOfStudent.emit(studentModel);
  // }

  // End Here




  // Start Teacher View

  enableTeacherViewSelectOperations(): boolean {
    return this.teacherDropOutRequestTeacherViewItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someTeacherViewItemsChecked(): boolean {
    if (this.teacherDropOutRequestTeacherViewItems == null) {
      return false;
    }
    return this.teacherDropOutRequestTeacherViewItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setTeacherViewAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.teacherDropOutRequestTeacherViewItems == null) {
      return;
    }
    this.teacherDropOutRequestTeacherViewItems.forEach(t => t.checked = completed);
  }

  exportTeacherViewCSV() {
    let expItems = this.teacherDropOutRequestTeacherViewItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' اسم البرنامج ',
        'اسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'teacher', data, headerLabels);
  }

  enableTeacherViewDropOutRequestSelectOperations(): boolean {
    return this.teacherDropOutRequestTeacherViewItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someTeacherViewDropOutRequestItemsChecked(): boolean {
    if (this.teacherDropOutRequestTeacherViewItems == null) {
      return false;
    }
    return this.teacherDropOutRequestTeacherViewItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setTeacherViewDropOutRequestAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.teacherDropOutRequestTeacherViewItems == null) {
      return;
    }
    this.teacherDropOutRequestTeacherViewItems.forEach(t => t.checked = completed);
  }

  exportTeacherViewDropOutRequestCSV() {
    let expItems = this.teacherDropOutRequestTeacherViewItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' أسم البرنامج ',
        'أسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'Student', data, headerLabels);
  }

  //   cancelRequestOfTeacherEvent(teacherModel: ITeacherDropOutRequestModel) {
  //     this.cancelRequestOfTeacher.emit(teacherModel);
  //   }
  // updateAllItemsChecked() {
  //   this.allSelected = this.teacherDropOutRequestItems != null && this.teacherDropOutRequestItems.every(t => t.checked);
  // }
  // End Here
}


