import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseMessageModel } from '../../../../../core/ng-model/base-message-model';
import { AlertifyService } from '../../../../../core/services/alertify-services/alertify.service';
import { BaseConstantModel } from '../../../../../core/ng-model/base-constant-model';
import { LanguageEnum } from '../../../../../core/enums/language-enum.enum';
import { IStudentSubscriptionModel } from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { StudentProgramSubscriptionServicesService } from '../../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import { IStudentProgramSubscription } from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-program-subscription.model';
import { ITeacherStudentViewModel } from '../../../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { TeacherSystemSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum';
import { TeacheProgramSubscriptionStatusEnum } from 'src/app/core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';


@Component({
  selector: 'app-admin-teacher-join-request',
  templateUrl: './admin-teacher-join-request.component.html',
  styleUrls: ['./admin-teacher-join-request.component.scss']
})
export class AdminTeacherJoinRequestComponent implements OnInit {

  @Input() teacherIdOutput: ITeacherStudentViewModel | undefined;
  @Input() programsFilter: IStudentProgramSubscription = { skip: 0, take: 9, sortField: '', sortOrder: 1 };
  // studProgsSubsItems: IStudentSubscriptionModel[] = [];

  statusEnum = TeacheProgramSubscriptionStatusEnum;

  userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.teacher;
  teacherItemsList: ITeacherProgramSubscriptionModel[] = []

  totalCount = 0;
  resultMessage: BaseMessageModel = {};

  constructor(private progSubsService: StudentProgramSubscriptionServicesService,
    public translate: TranslateService,
    private alertify: AlertifyService) {

  }
  ngOnInit(): void {
    this.programsFilter.sortField = 'requestdate';
    this.getStudentProgramSubscriptionsFilter();
  }
  getStudentProgramSubscriptionsFilter() {

    this.programsFilter.usrId = this.teacherIdOutput?.usrId;
    this.progSubsService.getلإeachersProgramsSubscriptionsServFilterStudentView(this.programsFilter).subscribe
      (res => {
        if (res.isSuccess) {
          this.teacherItemsList = res.data;
          this.totalCount = res.count ? res.count : 0;
          // if (this.programsFilter.skip > 0 && (!this.studProgsSubsItems || this.studProgsSubsItems.length === 0)) {
          //   this.programsFilter.page -= 1;
          //   this.programsFilter.skip = (this.programsFilter.page - 1) * this.programsFilter.take;
          //   this.getTeacherDropOutRequests();
          // }
        }
        else {

          this.alertify.error(res.message || '');
        }
      }, error => {
        this.alertify.error(error || '');

      })
  }


  teacherJoinRequestChangePage(event: IStudentSubscriptionFilterRequestModel) {
    this.programsFilter = event;
    this.getStudentProgramSubscriptionsFilter();
  }

}
