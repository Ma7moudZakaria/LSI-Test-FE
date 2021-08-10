import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudentSubscriptionFilterRequestModel } from '../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from '../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { ProgramSubscriptionUsersEnum } from '../../../core/enums/program-subscription-users-enum.enum';
import { StudentProgramSubscriptionStatusEnum } from '../../../core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { TeacheProgramSubscriptionStatusEnum } from '../../../core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { ExportationService } from '../../../core/services/exportation-services/exportation.service';
import { IProgramsForTeachersSubscriptionsFilterRequestModel } from '../../../core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teachers-subscriptions-filter-request-model';
import { IProgramsForTeacherSubscriptionsModel } from '../../../core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { IProgramsForStudentsSubscriptionsFilterRequestModel } from '../../../core/interfaces/student-program-subscription-interfaces/iprograms-for-students-subscriptions-filter-request-model';
import { IProgramsForStudentSubscriptionsModel } from '../../../core/interfaces/student-program-subscription-interfaces/iprograms-for-student-subscriptions-model';

@Component({
  selector: 'app-teacher-stu-program-for-subscription-grid',
  templateUrl: './teacher-stu-program-for-subscription-grid.component.html',
  styleUrls: ['./teacher-stu-program-for-subscription-grid.component.scss']
})
export class TeacherStuProgramForSubscriptionGridComponent implements OnInit {


  //output for teacher
  @Output() teacherFilterEvent = new EventEmitter<IProgramsForStudentsSubscriptionsFilterRequestModel>();
  @Input() teacherFilterRequestModel: IProgramsForStudentsSubscriptionsFilterRequestModel =
    { skip: 0, take: 9, page: 1 };
  @Input() numberPerRow: number = 3;
  @Input() teacherItems: IProgramsForTeacherSubscriptionsModel[] | undefined;
  @Input() totalCount: number = 0;

  //output for student
  @Output() studentFilterEvent = new EventEmitter<IProgramsForStudentsSubscriptionsFilterRequestModel>();
  @Input() studentFilterRequestModel: IProgramsForStudentsSubscriptionsFilterRequestModel =
    { skip: 0, take: 9, page: 1 };
  @Input() numberPerRowForStudent: number = 3;
  @Input() studentItems: IProgramsForStudentSubscriptionsModel[] | undefined;
  @Input() totalCountForStudent: number = 0;
  @Input() userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;

  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  programSubscriptionUsers = ProgramSubscriptionUsersEnum;
  page = 1

  constructor(
    public translate: TranslateService,
    private exportationService: ExportationService
  ) { }

  ngOnInit(): void {
    console.log("userMode", this.userMode);
    this.teacherFilterRequestModel.sortField = 'progName';
    this.studentFilterRequestModel.sortField = 'progName';

  }
  // tslint:disable-next-line:typedef
  sortTeacherByName() {
    this.teacherFilterRequestModel.sortField = 'progName';
    this.teacherFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;

    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
  }
  sortTeacherByNameOrderType() {
    if ((this.teacherFilterRequestModel.sortField === 'progName') && this.teacherFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.teacherFilterRequestModel.sortField === 'progName') && this.teacherFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortTeacherRequestDate() {
    this.teacherFilterRequestModel.sortField = 'progcreation';
    this.teacherFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
  }


  sortTeacherRequestDateOrderType() {
    if (this.teacherFilterRequestModel.sortField === 'progcreation' && this.teacherFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.teacherFilterRequestModel.sortField === 'progcreation' && this.teacherFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }
  onTeacherPageChange() {
    this.teacherFilterRequestModel.skip = (this.teacherFilterRequestModel.page - 1) * (this.teacherFilterRequestModel.take || 0);
    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);

  }

  //student
  sortStudentByName() {
    this.studentFilterRequestModel.sortField = 'progName';
    this.studentFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;

    this.studentFilterEvent.emit(this.studentFilterRequestModel);
  }
  sortStudentByNameOrderType() {
    if ((this.studentFilterRequestModel.sortField === 'progName') && this.studentFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.studentFilterRequestModel.sortField === 'progName') && this.studentFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortStudentRequestDate() {
    this.studentFilterRequestModel.sortField = 'progcreation';
    this.studentFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentFilterEvent.emit(this.studentFilterRequestModel);
  }


  sortStudentRequestDateOrderType() {
    if (this.studentFilterRequestModel.sortField === 'progcreation' && this.studentFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.studentFilterRequestModel.sortField === 'progcreation' && this.studentFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }
  onStudentPageChange() {
    this.studentFilterRequestModel.skip = (this.studentFilterRequestModel.page - 1) * (this.studentFilterRequestModel.take || 0);
    this.studentFilterEvent.emit(this.studentFilterRequestModel);

  }
}
