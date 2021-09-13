import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseMessageModel } from '../../../../../core/ng-model/base-message-model';
import { IUser } from '../../../../../core/interfaces/auth-interfaces/iuser-model';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from '../../../../../core/services/alertify-services/alertify.service';
import { BaseConstantModel } from '../../../../../core/ng-model/base-constant-model';
import { LanguageEnum } from '../../../../../core/enums/language-enum.enum';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../../../../shared/components/confirm-modal/confirm-modal.component';
import { IStudentSubscriptionModel } from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { IStudentSubscriptionFilterRequestModel } from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { StudentProgramSubscriptionStatusEnum } from '../../../../../core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { StudentProgramSubscriptionServicesService } from '../../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import { IStudentProgramSubscription } from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-program-subscription.model';
import { ITeacherStudentViewModel } from '../../../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { TeacheProgramSubscriptionStatusEnum } from 'src/app/core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';
import { TeacherSystemSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
@Component({
  selector: 'app-teacher-join-request',
  templateUrl: './teacher-join-request.component.html',
  styleUrls: ['./teacher-join-request.component.scss']
})
export class TeacherJoinRequestComponent implements OnInit {



  // @Output() closeAdvancedSearch = new EventEmitter<IStudentSubscriptionFilterRequestModel>();

  @Output() advancedSearchObject = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
  @Input() programsFilter: IStudentProgramSubscription = { skip: 0, take: 9, sortField: '', sortOrder: 1 };
  currentUser: IUser | undefined;
  typeEnum: TeacheProgramSubscriptionStatusEnum = TeacheProgramSubscriptionStatusEnum.Pending;
  resultMessage: BaseMessageModel = {};

  //showTap: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending
  statusEnum = TeacheProgramSubscriptionStatusEnum;
  studProgsSubsItems: ITeacherProgramSubscriptionModel[] = [];
  totalCount = 0;
  sendUserID: ITeacherStudentViewModel | undefined;
  showUserDetailsView: boolean = false;
  userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.teacher;

  constructor(private progSubsService: StudentProgramSubscriptionServicesService,
    public translate: TranslateService,
    private alertify: AlertifyService) {

  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.programsFilter.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
    this.getStudentProgramSubscriptionsFilter();
    //this.onPendingChange();

  }
  sendUserIDEvent(event: ITeacherStudentViewModel | undefined) {
    this.sendUserID = event;
    this.showUserDetailsView = true;
  }
  hideUserDetailsView(event: boolean) {
    this.showUserDetailsView = event;
  }
  getStudentProgramSubscriptionsFilter() {

    this.programsFilter.usrId = this.currentUser?.id;
    this.progSubsService.getلإeachersProgramsSubscriptionsServFilterStudentView(this.programsFilter).subscribe(res => {
      if (res.isSuccess) {
        this.studProgsSubsItems = res.data;

        // this.studProgsSubsItems?.forEach(function (item) {
        //   item.requestDate = item.requestDate ? new Date(item.requestDate).toDateString(): '';
        // });
        this.totalCount = res.count ? res.count : 0;
        // if (this.programsFilter.skip > 0 && (!this.studProgsSubsItems || this.studProgsSubsItems.length === 0)) {
        //   this.programsFilter.page -= 1;
        //   this.programsFilter.skip = (this.programsFilter.page - 1) * this.programsFilter.take;
        //   this.getStudentProgramSubscriptionsFilter();
        // }
      }
      else {

      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }

  // onPendingChange() {
  //   this.showTap = StudentProgramSubscriptionStatusEnum.Pending;
  //   this.closeAvancedSearch();
  //   this.getStudentProgramSubscriptionsFilter();
  // }


  // onAcceptChange() {
  //   this.showTap = StudentProgramSubscriptionStatusEnum.Accept;
  //   this.closeAvancedSearch();
  //   this.getStudentProgramSubscriptionsFilter();
  // }
  // onRejectedChange() {
  //   this.showTap = StudentProgramSubscriptionStatusEnum.Rejected;
  //   this.closeAvancedSearch();
  //   this.getStudentProgramSubscriptionsFilter();
  // }
  stuRejectedChangePage(event: IStudentSubscriptionFilterRequestModel) {
    this.programsFilter = event;

    this.getStudentProgramSubscriptionsFilter();
  }
  closeAvancedSearch() {
    this.programsFilter.skip = 0;
    this.programsFilter.take = 9;
    this.programsFilter.sortField = '';
    // this.filter = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
    // this.closeAdvancedSearch.emit(this.filter)
  }
}


