import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TeacherJionProgramTabRequestComponent} from '../../../teacher-program-request-view/teacher-request-details/teacher-join-request-program/teacher-join-program-tab-request/teacher-join-program-tab-request.component';
import {ITeacherProgramSubscriptionModel} from '../../../../../../core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import {ITeacherProgramSubscriptionFilterRequestModel} from '../../../../../../core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import {ITeacherAdvancedSearchModel} from '../../../../../../core/interfaces/teacher-program-subscription-interfaces/iteacher-advanced-search-model';
import {IStudentProgramVacationModel} from '../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {StudentVacationRequestTabComponent} from './student-vacation-request-tab/student-vacation-request-tab.component';
import { IStudentProgramVacationFilterRequestModel } from 'src/app/core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import {IstudentVacationAdvancedSearchModel} from '../../../../../../core/interfaces/student-program-vacation-interfaces/istudent-vacation-advanced-search-model';

@Component({
  selector: 'app-stu-vacations-request',
  templateUrl: './stu-vacations-request.component.html',
  styleUrls: ['./stu-vacations-request.component.scss']
})
export class StuVacationsRequestComponent implements OnInit {

  @ViewChild(StudentVacationRequestTabComponent) loadStudentVacationReq: StudentVacationRequestTabComponent | undefined;

  @Output() rejectTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();

  showTap: string = 'Pending';
  itemTeacherReq: IStudentProgramVacationModel = { totalRows: 0 };
  openStuRejectOverlay: boolean = false
  openTeacherAdvancedSearch: boolean = false
  teacherFilterAdvancedSearch: ITeacherProgramSubscriptionFilterRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  filter: IstudentVacationAdvancedSearchModel = { isSearch: false, studentVacationRequestFilter: this.teacherFilterAdvancedSearch }

  constructor() { }

  ngOnInit(): void {
  }

  openRejectRequest(event: IStudentProgramVacationModel) {
    this.itemTeacherReq = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
  }

  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.loadStudentVacationReq?.getTeachersProgramsSubscriptions();
  }

  closeOverlay() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.loadStudentVacationReq?.getTeachersProgramsSubscriptions();

  }

  openTeacherAdvancedSearchPopup(event: IStudentProgramVacationFilterRequestModel) {
    this.openTeacherAdvancedSearch = !this.openTeacherAdvancedSearch;
    this.teacherFilterAdvancedSearch = event;
  }

  teacherAdvancedSearch(event: IstudentVacationAdvancedSearchModel) {
    // if (event.isSearch == false) { }
    this.loadStudentVacationReq?.advancedSearch(event.studentVacationRequestFilter || undefined);
    this.openTeacherAdvancedSearch = !this.openTeacherAdvancedSearch;
  }
  closeAdvancedSearch(event: IstudentVacationAdvancedSearchModel) {
    this.openTeacherAdvancedSearch = false;
    this.filter = event
    this.loadStudentVacationReq?.getTeachersProgramsSubscriptions();
  }
}
