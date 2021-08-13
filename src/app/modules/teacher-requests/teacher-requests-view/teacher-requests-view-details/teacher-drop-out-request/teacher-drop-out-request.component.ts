import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { ICrateTeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/icreate-teacher-drop-out-request-model';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-teacher-view-request-model';
import { ITeacherDropOutRequestTeacherViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-teacher-view-model';
import { DropOutRequestGridComponent } from './drop-out-request-grid/drop-out-request-grid.component';

@Component({
  selector: 'app-teacher-drop-out-request',
  templateUrl: './teacher-drop-out-request.component.html',
  styleUrls: ['./teacher-drop-out-request.component.scss']
})
export class TeacherDropOutRequestComponent implements OnInit {

  showTap: string = 'new_request';
  @ViewChild(DropOutRequestGridComponent) dropOutRequestGridComponent: DropOutRequestGridComponent | undefined;
  
  createDropOut = {} as ICrateTeacherDropOutRequestModel;
  itemTeacherDropOutRequest: ITeacherDropOutRequestTeacherViewModel = {};
  openTeacherDropOutRequestCreateOverlay: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeCreateTeacherDropOutRequestOverlay(event: ICrateTeacherDropOutRequestModel) {
    this.openTeacherDropOutRequestCreateOverlay = false;
    this.createDropOut = event
    this.dropOutRequestGridComponent?.getTeacherDropOutRequests();
  }

  openTeacherDropOutRequestCreatePopup(event: ICrateTeacherDropOutRequestModel) {
    this.openTeacherDropOutRequestCreateOverlay = true;
    this.createDropOut = event

  }
  
  // closeRejectedRequest() {
  //   this.dropOutRequestGridComponent?.getTeacherDropOutRequests();
  // }

  closeOverlay() {
    this.openTeacherDropOutRequestCreateOverlay = false;
    this.dropOutRequestGridComponent?.getTeacherDropOutRequests();
  }

}
