import { error } from 'selenium-webdriver';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';

@Component({
  selector: 'app-stu-tab-request',
  templateUrl: './stu-tab-request.component.html',
  styleUrls: ['./stu-tab-request.component.scss']
})
export class StuTabRequestComponent implements OnInit {
  @Output() itemStuReq = new EventEmitter<IStudentSubscriptionModel>();
  typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;
  resultMessage: BaseMessageModel = {};

  showTap: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending
  statusEnum = StudentProgramSubscriptionStatusEnum;
  filter: IStudentSubscriptionFilterRequestModel = { statusNum: StudentProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  studProgsSubsItems: IStudentSubscriptionModel[] = [];
  totalCount = 0;

  constructor(private progSubsService: StudentProgramSubscriptionServicesService, private alertify: AlertifyService) {

  }
  ngOnInit(): void {
    this.getStudentProgramSubscriptionsFilter();
  }
  getStudentProgramSubscriptionsFilter() {
    this.progSubsService.getStudentsSubscriptionsFilter(this.filter).subscribe(res => {

      if (res.isSuccess) {
        this.studProgsSubsItems = res.data;
        console.log("studProgsSubsItem ", this.studProgsSubsItems)

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
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Pending
    this.getStudentProgramSubscriptionsFilter();
  }

  onAcceptChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Accept
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Accept
    this.getStudentProgramSubscriptionsFilter();
  }
  onRejectedChange() {
    this.showTap = StudentProgramSubscriptionStatusEnum.Rejected
    this.filter.statusNum = StudentProgramSubscriptionStatusEnum.Rejected
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
}





