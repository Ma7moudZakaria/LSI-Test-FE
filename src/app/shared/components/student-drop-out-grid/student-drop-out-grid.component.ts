import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStudentDropOutRequestsFilterAdminViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-admin-view-request-model';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { IStudentDropOutRequestsFilterStudentViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-request-model';
import { IStudentDropOutRequestsFilterStudentViewResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-response-model';
import { ExportationService } from 'src/app/core/services/exportation-services/exportation.service';

@Component({
  selector: 'app-student-drop-out-grid',
  templateUrl: './student-drop-out-grid.component.html',
  styleUrls: ['./student-drop-out-grid.component.scss']
})
export class StudentDropOutGridComponent implements OnInit {

  @Output() studentDropOutRequestFilterAdminEvent = new EventEmitter<IStudentDropOutRequestsFilterAdminViewRequestModel>();
  @Output() itemStudentDropOutRequestForAdminReject = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  @Output() rejectStudentDropOutAdminRequest = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  @Output() acceptStudentDropOutAdminRequest = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  @Output() acceptAllStudentDropOutRequestAdminChecked = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  @Output() studentIdToDetails = new EventEmitter<string>();

  @Input() studentDropOutRequestFilterRequestAdminModel: IStudentDropOutRequestsFilterAdminViewRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() studentDropOutRequestAdminItems: IStudentDropOutRequestsFilterResponseModel[] = []


  @Output() studentDropOutRequestFilterStudentEvent = new EventEmitter<IStudentDropOutRequestsFilterStudentViewRequestModel>();
  @Output() itemStudentDropOutRequestForStudentReject = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Output() rejectStudentDropOutStudentRequest = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Output() acceptStudentDropOutStudentRequest = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Output() cancelRequestOfStudent = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  @Output() acceptAllStudentDropOutRequestStudentChecked = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Input() studentDropOutRequestFilterRequestStudentModel: IStudentDropOutRequestsFilterStudentViewRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() studentDropOutRequestStudentItems: IStudentDropOutRequestsFilterStudentViewResponseModel[] = [];
  

  @Input() numberPerRow: number = 3;
  @Input() totalCount: number = 0;
  @Input() typeEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  @Input() typeDropOutRequestEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;

  @Input() userMode: DropOutRoleEnum | undefined ;
  userRoleMode = DropOutRoleEnum;
  


  studentTabTypeSelected = StudentDropOutRequestStatusEnum;
  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  allSelected: boolean = false;
  studentDropOutRequestStatus = StudentDropOutRequestStatusEnum;
  page = 1

  constructor(
    public translate: TranslateService,
    private exportationService: ExportationService
  ) { }

  ngOnInit(): void {
    console.log("this.userMode", this.userMode)
  }
  studentIdToRequest(event:string){
    this.studentIdToDetails.emit(event);
  }

  sortStudentAdminByName() {
    this.studentDropOutRequestFilterRequestAdminModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'teacherNameAr' : 'TeacherNameAr';
    this.studentDropOutRequestFilterRequestAdminModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentDropOutRequestFilterAdminEvent.emit(this.studentDropOutRequestFilterRequestAdminModel);
  }

  sortStudentAdminNameOrderType() {
    if ((this.studentDropOutRequestFilterRequestAdminModel.sortField === "studentNameAr" || this.studentDropOutRequestFilterRequestAdminModel.sortField === "StudentNameEn") && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == 1) { return 'asend' }
    if ((this.studentDropOutRequestFilterRequestAdminModel.sortField === "studentNameAr" || this.studentDropOutRequestFilterRequestAdminModel.sortField === "StudentNameEn") && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortStudentAdminRequestDate() {
    this.studentDropOutRequestFilterRequestAdminModel.sortField = 'requestdate';
    this.studentDropOutRequestFilterRequestAdminModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentDropOutRequestFilterAdminEvent.emit(this.studentDropOutRequestFilterRequestAdminModel);
  }

  sortStudentAdminRequestDateOrderType() {
    if (this.studentDropOutRequestFilterRequestAdminModel.sortField === 'requestdate' && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == 1) { return 'asend' }
    if (this.studentDropOutRequestFilterRequestAdminModel.sortField === 'requestdate' && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  onStudentAdminPageChange() {
    this.studentDropOutRequestFilterRequestAdminModel.skip = (this.studentDropOutRequestFilterRequestAdminModel.page - 1) * (this.studentDropOutRequestFilterRequestAdminModel.take || 0);
    this.studentDropOutRequestFilterAdminEvent.emit(this.studentDropOutRequestFilterRequestAdminModel);
    this.setStudentAdminAllChecked(false);
  }

  sortStudentAdminDropOutRequestByNameOrderType() {
      if ((this.studentDropOutRequestFilterRequestAdminModel.sortField === "studentNameAr" || this.studentDropOutRequestFilterRequestAdminModel.sortField === "StudentNameEn") && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == 1) { return 'asend' }
      if ((this.studentDropOutRequestFilterRequestAdminModel.sortField === "studentNameAr" || this.studentDropOutRequestFilterRequestAdminModel.sortField === "StudentNameEn") && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == -1) { return 'desend' }

      return '';
  }

  sortByStudentAdminDropOutRequestRequestDate() {
    this.studentDropOutRequestFilterRequestAdminModel.sortField = 'requestdate';
    this.studentDropOutRequestFilterRequestAdminModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentDropOutRequestFilterAdminEvent.emit(this.studentDropOutRequestFilterRequestAdminModel);
  }

  sortByStudentAdminDropOutRequestDateOrderType() {
    if (this.studentDropOutRequestFilterRequestAdminModel.sortField === 'requestdate' && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == 1) { return 'asend' }
    if (this.studentDropOutRequestFilterRequestAdminModel.sortField === 'requestdate' && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortStudentAdminBatchByName() {
    this.studentDropOutRequestFilterRequestAdminModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'batchNameAr' : 'BatchNameAr';
    this.studentDropOutRequestFilterRequestAdminModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentDropOutRequestFilterAdminEvent.emit(this.studentDropOutRequestFilterRequestAdminModel);
  }


  sortStudentAdminBatchOrderType() {
    if ((this.studentDropOutRequestFilterRequestAdminModel.sortField === "batchNameAr" || this.studentDropOutRequestFilterRequestAdminModel.sortField === "BatchNameEn") && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == 1) { return 'asend' }
    if ((this.studentDropOutRequestFilterRequestAdminModel.sortField === "batchNameAr" || this.studentDropOutRequestFilterRequestAdminModel.sortField === "BatchNameEn") && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortStudentAdminBatchByNameOrderType() {
    if ((this.studentDropOutRequestFilterRequestAdminModel.sortField === "batchNameAr" || this.studentDropOutRequestFilterRequestAdminModel.sortField === "BatchNameEn") && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == 1) { return 'asend' }
    if ((this.studentDropOutRequestFilterRequestAdminModel.sortField === "batchNameAr" || this.studentDropOutRequestFilterRequestAdminModel.sortField === "BatchNameEn") && this.studentDropOutRequestFilterRequestAdminModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  enableStudentAdminSelectOperations(): boolean {
    return this.studentDropOutRequestAdminItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someStudentAdmintItemsChecked(): boolean {
    if (this.studentDropOutRequestAdminItems == null) {
      return false;
    }
    return this.studentDropOutRequestAdminItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setStudentAdminAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.studentDropOutRequestAdminItems == null) {
      return;
    }
    this.studentDropOutRequestAdminItems.forEach(t => t.checked = completed);
  }

  exportStudentAdminCSV() {
    let expItems = this.studentDropOutRequestAdminItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' اسم البرنامج ',
        'اسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'student', data, headerLabels);
  }

  enableStudentAdminDropOutRequestSelectOperations(): boolean {
    return this.studentDropOutRequestAdminItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someStudentAdminDropOutRequestItemsChecked(): boolean {
    if (this.studentDropOutRequestAdminItems == null) {
      return false;
    }
    return this.studentDropOutRequestAdminItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setStudentAdminDropOutRequestAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.studentDropOutRequestAdminItems == null) {
      return;
    }
    this.studentDropOutRequestAdminItems.forEach(t => t.checked = completed);
  }

  exportStudentAdminDropOutRequestCSV() {
    let expItems = this.studentDropOutRequestAdminItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' أسم البرنامج ',
        'أسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'Student', data, headerLabels);
  }

  onStudentAdminDropOutRequestPageChange() {
    this.studentDropOutRequestFilterRequestAdminModel.skip = (this.studentDropOutRequestFilterRequestAdminModel.page - 1) * (this.studentDropOutRequestFilterRequestAdminModel.take);
    this.studentDropOutRequestFilterAdminEvent.emit(this.studentDropOutRequestFilterRequestAdminModel);
    this.setStudentAdminDropOutRequestAllChecked(false);
  }

  acceptAllStudentAdminDropOutRequestCheckedEvent() {
    this.acceptAllStudentDropOutRequestStudentChecked.emit()
  }

  rejectStudentAdminDropOutRequestEvent(studentAdminModel: IStudentDropOutRequestsFilterResponseModel) {
    this.itemStudentDropOutRequestForAdminReject.emit(studentAdminModel);
  }

  acceptStudentAdminDropOutRequestEvent(studentAdminModel: IStudentDropOutRequestsFilterResponseModel) {
    this.acceptStudentDropOutAdminRequest.emit(studentAdminModel);
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

  acceptAllStudentDropOutRequestCheckedEvent() {
    this.acceptAllStudentDropOutRequestStudentChecked.emit()
  }

  rejectStudentDropOutRequestEvent(studentModel: IStudentDropOutRequestsFilterStudentViewResponseModel) {
    this.itemStudentDropOutRequestForStudentReject.emit(studentModel);
  }

  acceptStudentDropOutRequestEvent(studentModel: IStudentDropOutRequestsFilterStudentViewResponseModel) {
    this.acceptStudentDropOutStudentRequest.emit(studentModel);
  }

  cancelRequestOfStudentEvent(studentModel: IStudentDropOutRequestsFilterResponseModel) {
    this.cancelRequestOfStudent.emit(studentModel);
  }
  
  // End Here

}
