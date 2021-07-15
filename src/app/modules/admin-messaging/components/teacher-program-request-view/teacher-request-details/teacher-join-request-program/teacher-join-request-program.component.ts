import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { TeacherJionProgramTabRequestComponent } from './teacher-join-program-tab-request/teacher-join-program-tab-request.component';

@Component({
  selector: 'app-teacher-join-request-program',
  templateUrl: './teacher-join-request-program.component.html',
  styleUrls: ['./teacher-join-request-program.component.scss']
})
export class TeacherJoinRequestProgramComponent implements OnInit {

  @ViewChild(TeacherJionProgramTabRequestComponent) loadTeatcherProg: TeacherJionProgramTabRequestComponent | undefined;

  @Output() rejectTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();

  showTap: string = 'Pending';
  itemTeacherReq: ITeacherProgramSubscriptionModel = {totalRows:0};
  openStuRejectOverlay: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  openRejectRequest(event: ITeacherProgramSubscriptionModel) {
    this.itemTeacherReq = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
  }

  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.loadTeatcherProg?.getTeachersProgramsSubscriptions();
  }

  closeOverlay() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.loadTeatcherProg?.getTeachersProgramsSubscriptions();

  }
}
