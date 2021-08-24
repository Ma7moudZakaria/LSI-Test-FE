import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { ITeacherDropOutRequestAdvFilterAdminViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-admin-view-request-model';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-teacher-view-request-model';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import { ITeacherDropOutRequestTeacherViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-teacher-view-model';
import { ExportationService } from 'src/app/core/services/exportation-services/exportation.service';
import {ITeacherStudentViewModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-teacher-drop-out-request-admin-grid',
  templateUrl: './teacher-drop-out-request-admin-grid.component.html',
  styleUrls: ['./teacher-drop-out-request-admin-grid.component.scss']
})
export class TeacherDropOutRequestAdminGridComponent implements OnInit {

  @Output() teacherDropOutRequestFilterEvent = new EventEmitter<ITeacherDropOutRequestAdvFilterAdminViewRequestModel>();
  @Output() itemTeacherDropOutRequestForReject = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() rejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() acceptTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() cancelRequestOfTeacher = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() userIdInput = new EventEmitter<ITeacherStudentViewModel>();

  @Output() acceptAllTeacherDropOutRequestChecked = new EventEmitter<ITeacherDropOutRequestModel>();
  
  @Input() teacherDropOutRequestFilterRequestModel: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() numberPerRow: number = 3;
  @Input() teacherDropOutRequestItems: ITeacherDropOutRequestModel[] = []

  @Input() teacherDropOutRequestFilterRequestTeacherViewModel: ITeacherDropOutRequestAdvFilterTeacherViewRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() teacherDropOutRequestTeacherViewItems: ITeacherDropOutRequestTeacherViewModel[] = [];

  @Input() totalCount: number = 0;
  @Input() typeEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  @Input() typeDropOutRequestEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;

  @Input() userMode: DropOutRoleEnum | undefined ;
  userRoleMode = DropOutRoleEnum;



  teacherTabTypeSelected = TeacherDropOutRequestStatusEnum;
  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  allSelected: boolean = false;
  teacherDropOutRequestStatus = TeacherDropOutRequestStatusEnum;
  page = 1

  constructor(
    public translate: TranslateService,
    private exportationService: ExportationService
  ) { }

  ngOnInit(): void {
    console.log("typeEnum : " , this.typeEnum)
  }
  userId(event: ITeacherStudentViewModel){
    this.userIdInput.emit(event);
  }
  sortTeacherByName() {
    this.teacherDropOutRequestFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'teacherNameAr' : 'TeacherNameAr';
    this.teacherDropOutRequestFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherDropOutRequestFilterEvent.emit(this.teacherDropOutRequestFilterRequestModel);
  }

  sortTeacherByNameOrderType() {
    if ((this.teacherDropOutRequestFilterRequestModel.sortField === "teacherNameAr" || this.teacherDropOutRequestFilterRequestModel.sortField === "TeacherNameEn") && this.teacherDropOutRequestFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.teacherDropOutRequestFilterRequestModel.sortField === "teacherNameAr" || this.teacherDropOutRequestFilterRequestModel.sortField === "TeacherNameEn") && this.teacherDropOutRequestFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortTeacherRequestDate() {
    this.teacherDropOutRequestFilterRequestModel.sortField = 'requestdate';
    this.teacherDropOutRequestFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherDropOutRequestFilterEvent.emit(this.teacherDropOutRequestFilterRequestModel);
  }

  sortTeacherRequestDateOrderType() {
    if (this.teacherDropOutRequestFilterRequestModel.sortField === 'requestdate' && this.teacherDropOutRequestFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.teacherDropOutRequestFilterRequestModel.sortField === 'requestdate' && this.teacherDropOutRequestFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  onTeacherPageChange() {
    this.teacherDropOutRequestFilterRequestModel.skip = (this.teacherDropOutRequestFilterRequestModel.page - 1) * (this.teacherDropOutRequestFilterRequestModel.take || 0);
    this.teacherDropOutRequestFilterEvent.emit(this.teacherDropOutRequestFilterRequestModel);
    this.setTeacherAllChecked(false);
  }

 sortTeacherDropOutRequestByNameOrderType() {
    if ((this.teacherDropOutRequestFilterRequestModel.sortField === "teacherNameAr" || this.teacherDropOutRequestFilterRequestModel.sortField === "TeacherNameEn") && this.teacherDropOutRequestFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.teacherDropOutRequestFilterRequestModel.sortField === "teacherNameAr" || this.teacherDropOutRequestFilterRequestModel.sortField === "TeacherNameEn") && this.teacherDropOutRequestFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortByTeacherDropOutRequestRequestDate() {
    this.teacherDropOutRequestFilterRequestModel.sortField = 'requestdate';
    this.teacherDropOutRequestFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherDropOutRequestFilterEvent.emit(this.teacherDropOutRequestFilterRequestModel);
  }

  sortByTeacherDropOutRequestDateOrderType() {
    if (this.teacherDropOutRequestFilterRequestModel.sortField === 'requestdate' && this.teacherDropOutRequestFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.teacherDropOutRequestFilterRequestModel.sortField === 'requestdate' && this.teacherDropOutRequestFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortBatchByName() {
    this.teacherDropOutRequestFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'batchNameAr' : 'BatchNameAr';
    this.teacherDropOutRequestFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherDropOutRequestFilterEvent.emit(this.teacherDropOutRequestFilterRequestModel);
  }


  sortBatchOrderType() {
    if ((this.teacherDropOutRequestFilterRequestModel.sortField === "batchNameAr" || this.teacherDropOutRequestFilterRequestModel.sortField === "BatchNameEn") && this.teacherDropOutRequestFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.teacherDropOutRequestFilterRequestModel.sortField === "batchNameAr" || this.teacherDropOutRequestFilterRequestModel.sortField === "BatchNameEn") && this.teacherDropOutRequestFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortBatchByNameOrderType() {
    if ((this.teacherDropOutRequestFilterRequestModel.sortField === "batchNameAr" || this.teacherDropOutRequestFilterRequestModel.sortField === "BatchNameEn") && this.teacherDropOutRequestFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.teacherDropOutRequestFilterRequestModel.sortField === "batchNameAr" || this.teacherDropOutRequestFilterRequestModel.sortField === "BatchNameEn") && this.teacherDropOutRequestFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  enableTeacherSelectOperations(): boolean {
    return this.teacherDropOutRequestItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someTeachertItemsChecked(): boolean {
    if (this.teacherDropOutRequestItems == null) {
      return false;
    }
    return this.teacherDropOutRequestItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setTeacherAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.teacherDropOutRequestItems == null) {
      return;
    }
    this.teacherDropOutRequestItems.forEach(t => t.checked = completed);
  }

  exportTeacherCSV() {
    let expItems = this.teacherDropOutRequestItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' اسم البرنامج ',
        'اسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'teacher', data, headerLabels);
  }

  enableTeacherDropOutRequestSelectOperations(): boolean {
    return this.teacherDropOutRequestItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someTeacherDropOutRequestItemsChecked(): boolean {
    if (this.teacherDropOutRequestItems == null) {
      return false;
    }
    return this.teacherDropOutRequestItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setTeacherDropOutRequestAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.teacherDropOutRequestItems == null) {
      return;
    }
    this.teacherDropOutRequestItems.forEach(t => t.checked = completed);
  }

  exportTeacherDropOutRequestCSV() {
    let expItems = this.teacherDropOutRequestItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' أسم البرنامج ',
        'أسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'Student', data, headerLabels);
  }

  onTeacherDropOutRequestPageChange() {
    this.teacherDropOutRequestFilterRequestModel.skip = (this.teacherDropOutRequestFilterRequestModel.page - 1) * (this.teacherDropOutRequestFilterRequestModel.take);
    this.teacherDropOutRequestFilterEvent.emit(this.teacherDropOutRequestFilterRequestModel);
    this.setTeacherDropOutRequestAllChecked(false);
  }

  acceptAllTeacherDropOutRequestCheckedEvent() {
    this.acceptAllTeacherDropOutRequestChecked.emit()
  }

  rejectTeacherDropOutRequestEvent(teacherSubscripModel: ITeacherDropOutRequestModel) {
    this.itemTeacherDropOutRequestForReject.emit(teacherSubscripModel);
  }

  acceptTeacherDropOutRequestEvent(teacherSubscripModel: ITeacherDropOutRequestModel) {
    this.acceptTeacherDropOutRequest.emit(teacherSubscripModel);
  }
  
  selectUserMode(){
    
  }
  




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

    cancelRequestOfTeacherEvent(teacherModel: ITeacherDropOutRequestModel) {
      this.cancelRequestOfTeacher.emit(teacherModel);
    }
  
    // End Here
}
