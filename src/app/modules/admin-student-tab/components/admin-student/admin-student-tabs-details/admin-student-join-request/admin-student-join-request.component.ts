import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { IStudentProgramSubscription } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-program-subscription.model';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';

@Component({
  selector: 'app-admin-student-join-request',
  templateUrl: './admin-student-join-request.component.html',
  styleUrls: ['./admin-student-join-request.component.scss']
})
export class AdminStudentJoinRequestComponent implements OnInit {
  @Input() studentIdOutput: ITeacherStudentViewModel | undefined;
  @Input() programsFilter: IStudentProgramSubscription = { skip: 0, take: 9, sortField: '', sortOrder: 1 };

  // @Input() programsFilter: IStudentProgramSubscription = { skip: 0, take: 9, sortField: '', sortOrder: 1 };
  typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;
  resultMessage: BaseMessageModel = {};
  userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;

  statusEnum = StudentProgramSubscriptionStatusEnum;
  studProgsSubsItems: IStudentSubscriptionModel[] = [];
  totalCount = 0;
  sendUserID: ITeacherStudentViewModel | undefined;
  showUserDetailsView: boolean = false;
  constructor(private progSubsService: StudentProgramSubscriptionServicesService,
    public translate: TranslateService,
    private alertify: AlertifyService) {

  }
  ngOnInit(): void {
    this.programsFilter.sortField = 'requestdate';
    this.getStudentProgramSubscriptionsFilter()

  }
  getStudentProgramSubscriptionsFilter() {

    this.programsFilter.usrId = this.studentIdOutput?.usrId;
    this.progSubsService.getstudentProgramsSubscriptions(this.programsFilter).subscribe(res => {
      if (res.isSuccess) {
        this.studProgsSubsItems = res.data;
        this.totalCount = res.count ? res.count : 0;
      }
      else {
        this.alertify.error(res.message || '');
      }
    }, error => {
      this.alertify.error(error || '');

    })
  }
  studentJoinRequestChangePage(event: IStudentSubscriptionFilterRequestModel) {
    this.programsFilter = event;
    this.getStudentProgramSubscriptionsFilter();
  }


}
