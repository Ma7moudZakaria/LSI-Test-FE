import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { TeacheProgramSubscriptionStatusEnum } from 'src/app/core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { ExportationService } from 'src/app/core/services/exportation-services/exportation.service';

@Component({
  selector: 'app-admin-join-request-for-teacher-tab-and-student-tab-grid',
  templateUrl: './admin-join-request-for-teacher-tab-and-student-tab-grid.component.html',
  styleUrls: ['./admin-join-request-for-teacher-tab-and-student-tab-grid.component.scss']
})
export class AdminJoinRequestForTeacherTabAndStudentTabGridComponent implements OnInit {


  @Output() studentFilterEvent = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
  @Output() teacherFilterEvent = new EventEmitter<ITeacherProgramSubscriptionFilterRequestModel>();
  // IStudentSubscriptionFilterRequestModel
  @Input() userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;
  @Input() studentFilterRequestModel: IStudentSubscriptionFilterRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() teacherFilterRequestModel: ITeacherProgramSubscriptionFilterRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() numberPerRow: number = 3;
  @Input() teacherItems: ITeacherProgramSubscriptionModel[] = []
  @Input() studentItems: IStudentSubscriptionModel[] = []
  @Input() totalCount: number = 0;

  programSubscriptionUsers = ProgramSubscriptionUsersEnum;
  orderTypeToggel = 1;
  page = 1

  constructor(
    public translate: TranslateService,
    private exportationService: ExportationService
  ) { }

  ngOnInit(): void {
    this.sortTeacherRequestDate();
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

  onTeacherPageChange() {
    this.teacherFilterRequestModel.skip = (this.teacherFilterRequestModel.page - 1) * (this.teacherFilterRequestModel.take || 0);
    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
  }


  //================= student grid

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
