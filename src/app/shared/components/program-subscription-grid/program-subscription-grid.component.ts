import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { ExportationService } from 'src/app/core/services/exportation-services/exportation.service';

@Component({
  selector: 'app-program-subscription-grid',
  templateUrl: './program-subscription-grid.component.html',
  styleUrls: ['./program-subscription-grid.component.scss']
})
export class ProgramSubscriptionGridComponent implements OnInit {

  @Output() studentFilterEvent = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
  @Output() teacherFilterEvent = new EventEmitter<ITeacherProgramSubscriptionFilterRequestModel>();
  @Output() deleteListOfStudent = new EventEmitter<string>();
  @Output() deleteListOfteacher = new EventEmitter<string>();
  @Output() itemStuReq = new EventEmitter<IStudentSubscriptionModel>();
  @Output() rejectTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();
  @Output()  acceptTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();
  @Output()  acceptAllTeacherProgramSubscriptionCheched = new EventEmitter<ITeacherProgramSubscriptionModel>();

  @Input() userMode: ProgramSubscriptionUsersEnum=ProgramSubscriptionUsersEnum.student ;
  @Input() studentFilterRequestModel: IStudentSubscriptionFilterRequestModel = {skip : 0, take : 12, page :1};
  @Input() teacherFilterRequestModel: ITeacherProgramSubscriptionFilterRequestModel = {skip : 0, take : 12, page :1};
  @Input() numberPerRow: number = 3;
  @Input() teacherItems: ITeacherProgramSubscriptionModel[] = []
  @Input() studentItems: IStudentSubscriptionModel[] = []
  @Input() totalCount: number = 0;

  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  allSelected: boolean = false;
  programSubscriptionUsers = ProgramSubscriptionUsersEnum;
  page = 1

  constructor(
    public translate: TranslateService,
    private exportationService: ExportationService
  ) { }

  ngOnInit(): void {
  }

  sortTeacherByName() {
    this.teacherFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
    this.teacherFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
  }

  sortTeacherByNameOrderType() {
    if ((this.teacherFilterRequestModel.sortField === "userNameAr" || this.teacherFilterRequestModel.sortField === "UserNameEn") && this.teacherFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.teacherFilterRequestModel.sortField === "userNameAr" || this.teacherFilterRequestModel.sortField === "UserNameEn") && this.teacherFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortTeacherRequestDate() {
    this.teacherFilterRequestModel.sortField = 'requestdate';
    this.teacherFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
  }

  sortTeacherRequestDateOrderType() {
    if (this.teacherFilterRequestModel.sortField === 'requestdate' && this.teacherFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.teacherFilterRequestModel.sortField === 'requestdate' && this.teacherFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  enableTeacherSelectOperations(): boolean {
    return this.teacherItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someTeachertItemsChecked(): boolean {
    if (this.teacherItems == null) {
      return false;
    }
    return this.teacherItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setTeacherAllChecked(completed: boolean) {
    console.log(this.userMode);
    this.allSelected = completed;
    if (this.teacherItems == null) {
      return;
    }
    this.teacherItems.forEach(t => t.checked = completed);
  }

  exportTeacherCSV() {
    let expItems = this.teacherItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      ['prog Name', 'User name'] :
      [' أسم البرنامج ',
        'أسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'teacher', data, headerLabels);
  }

  deleteTeacherByIds() {
    this.deleteListOfteacher.emit();
  }

  onTeacherPageChange() {
    this.teacherFilterRequestModel.skip = (this.teacherFilterRequestModel.page - 1) * (this.teacherFilterRequestModel.take || 0);
    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
    this.setTeacherAllChecked(false);
  }

  rejectTeacherProgramSubscriptionEve(teacherSubscripModel:ITeacherProgramSubscriptionModel){
    this.rejectTeacherProgramSubscription.emit(teacherSubscripModel);
  }
  acceptTeacherProgramSubscriptionEvent(teacherSubscripModel:ITeacherProgramSubscriptionModel){
    this.acceptTeacherProgramSubscription.emit(teacherSubscripModel);
  }

  acceptAllTeacherProgramSubscriptionChechedEvent(){
    this.acceptAllTeacherProgramSubscriptionCheched.emit();
  }
//=================
  sortStudentByName(){
    this.studentFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
    this.studentFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentFilterEvent.emit(this.studentFilterRequestModel);
  }

  sortStudentByNameOrderType() {
    if ((this.studentFilterRequestModel.sortField === "userNameAr" || this.studentFilterRequestModel.sortField === "UserNameEn") && this.studentFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.studentFilterRequestModel.sortField === "userNameAr" || this.studentFilterRequestModel.sortField === "UserNameEn") && this.studentFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortByStudentRequestDate() {
    this.studentFilterRequestModel.sortField = 'requestdate';
    this.studentFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentFilterEvent.emit(this.studentFilterRequestModel);
  }

  sortByStudentRequestDateOrderType() {
    if (this.studentFilterRequestModel.sortField === 'requestdate' && this.studentFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.studentFilterRequestModel.sortField === 'requestdate' && this.studentFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  enableStudentSelectOperations(): boolean {
    return this.studentItems.filter(t => t.checked).length > 0 || this.allSelected;
  }

  someStudentItemsChecked(): boolean {
    console.log(this.userMode);
    if (this.studentItems == null) {
      return false;
    }
    return this.studentItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setStudentAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.studentItems == null) {
      return;
    }
    this.studentItems.forEach(t => t.checked = completed);
    console.log(this.userMode);
  }

  exportStudentCSV() {
    let expItems = this.studentItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      ['prog Name', 'User name'] :
      [' أسم البرنامج ',
        'أسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'Student', data, headerLabels);
  }

  deleteStudentByIds() {
    this.deleteListOfStudent.emit();
  }

  onStudentPageChange() {
    this.studentFilterRequestModel.skip = (this.teacherFilterRequestModel.page - 1) * (this.teacherFilterRequestModel.take || 0);
    this.studentFilterEvent.emit(this.studentFilterRequestModel);
    this.setTeacherAllChecked(false);
  }

  rejecteStuRequest(event: IStudentSubscriptionModel) {
    this.itemStuReq.emit(event)

  }
}
