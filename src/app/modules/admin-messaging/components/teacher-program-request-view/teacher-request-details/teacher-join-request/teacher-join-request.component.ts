import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherSystemSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum';
import { ITeacherSystemSubscriptionFilterRequest } from 'src/app/core/interfaces/teacher-interfaces/iteacher-system-subscription-filter-request';
import { ITeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/iteacher-systems-subscription';
import { TeacherJionTabRequestComponent } from './teacher-join-tab-request/teacher-join-tab-request.component';

@Component({
  selector: 'app-teacher-join-request',
  templateUrl: './teacher-join-request.component.html',
  styleUrls: ['./teacher-join-request.component.scss']
})
export class TeacherJoinRequestComponent implements OnInit {
  showTap: string = 'new_request';

  // @ViewChild(TeacherJionTabRequestComponent) stuRejectReq: TeacherJionTabRequestComponent | undefined;
  @ViewChild(TeacherJionTabRequestComponent) teacherSystemSubscriptionRejectReq: TeacherJionTabRequestComponent | undefined;

  // @ViewChild(StuTabRequestComponent) advancedSearch: StuTabRequestComponent | undefined;
  // advancedSearchObjectpopup: IStudentSubscriptionFilterRequestModel = { statusNum: StudentProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  filter: ITeacherSystemSubscriptionFilterRequest = { statusNum: TeacherSystemSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }

  // showTap: string = 'Pending';
  // roleEnum: RoleEnum = RoleEnum.Teacher;

  itemTeacherSystemSubscriptionReq: ITeacherSystemSubscription = {};
  openStuRejectOverlay: boolean = false;
  
  // openStuAdvancedSearch: boolean = false

  constructor() { }

  ngOnInit(): void {
  }
  openRejectRequest(event: ITeacherSystemSubscription) {
    this.itemTeacherSystemSubscriptionReq = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;

  }
  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.teacherSystemSubscriptionRejectReq?.getTeacherSystemSubscription();

  }

  

  closeOverlay() {
    this.openStuRejectOverlay = false;
    // this.openStuAdvancedSearch = false;
    // this.advancedSearch?.getStudentProgramSubscriptionsFilter();
  }

  closeStuAdvancedSearch() {
    // this.openStuAdvancedSearch = false
    // this.advancedSearch?.getStudentProgramSubscriptionsFilter();
  }


  openStuAdvancedSearchPopup(event: ITeacherSystemSubscriptionFilterRequest) {
    // this.openStuAdvancedSearch = true;
    // this.filter = event

  }

  advancedSearchObject(event: ITeacherSystemSubscriptionFilterRequest) {
    // this.filter = event
  }

}
