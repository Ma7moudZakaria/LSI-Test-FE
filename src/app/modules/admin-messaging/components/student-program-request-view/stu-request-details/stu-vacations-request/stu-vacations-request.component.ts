import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ITeacherProgramSubscriptionFilterRequestModel} from '../../../../../../core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import {IStudentProgramVacationModel} from '../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {StudentVacationRequestTabComponent} from './student-vacation-request-tab/student-vacation-request-tab.component';
import {IStudentProgramVacationFilterRequestModel} from 'src/app/core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import {IstudentVacationAdvancedSearchModel} from '../../../../../../core/interfaces/student-program-vacation-interfaces/istudent-vacation-advanced-search-model';

@Component({
  selector: 'app-stu-vacations-request',
  templateUrl: './stu-vacations-request.component.html',
  styleUrls: ['./stu-vacations-request.component.scss']
})
export class StuVacationsRequestComponent implements OnInit {

  @ViewChild(StudentVacationRequestTabComponent) loadStudentVacationReq: StudentVacationRequestTabComponent | undefined;

  @Output() rejectStudentProgramVacation = new EventEmitter<IStudentProgramVacationModel>();

  showTap: string = 'Pending';
  studentVacationReqItem: IStudentProgramVacationModel = { totalRows: 0 };
  openStuRejectOverlay: boolean = false
  openStudentVacationAdvancedSearch: boolean = false
  studentVacationFilterAdvancedSearch: ITeacherProgramSubscriptionFilterRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  filter: IstudentVacationAdvancedSearchModel = { isSearch: false, studentVacationRequestFilter: this.studentVacationFilterAdvancedSearch }

  constructor() { }

  ngOnInit(): void {
  }

  openRejectRequest(event: IStudentProgramVacationModel) {
    this.studentVacationReqItem = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
  }

  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.loadStudentVacationReq?.getStudentProgramVacationRequests();
  }

  closeOverlay() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.loadStudentVacationReq?.getStudentProgramVacationRequests();

  }

  openStudentVacationAdvancedSearchPopup(event: IStudentProgramVacationFilterRequestModel) {
    this.openStudentVacationAdvancedSearch = !this.openStudentVacationAdvancedSearch;
    this.studentVacationFilterAdvancedSearch = event;
  }

  StudentProgramVacationAdvancedSearch(event: IstudentVacationAdvancedSearchModel) {
    // if (event.isSearch == false) { }
    this.loadStudentVacationReq?.advancedSearch(event.studentVacationRequestFilter || undefined);
    this.openStudentVacationAdvancedSearch = !this.openStudentVacationAdvancedSearch;
  }
  closeAdvancedSearch(event: IstudentVacationAdvancedSearchModel) {
    this.openStudentVacationAdvancedSearch = false;
    this.filter = event
    this.loadStudentVacationReq?.getStudentProgramVacationRequests();
  }
}
