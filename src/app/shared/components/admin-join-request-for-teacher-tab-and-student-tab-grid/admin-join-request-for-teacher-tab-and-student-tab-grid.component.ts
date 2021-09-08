import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { TeacheProgramSubscriptionStatusEnum } from 'src/app/core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { ExportationService } from 'src/app/core/services/exportation-services/exportation.service';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-admin-join-request-for-teacher-tab-and-student-tab-grid',
  templateUrl: './admin-join-request-for-teacher-tab-and-student-tab-grid.component.html',
  styleUrls: ['./admin-join-request-for-teacher-tab-and-student-tab-grid.component.scss']
})
export class AdminJoinRequestForTeacherTabAndStudentTabGridComponent implements OnInit {


  @Output() studentFilterEvent = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
  @Output() teacherFilterEvent = new EventEmitter<ITeacherProgramSubscriptionFilterRequestModel>();
  // @Output() deleteListOfStudent = new EventEmitter<string>();
  // @Output() deleteListOfteacher = new EventEmitter<string>();
  @Output() itemStuReq = new EventEmitter<IStudentSubscriptionModel>();

  // @Output() acceptStuReq = new EventEmitter<IStudentSubscriptionModel>();
  // @Output() acceptAllStudentProgramSubscriptionCheched = new EventEmitter<IStudentSubscriptionModel>();

  // @Output() rejectTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();
  // @Output() acceptTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();
  // @Output() acceptAllTeacherProgramSubscriptionCheched = new EventEmitter<ITeacherProgramSubscriptionModel>();
  // @Output() teacherIdFormGrid = new EventEmitter<ITeacherStudentViewModel>();
  // @Output() studentIdFormGrid = new EventEmitter<ITeacherStudentViewModel>();
  // IStudentSubscriptionFilterRequestModel
  @Input() userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;
  @Input() studentFilterRequestModel: IStudentSubscriptionFilterRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() teacherFilterRequestModel: ITeacherProgramSubscriptionFilterRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() numberPerRow: number = 3;
  @Input() teacherItems: ITeacherProgramSubscriptionModel[] = []
  @Input() studentItems: IStudentSubscriptionModel[] = []
  @Input() totalCount: number = 0;
  @Input() typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;
  @Input() typeTeacheEnum: TeacheProgramSubscriptionStatusEnum = TeacheProgramSubscriptionStatusEnum.Pending;
  stuTabTypeSelected = StudentProgramSubscriptionStatusEnum;
  teacherTabTypeSelected = TeacheProgramSubscriptionStatusEnum;

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
    this.sortTeacherRequestDate();
  }
  // teacherProgSubOutputEvent(event: ITeacherStudentViewModel) {
  //   this.teacherIdFormGrid.emit(event);
  // }
  // studentProgSubOutputEvent(event: ITeacherStudentViewModel) {
  //   this.studentIdFormGrid.emit(event);
  // }
  // sortTeacherByName() {
  //   this.teacherFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
  //   this.teacherFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
  //   this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
  // }

  // sortTeacherByNameOrderType() {
  //   if ((this.teacherFilterRequestModel.sortField === "userNameAr" || this.teacherFilterRequestModel.sortField === "UserNameEn") && this.teacherFilterRequestModel.sortOrder == 1) { return 'asend' }
  //   if ((this.teacherFilterRequestModel.sortField === "userNameAr" || this.teacherFilterRequestModel.sortField === "UserNameEn") && this.teacherFilterRequestModel.sortOrder == -1) { return 'desend' }

  //   return '';
  // }

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

  // enableTeacherSelectOperations(): boolean {
  //   return this.teacherItems.filter(t => t.checked).length > 0 || this.allSelected;
  // }

  // someTeachertItemsChecked(): boolean {
  //   if (this.teacherItems == null) {
  //     return false;
  //   }
  //   return this.teacherItems.filter(t => t.checked).length > 0 && !this.allSelected;
  // }

  // setTeacherAllChecked(completed: boolean) {
  //   console.log(this.userMode);
  //   this.allSelected = completed;
  //   if (this.teacherItems == null) {
  //     return;
  //   }
  //   this.teacherItems.forEach(t => t.checked = completed);
  // }

  // exportTeacherCSV() {
  //   let expItems = this.teacherItems.filter(a => a.checked);
  //   let headerLabels = this.translate.currentLang == 'en-US' ?
  //     [' program name', 'User name'] :
  //     [' اسم البرنامج ',
  //       'اسم المعلم'];

  //   let data = ['progName', 'teacherNameAr'];
  //   this.exportationService.exportCSV(expItems, 'teacher', data, headerLabels);
  // }

  exportTeacherCSV() {
    // let expItems = this.teacherItems.filter(a => a.checked);
    let expItems = this.teacherItems;

    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'Teacher name', 'request date ', 'request status'] :
      [
        'أسم البرنامج',
        'أسم المعلم',
        ' تاريخ الطلب ',
        'حاله الطلب'
      ]

    let data = ['progName', 'usrNameAr', 'requestDate', 'programStaNum'];
    this.exportationService.exportCSV(expItems, 'Hoffaz-Teacher join requests ', data, headerLabels);
  }
  // deleteTeacherByIds() {
  //   this.deleteListOfteacher.emit();
  // }

  onTeacherPageChange() {
    this.teacherFilterRequestModel.skip = (this.teacherFilterRequestModel.page - 1) * (this.teacherFilterRequestModel.take || 0);
    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
    // this.setTeacherAllChecked(false);
  }

  // rejectTeacherProgramSubscriptionEve(teacherSubscripModel: ITeacherProgramSubscriptionModel) {
  //   this.rejectTeacherProgramSubscription.emit(teacherSubscripModel);
  // }
  // acceptTeacherProgramSubscriptionEvent(teacherSubscripModel: ITeacherProgramSubscriptionModel) {
  //   this.acceptTeacherProgramSubscription.emit(teacherSubscripModel);
  // }

  // acceptAllTeacherProgramSubscriptionChechedEvent() {
  //   this.acceptAllTeacherProgramSubscriptionCheched.emit();
  // }
  //================= student grid
  sortStudentByName() {
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




  exportStudentCSV() {
    // let expItems = this.studentItems.filter(a => a.checked);
    let expItems = this.studentItems;

    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'Student name', 'request date ', 'request status'] :
      ['أسم الطالب',
        'أسم البرنامج'
        , ' تاريخ الطلب ',
        'حاله الطلب']

    let data = ['progName', 'usrNameAr', 'requestDate', 'programStaNum'];
    this.exportationService.exportCSV(expItems, 'Hoffaz-Student program subscription requests ', data, headerLabels);
  }


  onStudentPageChange() {
    this.studentFilterRequestModel.skip = (this.studentFilterRequestModel.page - 1) * (this.studentFilterRequestModel.take);
    this.studentFilterEvent.emit(this.studentFilterRequestModel);
  }



}
