import { error } from 'selenium-webdriver';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';

@Component({
  selector: 'app-stu-tab-request',
  templateUrl: './stu-tab-request.component.html',
  styleUrls: ['./stu-tab-request.component.scss']
})
export class StuTabRequestComponent implements OnInit {
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

  constructor(private progSubsService: StudentProgramSubscriptionServicesService,
    public translate: TranslateService,
    private alertify: AlertifyService) {

  }
  ngOnInit(): void {
    this.filter.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn'
    this.onPendingChange();
  }
  getStudentProgramSubscriptionsFilter() {
    this.progSubsService.getStudentsSubscriptionsFilter(this.filter).subscribe(res => {

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
  // advancedSearchRequest() {
  //   this.advancedSearchObject.emit(this.filter)
  // }

  onPendingChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Pending
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Pending;
    this.clearfilterByText();
    // this.advancedSearchRequest()
    this.closeAvancedSearch()
    this.getStudentProgramSubscriptionsFilter();
  }


  onAcceptChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Accept
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Accept
    this.clearfilterByText();
    // this.advancedSearchRequest()
    this.closeAvancedSearch()
    this.getStudentProgramSubscriptionsFilter();
  }
  onRejectedChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Rejected
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Rejected
    this.clearfilterByText();
    // this.advancedSearchRequest()
    this.closeAvancedSearch()
    this.getStudentProgramSubscriptionsFilter();
  }
  rejecteStuRequestMethod(event: IStudentSubscriptionModel) {
    this.itemStuReq.emit(event)

  }

  ids?: string[] = [];
  acceptStuReq(stuModel: IStudentSubscriptionModel) {
    this.ids?.push(stuModel.id || '');
    this.progSubsService.studentProgramSubscriptionsAcceptance(this.ids || []).subscribe(res => {
      if (res.isSuccess) {
        this.alertify.success(res.message || '');
        this.getStudentProgramSubscriptionsFilter();

      }
      else {
        this.alertify.error(res.message || '');
      }
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      });
  }

  acceptAllStudentProgramSubscriptionCheched() {

    this.ids = this.studProgsSubsItems?.filter(i => i.checked).map(a => a.id || '')
    this.progSubsService.studentProgramSubscriptionsAcceptance(this.ids).subscribe(res => {
      if (res.isSuccess) {
        this.alertify.success(res.message || '');
        this.getStudentProgramSubscriptionsFilter();
      }
      else {
        this.alertify.error(res.message || '');
      }
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      });

  }

  stuPendingChangePage(event: IStudentSubscriptionFilterRequestModel) {
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Pending;
    this.filter = event;
    this.getStudentProgramSubscriptionsFilter();

  }
  stuAcceptChangePage(event: IStudentSubscriptionFilterRequestModel) {
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Accept;
    this.filter = event;
    this.getStudentProgramSubscriptionsFilter();

  }
  stuRejectedChangePage(event: IStudentSubscriptionFilterRequestModel) {
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Rejected;
    this.filter = event;
    this.getStudentProgramSubscriptionsFilter();

  }

  filterByText(searchKey: string) {
    this.filter.usrName = searchKey;
    this.getStudentProgramSubscriptionsFilter();
  }
  clearfilterByText() {
    this.filter.progId = '';
  }
  openAvancedSearch() {
    this.openAdvancedSearch.emit(this.filter)
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





