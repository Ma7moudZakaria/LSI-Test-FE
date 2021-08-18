import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { ITeacherDropOutRequestAdvFilterAdminViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-admin-view-request-model';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import { TeacherDropOutTabRequestComponent } from './teacher-drop-out-tab-request/teacher-drop-out-tab-request.component';

@Component({
  selector: 'app-teacher-admin-drop-out-request',
  templateUrl: './teacher-admin-drop-out-request.component.html',
  styleUrls: ['./teacher-admin-drop-out-request.component.scss']
})
export class TeacherAdminDropOutRequestComponent implements OnInit {

  @ViewChild(TeacherDropOutTabRequestComponent) teacherDropOutTabRequestComponent: TeacherDropOutTabRequestComponent | undefined;
  
  filter: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  itemTeacherDropOutRequestForReject: ITeacherDropOutRequestModel = {};
  openTeacherDropOutRequestRejectOverlay: boolean = false;
  openTeacherDropOutRequestAdvancedSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openRejectRequest(event: ITeacherDropOutRequestModel) {
    this.itemTeacherDropOutRequestForReject = event;
    this.openTeacherDropOutRequestRejectOverlay = !this.openTeacherDropOutRequestRejectOverlay;

  }

  closeTeacherDropOutRequestAdvancedSearch(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.openTeacherDropOutRequestAdvancedSearch = false;
    this.filter = event
    this.teacherDropOutTabRequestComponent?.getTeacherDropOutRequests();
  }

  openTeacherDropOutRequestAdvancedSearchPopup(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.openTeacherDropOutRequestAdvancedSearch = true;
    this.filter = event

  }
  
  closeRejectedRequest() {
    this.openTeacherDropOutRequestRejectOverlay = !this.openTeacherDropOutRequestRejectOverlay;
    this.teacherDropOutTabRequestComponent?.getTeacherDropOutRequests();
  }

}
