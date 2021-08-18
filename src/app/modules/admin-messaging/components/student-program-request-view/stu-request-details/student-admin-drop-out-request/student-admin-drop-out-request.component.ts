import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { IStudentDropOutRequestsFilterAdminViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-admin-view-request-model';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { StudentDropOutTabRequestComponent } from './student-drop-out-tab-request/student-drop-out-tab-request.component';
import {ICrateStudentDropOutRequestModel} from '../../../../../../core/interfaces/student-drop-out-request-interfaces/icreate-student-drop-out-request-model';

@Component({
  selector: 'app-student-admin-drop-out-request',
  templateUrl: './student-admin-drop-out-request.component.html',
  styleUrls: ['./student-admin-drop-out-request.component.scss']
})
export class StudentAdminDropOutRequestComponent implements OnInit {

  @ViewChild(StudentDropOutTabRequestComponent) studentDropOutTabRequestComponent: StudentDropOutTabRequestComponent | undefined;
  
  filter: IStudentDropOutRequestsFilterAdminViewRequestModel = { statusNum: StudentDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  itemStudentDropOutRequestForReject: IStudentDropOutRequestsFilterResponseModel = {};
  openStudentDropOutRequestRejectOverlay: boolean = false;
  openStudentDropOutRequestAdvancedSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openRejectRequest(event: IStudentDropOutRequestsFilterResponseModel) {
    this.itemStudentDropOutRequestForReject = event;
    this.openStudentDropOutRequestRejectOverlay = !this.openStudentDropOutRequestRejectOverlay;

  }

  closeStudentDropOutRequestAdvancedSearch(event: IStudentDropOutRequestsFilterAdminViewRequestModel) {
    this.openStudentDropOutRequestAdvancedSearch = false;
    this.filter = event
    this.studentDropOutTabRequestComponent?.getStudentDropOutRequests();
  }

  openStudentDropOutRequestAdvancedSearchPopup(event: IStudentDropOutRequestsFilterAdminViewRequestModel) {
    this.openStudentDropOutRequestAdvancedSearch = true;
    this.filter = event

  }

  closeRejectedRequest() {
    this.openStudentDropOutRequestRejectOverlay = false;
    this.studentDropOutTabRequestComponent?.getStudentDropOutRequests();
  }

  closeOverlay() {
    this.openStudentDropOutRequestAdvancedSearch = false;
    this.openStudentDropOutRequestAdvancedSearch = false;
  }
}
