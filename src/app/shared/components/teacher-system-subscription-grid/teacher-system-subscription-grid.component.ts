import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { TeacherSystemSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum';
import { ITeacherSystemSubscriptionFilterRequest } from 'src/app/core/interfaces/teacher-interfaces/iteacher-system-subscription-filter-request';
import { ITeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/iteacher-systems-subscription';
import { ExportationService } from 'src/app/core/services/exportation-services/exportation.service';

@Component({
  selector: 'app-teacher-system-subscription-grid',
  templateUrl: './teacher-system-subscription-grid.component.html',
  styleUrls: ['./teacher-system-subscription-grid.component.scss']
})
export class TeacherSystemSubscriptionGridComponent implements OnInit {

  @Output() teacherSystemSubscriptionFilterEvent = new EventEmitter<ITeacherSystemSubscriptionFilterRequest>();
  @Output() itemTeacherSystemSubscriptionReq = new EventEmitter<ITeacherSystemSubscription>();
  @Output() rejectTeacherSystemSubscription = new EventEmitter<ITeacherSystemSubscription>();
  @Output() acceptTeacherSystemSubscription = new EventEmitter<ITeacherSystemSubscription>();
  @Output() acceptAllTeacherSystemSubscriptionCheched = new EventEmitter<ITeacherSystemSubscription>();
  
  @Input() teacherSystemSubscriptionFilterRequestModel: ITeacherSystemSubscriptionFilterRequest = { skip: 0, take: 9, page: 1 };
  @Input() numberPerRow: number = 3;
  @Input() teacherSystemSubscriptionItems: ITeacherSystemSubscription[] = []
  @Input() totalCount: number = 0;
  @Input() typeEnum: TeacherSystemSubscriptionStatusEnum = TeacherSystemSubscriptionStatusEnum.Pending;
  @Input() typeTeacheEnum: TeacherSystemSubscriptionStatusEnum = TeacherSystemSubscriptionStatusEnum.Pending;

  teacherTabTypeSelected = TeacherSystemSubscriptionStatusEnum;
  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  allSelected: boolean = false;
  teacherSystemSubscriptionUsers = TeacherSystemSubscriptionStatusEnum;
  page = 1

  constructor(
    public translate: TranslateService,
    private exportationService: ExportationService
  ) { }

  ngOnInit(): void {
  }

  sortTeacherByName() {
    this.teacherSystemSubscriptionFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
    this.teacherSystemSubscriptionFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherSystemSubscriptionFilterEvent.emit(this.teacherSystemSubscriptionFilterRequestModel);
  }

  sortTeacherByNameOrderType() {
    if ((this.teacherSystemSubscriptionFilterRequestModel.sortField === "teacherNameAr" || this.teacherSystemSubscriptionFilterRequestModel.sortField === "TeacherNameEn") && this.teacherSystemSubscriptionFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.teacherSystemSubscriptionFilterRequestModel.sortField === "teacherNameAr" || this.teacherSystemSubscriptionFilterRequestModel.sortField === "TeacherNameEn") && this.teacherSystemSubscriptionFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortTeacherRequestDate() {
    this.teacherSystemSubscriptionFilterRequestModel.sortField = 'requestdate';
    this.teacherSystemSubscriptionFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherSystemSubscriptionFilterEvent.emit(this.teacherSystemSubscriptionFilterRequestModel);
  }

  sortTeacherRequestDateOrderType() {
    if (this.teacherSystemSubscriptionFilterRequestModel.sortField === 'requestdate' && this.teacherSystemSubscriptionFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.teacherSystemSubscriptionFilterRequestModel.sortField === 'requestdate' && this.teacherSystemSubscriptionFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  enableTeacherSelectOperations(): boolean {
    return this.teacherSystemSubscriptionItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someTeachertItemsChecked(): boolean {
    if (this.teacherSystemSubscriptionItems == null) {
      return false;
    }
    return this.teacherSystemSubscriptionItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setTeacherAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.teacherSystemSubscriptionItems == null) {
      return;
    }
    this.teacherSystemSubscriptionItems.forEach(t => t.checked = completed);
  }

  exportTeacherCSV() {
    let expItems = this.teacherSystemSubscriptionItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' اسم البرنامج ',
        'اسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'teacher', data, headerLabels);
  }

  onTeacherPageChange() {
    this.teacherSystemSubscriptionFilterRequestModel.skip = (this.teacherSystemSubscriptionFilterRequestModel.page - 1) * (this.teacherSystemSubscriptionFilterRequestModel.take || 0);
    this.teacherSystemSubscriptionFilterEvent.emit(this.teacherSystemSubscriptionFilterRequestModel);
    this.setTeacherAllChecked(false);
  }

  sortTeacherSystemSubscriptionByNameOrderType() {
    if ((this.teacherSystemSubscriptionFilterRequestModel.sortField === "userNameAr" || this.teacherSystemSubscriptionFilterRequestModel.sortField === "UserNameEn") && this.teacherSystemSubscriptionFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.teacherSystemSubscriptionFilterRequestModel.sortField === "userNameAr" || this.teacherSystemSubscriptionFilterRequestModel.sortField === "UserNameEn") && this.teacherSystemSubscriptionFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortByTeacherSystemSubscriptionRequestDate() {
    this.teacherSystemSubscriptionFilterRequestModel.sortField = 'requestdate';
    this.teacherSystemSubscriptionFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherSystemSubscriptionFilterEvent.emit(this.teacherSystemSubscriptionFilterRequestModel);
  }

  sortByTeacherSystemSubscriptionRequestDateOrderType() {
    if (this.teacherSystemSubscriptionFilterRequestModel.sortField === 'requestdate' && this.teacherSystemSubscriptionFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.teacherSystemSubscriptionFilterRequestModel.sortField === 'requestdate' && this.teacherSystemSubscriptionFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  enableTeacherSystemSubscriptionSelectOperations(): boolean {
    return this.teacherSystemSubscriptionItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someTeacherSystemSubscriptionItemsChecked(): boolean {
    if (this.teacherSystemSubscriptionItems == null) {
      return false;
    }
    return this.teacherSystemSubscriptionItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setTeacherSystemSubscriptionAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.teacherSystemSubscriptionItems == null) {
      return;
    }
    this.teacherSystemSubscriptionItems.forEach(t => t.checked = completed);
  }

  exportTeacherSystemSubscriptionCSV() {
    let expItems = this.teacherSystemSubscriptionItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' أسم البرنامج ',
        'أسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'Student', data, headerLabels);
  }

  onTeacherSystemSubscriptionPageChange() {
    this.teacherSystemSubscriptionFilterRequestModel.skip = (this.teacherSystemSubscriptionFilterRequestModel.page - 1) * (this.teacherSystemSubscriptionFilterRequestModel.take);
    this.teacherSystemSubscriptionFilterEvent.emit(this.teacherSystemSubscriptionFilterRequestModel);
    this.setTeacherSystemSubscriptionAllChecked(false);
  }

  acceptAllTeacherSystemSubscriptionChechedEvent() {
    this.acceptAllTeacherSystemSubscriptionCheched.emit()
  }

  rejectTeacherSystemSubscriptionEvent(teacherSubscripModel: ITeacherSystemSubscription) {
    this.itemTeacherSystemSubscriptionReq.emit(teacherSubscripModel);
  }

  acceptTeacherSystemSubscriptionEvent(teacherSubscripModel: ITeacherSystemSubscription) {
    this.acceptTeacherSystemSubscription.emit(teacherSubscripModel);
  }
}
