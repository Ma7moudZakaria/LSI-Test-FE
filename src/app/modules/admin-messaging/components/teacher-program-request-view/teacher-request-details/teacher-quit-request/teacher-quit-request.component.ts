import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { ITeacherDropOutRequestAdvFilterAdminViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-adv-filter-admin-view-request-model';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-model';
import { TeacherQuitTabRequestComponent } from './teacher-quit-tab-request/teacher-quit-tab-request.component';

@Component({
  selector: 'app-teacher-quit-request',
  templateUrl: './teacher-quit-request.component.html',
  styleUrls: ['./teacher-quit-request.component.scss']
})
export class TeacherQuitRequestComponent implements OnInit {

  showTap: string = 'new_request';
  @ViewChild(TeacherQuitTabRequestComponent) teacherQuitTabRequestComponent: TeacherQuitTabRequestComponent | undefined;
  
  filter: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  itemTeacherDropOutRequest: ITeacherDropOutRequestModel = {};
  openTeacherDropOutRequestRejectOverlay: boolean = false;
  openTeacherDropOutRequestAdvancedSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openRejectRequest(event: ITeacherDropOutRequestModel) {
    this.itemTeacherDropOutRequest = event;
    this.openTeacherDropOutRequestRejectOverlay = !this.openTeacherDropOutRequestRejectOverlay;

  }

  closeTeacherDropOutRequestAdvancedSearch(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.openTeacherDropOutRequestAdvancedSearch = false;
    this.filter = event
    this.teacherQuitTabRequestComponent?.getTeacherDropOutRequests();
  }

  openTeacherDropOutRequestAdvancedSearchPopup(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.openTeacherDropOutRequestAdvancedSearch = true;
    this.filter = event

  }
  
  closeRejectedRequest() {
    this.openTeacherDropOutRequestRejectOverlay = !this.openTeacherDropOutRequestRejectOverlay;
    this.teacherQuitTabRequestComponent?.getTeacherDropOutRequests();
  }

  closeOverlay() {
    this.openTeacherDropOutRequestRejectOverlay = false;
    this.openTeacherDropOutRequestAdvancedSearch = false;
  }

}
