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

@Component({
  selector: 'app-teacher-stu-program-for-subscription-grid',
  templateUrl: './teacher-stu-program-for-subscription-grid.component.html',
  styleUrls: ['./teacher-stu-program-for-subscription-grid.component.scss']
})
export class TeacherStuProgramForSubscriptionGridComponent implements OnInit {

  @Output() teacherFilterEvent = new EventEmitter<IProgramsForTeachersSubscriptionsFilterRequestModel>();
  @Input() teacherFilterRequestModel: IProgramsForTeachersSubscriptionsFilterRequestModel =
    { skip: 0, take: 9, page: 1 };
  @Input() numberPerRow: number = 3;
  @Input() teacherItems: IProgramsForTeacherSubscriptionsModel[] | undefined
  @Input() totalCount: number = 0;


  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  programSubscriptionUsers = ProgramSubscriptionUsersEnum;
  page = 1

  constructor(
    public translate: TranslateService,
    private exportationService: ExportationService
  ) { }

  ngOnInit(): void {
    this.teacherFilterRequestModel.sortField = 'progName';

  }
  // tslint:disable-next-line:typedef
  sortTeacherByName() {
    this.teacherFilterRequestModel.sortField = 'progName';
    this.teacherFilterRequestModel.sortOrder = 1;
    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
  }


  sortTeacherRequestDate() {
    this.teacherFilterRequestModel.sortField = 'progcreation';
    this.teacherFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.teacherFilterEvent.emit(this.teacherFilterRequestModel);
  }

  sortTeacherByNameOrderType() {
    if ((this.teacherFilterRequestModel.sortField === 'progcreation') && this.teacherFilterRequestModel.sortOrder == 1) { return 'asend' }
    if ((this.teacherFilterRequestModel.sortField === 'progcreation') && this.teacherFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortTeacherRequestDateOrderType() {
    if (this.teacherFilterRequestModel.sortField === 'progcreation' && this.teacherFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.teacherFilterRequestModel.sortField === 'progcreation' && this.teacherFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }
  onTeacherPageChange() {
    //   this.teacherFilterRequestModel.skip = (this.teacherFilterRequestModel.page - 1) * (this.teacherFilterRequestModel.take || 0);
    //   this.teacherFilterEvent.emit(this.teacherFilterRequestModel);

  }
}
