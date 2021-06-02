import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IProgramNotificationDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-details';
import { IProgramUpdateNotifacationModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-update-notification-model';
import { ProgramNotificationViewComponent } from './program-notification-view/program-notification-view.component';
@Component({
  selector: 'app-program-notifacations',
  templateUrl: './program-notifacations.component.html',
  styleUrls: ['./program-notifacations.component.scss']
})
export class ProgramNotifacationsComponent implements OnInit {

  showAddEditOverlay: boolean = false;
  notificationEditObjec: IProgramNotificationDetails = {};
  @ViewChild(ProgramNotificationViewComponent) ProgramNotificationChild: ProgramNotificationViewComponent | undefined;
  ngOnInit(): void {
    // this.ProgramNotificationChild?.getAllNotifications('a7cc7cec-8a16-403e-9343-2d7f0e994856');
  }

  openAddEditOverLay(event: IProgramNotificationDetails) {
    this.showAddEditOverlay = true;
    // pass object deatils to form 
    this.notificationEditObjec = event;
  }

  closeNotifyProgram() {
    this.showAddEditOverlay = false;
    this.ProgramNotificationChild?.getAllNotifications('e65c382a-9417-47b2-9cbf-903f728c48e8');
  }



}
