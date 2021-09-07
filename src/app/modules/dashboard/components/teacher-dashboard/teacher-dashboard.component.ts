import {Component, OnInit, ViewChild} from '@angular/core';
import {IStudentProgramVacationModel} from '../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {StudentVacationRequestTabComponent} from '../../../admin-messaging/components/student-program-request-view/stu-request-details/stu-vacations-request/student-vacation-request-tab/student-vacation-request-tab.component';
import {ITeacherAppointmentModel} from '../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-model';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  openAddRequestOverlay: boolean = false;
  openTeacherRequestDetailsOverlay: boolean = false;
  itemStuReq: ITeacherAppointmentModel = {};
  @ViewChild(StudentVacationRequestTabComponent) studentVacationRequestTab: StudentVacationRequestTabComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  openAddRequest(event: ITeacherAppointmentModel) {
    this.itemStuReq = event;
    this.openAddRequestOverlay = !this.openAddRequestOverlay;

  }
  closeAddRequestOverlayRequest() {
    this.openAddRequestOverlay = !this.openAddRequestOverlay;
    this.studentVacationRequestTab?.getStudentProgramVacationRequests();

  }

  openRequestDetails(event: ITeacherAppointmentModel) {
    this.itemStuReq = event;
    this.openTeacherRequestDetailsOverlay = !this.openTeacherRequestDetailsOverlay;

  }

  closeRequestDetails() {
    this.openTeacherRequestDetailsOverlay = !this.openTeacherRequestDetailsOverlay;
    this.studentVacationRequestTab?.getStudentProgramVacationRequests();

  }

}
