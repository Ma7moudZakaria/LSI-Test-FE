import {Component, OnInit, ViewChild} from '@angular/core';
import {ITeacherAppointmentFilterRequestModel} from '../../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-filter-request-model';
import {TeacherAppointmentRequestsEnum} from '../../../../../../core/enums/teacher-appointment-requests-enums/teacher-appointment-requests-enum.enum';
import {AppointmentRequestsTabComponent} from './appointment-requests-tab/appointment-requests-tab.component';
import {ITeachersAppointmentRequestsModel} from '../../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-model';

@Component({
  selector: 'app-chang-time-request',
  templateUrl: './chang-time-request.component.html',
  styleUrls: ['./chang-time-request.component.scss']
})
export class ChangTimeRequestComponent implements OnInit {
  filter: ITeacherAppointmentFilterRequestModel = {
    statusNum: TeacherAppointmentRequestsEnum.Pending,
    skip: 0,
    take: 9,
    sortField: '',
    sortOrder: 1,
    page: 1
  };
  @ViewChild(AppointmentRequestsTabComponent) teacherAppointmentRequestsTab: AppointmentRequestsTabComponent | undefined;

  showTap: string = 'Pending';
  itemTeacherAppointmentReq: ITeachersAppointmentRequestsModel = {};
  openTeacherAppointmentRejectOverlay: boolean = false;
  openTeacherAppointmentAdvancedSearch: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  openRejectRequest(event: ITeachersAppointmentRequestsModel) {
    this.itemTeacherAppointmentReq = event;
    this.openTeacherAppointmentRejectOverlay = !this.openTeacherAppointmentRejectOverlay;

  }

  closeRejectedRequest() {
    this.openTeacherAppointmentRejectOverlay = !this.openTeacherAppointmentRejectOverlay;
    this.teacherAppointmentRequestsTab?.getTeacherAppointmentRequests();

  }

  closeTeacherAdvancedSearch(event: ITeacherAppointmentFilterRequestModel) {
    this.openTeacherAppointmentAdvancedSearch = false;
    this.filter = event;
    this.teacherAppointmentRequestsTab?.getTeacherAppointmentRequests();
  }

  openTeacherAdvancedSearchPopup(event: ITeacherAppointmentFilterRequestModel) {
    this.openTeacherAppointmentAdvancedSearch = true;
    this.filter = event;

  }
}
