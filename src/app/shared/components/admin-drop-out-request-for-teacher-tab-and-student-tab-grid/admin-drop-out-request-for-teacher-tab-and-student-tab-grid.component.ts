import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramSubscriptionUsersEnum } from '../../../core/enums/program-subscription-users-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { IStudentDropOutRequestsFilterStudentViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-request-model';
import { IStudentDropOutRequestsFilterStudentViewResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-response-model';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { ExportationService } from 'src/app/core/services/exportation-services/exportation.service';
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


  @Input() userMode: ProgramSubscriptionUsersEnum | undefined;
  userRoleMode = ProgramSubscriptionUsersEnum;
  teacherCard: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;
  @Output() studentDropOutRequestFilterStudentEvent = new EventEmitter<IStudentDropOutRequestsFilterStudentViewRequestModel>();
  @Output() itemStudentDropOutRequestForStudentReject = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Input() studentDropOutRequestFilterRequestStudentModel: IStudentDropOutRequestsFilterStudentViewRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() studentDropOutRequestStudentItems: IStudentDropOutRequestsFilterStudentViewResponseModel[] = [];
  @Input() numberPerRow: number = 3;
  @Input() totalCount: number = 0;
  @Input() typeEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  @Input() typeDropOutRequestEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;


  orderTypeToggel = 1;
  page = 1

  // ---------------------------- teacher 
  @Output() teacherDropOutRequestFilterEvent = new EventEmitter<ITeacherDropOutRequestAdvFilterAdminViewRequestModel>();
  @Input() teacherDropOutRequestFilterRequestModel: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() teacherDropOutRequestItems: ITeacherDropOutRequestModel[] = []
  @Input() teacherDropOutRequestFilterRequestTeacherViewModel: ITeacherDropOutRequestAdvFilterTeacherViewRequestModel = { skip: 0, take: 9, page: 1 };
  @Input() teacherDropOutRequestTeacherViewItems: ITeacherDropOutRequestTeacherViewModel[] = [];
  teacherTabTypeSelected = TeacherDropOutRequestStatusEnum;
  teacherDropOutRequestStatus = TeacherDropOutRequestStatusEnum;



  constructor(
    public translate: TranslateService,
    private exportationService: ExportationService
  ) { }

  ngOnInit(): void {
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
    // this.setStudentAllChecked(false);
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

  exportStudentCSV() {
    let expItems = this.studentDropOutRequestStudentItems
    // let expItems = this.studentDropOutRequestStudentItems.filter(a => a.checked);

    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' اسم البرنامج ',
        'اسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'student', data, headerLabels);
  }


  onStudentDropOutRequestPageChange() {
    this.studentDropOutRequestFilterRequestStudentModel.skip = (this.studentDropOutRequestFilterRequestStudentModel.page - 1) * (this.studentDropOutRequestFilterRequestStudentModel.take);
    this.studentDropOutRequestFilterStudentEvent.emit(this.studentDropOutRequestFilterRequestStudentModel);
  }


  // End Here

  //teacher view


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
  exportTeacherViewDropOutRequestCSV() {
    let expItems = this.teacherDropOutRequestTeacherViewItems

    // let expItems = this.teacherDropOutRequestTeacherViewItems.filter(a => a.checked);
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'User name'] :
      [' أسم البرنامج ',
        'أسم المستخدم'];

    let data = ['progName', 'usrNameAr'];
    this.exportationService.exportCSV(expItems, 'Student', data, headerLabels);
  }
  onTeacherPageChange() {
    this.teacherDropOutRequestFilterRequestModel.skip = (this.teacherDropOutRequestFilterRequestModel.page - 1) * (this.studentDropOutRequestFilterRequestStudentModel.take);
    this.teacherDropOutRequestFilterEvent.emit(this.teacherDropOutRequestFilterRequestModel);

  }
}


