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

  }

  openAddEditOverLay(event: IProgramNotificationDetails) {
    this.showAddEditOverlay = true;
    // pass object deatils to form 
    this.notificationEditObjec = event;
  }

  closeNotifyProgram() {
    this.showAddEditOverlay = false;
    this.ProgramNotificationChild?.getAllNotifications('');
  }



}
