import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentVacationRequestTabComponent} from './student-vacation-request-tab/student-vacation-request-tab.component';
import {IStudentProgramVacationFilterRequestModel} from '../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import {StudentProgramVacationStatusEnum} from '../../../../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import {IStudentProgramVacationModel} from '../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';

@Component({
  selector: 'app-stu-vacations-request',
  templateUrl: './stu-vacations-request.component.html',
  styleUrls: ['./stu-vacations-request.component.scss']
})
export class StuVacationsRequestComponent implements OnInit {

  @ViewChild(StudentVacationRequestTabComponent) studentVacationRequestTab: StudentVacationRequestTabComponent | undefined;
  filter: IStudentProgramVacationFilterRequestModel = { statusNum: StudentProgramVacationStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }

  showTap: string = 'Pending';
  itemStuReq: IStudentProgramVacationModel = {};
  openStuRejectOverlay: boolean = false;
  openStuAdvancedSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  openRejectRequest(event: IStudentProgramVacationModel) {
    this.itemStuReq = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;

  }
  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.studentVacationRequestTab?.getStudentProgramVacationRequests();

  }

  closeStuAdvancedSearch(event: IStudentProgramVacationFilterRequestModel) {
    this.openStuAdvancedSearch = false;
    this.filter = event
    this.studentVacationRequestTab?.getStudentProgramVacationRequests();
  }

  openStuAdvancedSearchPopup(event: IStudentProgramVacationFilterRequestModel) {
    this.openStuAdvancedSearch = true;
    this.filter = event

  }
}
