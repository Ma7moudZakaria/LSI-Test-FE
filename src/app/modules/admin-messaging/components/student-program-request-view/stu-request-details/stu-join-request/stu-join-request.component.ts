import { Component, OnInit, ViewChild } from '@angular/core';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { StuTabRequestComponent } from './stu-tab-request/stu-tab-request.component';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';

@Component({
  selector: 'app-stu-join-request',
  templateUrl: './stu-join-request.component.html',
  styleUrls: ['./stu-join-request.component.scss']
})
export class StuJoinRequestComponent implements OnInit {
  @ViewChild(StuTabRequestComponent) stuRejectReq: StuTabRequestComponent | undefined;
  @ViewChild(StuTabRequestComponent) advancedSearch: StuTabRequestComponent | undefined;
  advancedSearchObjectpopup: IStudentSubscriptionFilterRequestModel = { statusNum: StudentProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  filter: IStudentSubscriptionFilterRequestModel = { statusNum: StudentProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }

  showTap: string = 'Pending';
  // roleEnum: RoleEnum = RoleEnum.Teacher;
  itemStuReq: IStudentSubscriptionModel = {};
  openStuRejectOverlay: boolean = false
  openStuAdvancedSearch: boolean = false

  constructor() { }

  ngOnInit(): void {
  }
  openRejectRequest(event: IStudentSubscriptionModel) {
    this.itemStuReq = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;

  }
  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.stuRejectReq?.getStudentProgramSubscriptionsFilter();

  }

  closeOverlay() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.stuRejectReq?.getStudentProgramSubscriptionsFilter();

  }

  closeStuAdvancedSearch() {
    this.openStuAdvancedSearch = false
    this.advancedSearch?.getStudentProgramSubscriptionsFilter();
  }


  openStuAdvancedSearchPopup(event: IStudentSubscriptionFilterRequestModel) {
    this.openStuAdvancedSearch = true;
    this.filter = event


  }
  advancedSearchObject(event: IStudentSubscriptionFilterRequestModel) {
    this.filter = event

  }


}
