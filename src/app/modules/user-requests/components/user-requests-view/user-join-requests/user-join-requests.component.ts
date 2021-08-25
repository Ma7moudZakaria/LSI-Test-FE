import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BaseMessageModel} from '../../../../../core/ng-model/base-message-model';
import {IUser} from '../../../../../core/interfaces/auth-interfaces/iuser-model';
import {MatDialog} from '@angular/material/dialog';
import {AlertifyService} from '../../../../../core/services/alertify-services/alertify.service';
import {BaseConstantModel} from '../../../../../core/ng-model/base-constant-model';
import {LanguageEnum} from '../../../../../core/enums/language-enum.enum';
import {ConfirmDialogModel, ConfirmModalComponent} from '../../../../../shared/components/confirm-modal/confirm-modal.component';
import {IStudentSubscriptionModel} from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import {IStudentSubscriptionFilterRequestModel} from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import {StudentProgramSubscriptionStatusEnum} from '../../../../../core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import {StudentProgramSubscriptionServicesService} from '../../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import {IStudentProgramSubscription} from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-program-subscription.model';
@Component({
  selector: 'app-user-join-requests',
  templateUrl: './user-join-requests.component.html',
  styleUrls: ['./user-join-requests.component.scss']
})
export class UserJoinRequestsComponent implements OnInit {
  @Input() programsFilter: IStudentProgramSubscription = {  skip: 0, take: 9, sortField: '', sortOrder: 1 };
  currentUser: IUser |undefined;
  typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;
  resultMessage: BaseMessageModel = {};

  showTap: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending
  statusEnum = StudentProgramSubscriptionStatusEnum;
  studProgsSubsItems: IStudentSubscriptionModel[] = [];
  totalCount = 0;
  sendUserID: string | undefined;
  showUserDetailsView:boolean = false;
  constructor(private progSubsService: StudentProgramSubscriptionServicesService,
              public translate: TranslateService,
              private alertify: AlertifyService) {

  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.programsFilter.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
    this.onPendingChange();

  }
  sendUserIDEvent(event: string | undefined){
    this.sendUserID =event;
    this.showUserDetailsView = true;
  }
  hideUserDetailsView(event: boolean){
    this.showUserDetailsView = event;
  }
  getStudentProgramSubscriptionsFilter() {

    this.programsFilter.usrId =this.currentUser?.id;
    this.progSubsService.getstudentProgramsSubscriptions(this.programsFilter).subscribe(res => {
      if (res.isSuccess) {
        this.studProgsSubsItems = res.data;
        this.totalCount = res.count ? res.count : 0;
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

  onPendingChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Pending;
    this.closeAvancedSearch();
    this.getStudentProgramSubscriptionsFilter();
  }


  onAcceptChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Accept;
    this.closeAvancedSearch();
    this.getStudentProgramSubscriptionsFilter();
  }
  onRejectedChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Rejected;
    this.closeAvancedSearch();
    this.getStudentProgramSubscriptionsFilter();
  }
  stuRejectedChangePage(event: IStudentSubscriptionFilterRequestModel) {
    this.programsFilter = event;

    this.getStudentProgramSubscriptionsFilter();
  }
  closeAvancedSearch() {
    this.programsFilter.skip = 0;
    this.programsFilter.take = 9;
    this.programsFilter.sortField = '';
  }
}


