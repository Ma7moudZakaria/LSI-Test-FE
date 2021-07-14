import { error } from 'selenium-webdriver';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';

@Component({
  selector: 'app-stu-tab-request',
  templateUrl: './stu-tab-request.component.html',
  styleUrls: ['./stu-tab-request.component.scss']
})
export class StuTabRequestComponent implements OnInit {
  @Output() itemStuReq = new EventEmitter<IStudentSubscriptionModel>();

  showTap: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending
  statusEnum = StudentProgramSubscriptionStatusEnum;
  filter: IStudentSubscriptionFilterRequestModel = { statusNum: StudentProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  studProgsSubsItems: IStudentSubscriptionModel[] = [];

  constructor(private progSubsService: StudentProgramSubscriptionServicesService) {

  }
  ngOnInit(): void {
    this.getStudentProgramSubscriptionsFilter();
  }

  getStudentProgramSubscriptionsFilter() {
    this.progSubsService.getStudentsSubscriptionsFilter(this.filter).subscribe(res => {

      if (res.isSuccess) {
        this.studProgsSubsItems = res.data;
        console.log("studProgsSubsItem ", this.studProgsSubsItems)

      }
      else {

      }
    }, error => {

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
}
