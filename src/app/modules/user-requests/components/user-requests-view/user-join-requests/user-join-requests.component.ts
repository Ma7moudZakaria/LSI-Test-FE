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
@Component({
  selector: 'app-user-join-requests',
  templateUrl: './user-join-requests.component.html',
  styleUrls: ['./user-join-requests.component.scss']
})
export class UserJoinRequestsComponent implements OnInit {

  @Output() itemStuReq = new EventEmitter<IStudentSubscriptionModel>();
  @Output() openAdvancedSearch = new EventEmitter<IStudentSubscriptionFilterRequestModel>();

  // @Output() closeAdvancedSearch = new EventEmitter<IStudentSubscriptionFilterRequestModel>();

  @Output() advancedSearchObject = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
  @Input() filter: IStudentSubscriptionFilterRequestModel = { statusNum: StudentProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }

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
    this.filter.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';
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
    this.progSubsService.getStudentsSubscriptionsFilterAdminView(this.filter).subscribe(res => {

      if (res.isSuccess) {
        this.studProgsSubsItems = res.data;
        console.log("studProgsSubsItem ", this.studProgsSubsItems)
        // this.studProgsSubsItems?.forEach(function (item) {
        //   item.requestDate = item.requestDate ? new Date(item.requestDate).toDateString(): '';
        // });
        this.totalCount = res.count ? res.count : 0;
        if (this.filter.skip > 0 && (!this.studProgsSubsItems || this.studProgsSubsItems.length === 0)) {
          this.filter.page -= 1;
          this.filter.skip = (this.filter.page - 1) * this.filter.take;
          this.getStudentProgramSubscriptionsFilter();
        }
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
    this.showTap = StudentProgramSubscriptionStatusEnum.Pending
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Pending;
    //this.clearfilterByText();
    // this.advancedSearchRequest()
    this.closeAvancedSearch()
    this.getStudentProgramSubscriptionsFilter();
  }


  onAcceptChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Accept
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Accept
    //this.clearfilterByText();
    // this.advancedSearchRequest()
    this.closeAvancedSearch()
    this.getStudentProgramSubscriptionsFilter();
  }
  onRejectedChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Rejected
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Rejected
    //this.clearfilterByText();
    // this.advancedSearchRequest()
    this.closeAvancedSearch()
    this.getStudentProgramSubscriptionsFilter();
  }
  stuRejectedChangePage(event: IStudentSubscriptionFilterRequestModel) {
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Rejected;
    this.filter = event;
    this.getStudentProgramSubscriptionsFilter();

  }
  closeAvancedSearch() {
    this.filter.usrName = '';
    this.filter.progId = '';
    this.filter.numberRequest = undefined
    this.filter.fromDate = undefined
    this.filter.toDate = undefined
    this.filter.skip = 0
    this.filter.take = 9
    this.filter.page = 1
    this.filter.sortField = '';
    // this.filter = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
    // this.closeAdvancedSearch.emit(this.filter)
  }
}


