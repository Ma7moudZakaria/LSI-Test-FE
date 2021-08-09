import {Component, OnInit, ViewChild} from '@angular/core';
import {StuTabRequestComponent} from '../stu-join-request/stu-tab-request/stu-tab-request.component';
import {StudentProgramVacationStatusEnum} from '../../../../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import {IstudentProgramVacationFilterRequestModel} from '../../../../../../core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-filter-request-model';
import {IstudentProgramVacationModel} from '../../../../../../core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-model';

@Component({
  selector: 'app-stu-vacations-request',
  templateUrl: './stu-vacations-request.component.html',
  styleUrls: ['./stu-vacations-request.component.scss']
})
export class StuVacationsRequestComponent implements OnInit {
  @ViewChild(StuTabRequestComponent) stuRejectReq: StuTabRequestComponent | undefined;
  @ViewChild(StuTabRequestComponent) advancedSearch: StuTabRequestComponent | undefined;
  advancedSearchObjectpopup: IstudentProgramVacationFilterRequestModel = {
    statusNum: StudentProgramVacationStatusEnum.Pending,
    skip: 0,
    take: 9,
    sortField: '',
    sortOrder: 1,
    page: 1
  }
    filter: IstudentProgramVacationFilterRequestModel = {
    statusNum: StudentProgramVacationStatusEnum.Pending,
    skip: 0,
    take: 9,
    sortField: '',
    sortOrder: 1,
    page: 1
  }

  showTap: string = 'Pending';
  // roleEnum: RoleEnum = RoleEnum.Teacher;
  itemStuReq: IstudentProgramVacationModel = {};
  openStuRejectOverlay: boolean = false
  openStuAdvancedSearch: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  openRejectRequest(event: IstudentProgramVacationModel) {
    this.itemStuReq = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;

  }

  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.stuRejectReq?.getStudentProgramSubscriptionsFilter();

  }

  closeOverlay() {
    this.openStuRejectOverlay = false;
    this.openStuAdvancedSearch = false;
    this.advancedSearch?.getStudentProgramSubscriptionsFilter();
  }

  closeStuAdvancedSearch(event: IstudentProgramVacationFilterRequestModel) {
    this.openStuAdvancedSearch = false;
    this.filter = event
    this.advancedSearch?.getStudentProgramSubscriptionsFilter();
  }


  openStuAdvancedSearchPopup(event: IstudentProgramVacationFilterRequestModel) {
    this.openStuAdvancedSearch = true;
    this.filter = event

  }

  advancedSearchObject(event: IstudentProgramVacationFilterRequestModel) {
    this.filter = event
  }
}
