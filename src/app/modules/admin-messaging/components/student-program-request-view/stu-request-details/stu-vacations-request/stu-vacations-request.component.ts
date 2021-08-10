import {Component, OnInit, ViewChild} from '@angular/core';
import {IStudentProgramVacationModel} from '../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {StudentVacationRequestTabComponent} from './student-vacation-request-tab/student-vacation-request-tab.component';
import {IStudentProgramVacationFilterRequestModel} from 'src/app/core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import {StudentProgramVacationStatusEnum} from '../../../../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';

@Component({
  selector: 'app-stu-vacations-request',
  templateUrl: './stu-vacations-request.component.html',
  styleUrls: ['./stu-vacations-request.component.scss']
})
export class StuVacationsRequestComponent implements OnInit {

  @ViewChild(StudentVacationRequestTabComponent) stuRejectReq: StudentVacationRequestTabComponent | undefined;
  @ViewChild(StudentVacationRequestTabComponent) advancedSearch: StudentVacationRequestTabComponent | undefined;
  advancedSearchObjectpopup: IStudentProgramVacationFilterRequestModel = { statusNum: StudentProgramVacationStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  filter: IStudentProgramVacationFilterRequestModel = { statusNum: StudentProgramVacationStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }

  showTap: string = 'Pending';
  // roleEnum: RoleEnum = RoleEnum.Teacher;
  itemStuReq: IStudentProgramVacationModel = {};
  openStuRejectOverlay: boolean = false
  openStuAdvancedSearch: boolean = false

  constructor() { }

  ngOnInit(): void {
  }
  openRejectRequest(event: IStudentProgramVacationModel) {
    this.itemStuReq = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;

  }
  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.stuRejectReq?.getStudentProgramVacationRequests();

  }

  closeOverlay() {
    this.openStuRejectOverlay = false;
    this.openStuAdvancedSearch = false;
    this.advancedSearch?.getStudentProgramVacationRequests();
  }

  closeStuAdvancedSearch(event: IStudentProgramVacationFilterRequestModel) {
    this.openStuAdvancedSearch = false;
    this.filter = event
    this.advancedSearch?.getStudentProgramVacationRequests();
  }


  openStuAdvancedSearchPopup(event: IStudentProgramVacationFilterRequestModel) {
    this.openStuAdvancedSearch = true;
    this.filter = event

  }
  advancedSearchObject(event: IStudentProgramVacationFilterRequestModel) {
    this.filter = event
  }


}
