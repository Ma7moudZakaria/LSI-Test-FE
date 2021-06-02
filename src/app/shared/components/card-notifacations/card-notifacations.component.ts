import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { IProgramNotificationDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-details';
import { IProgramNotificationModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-model';
@Component({
  selector: 'app-card-notifacations',
  templateUrl: './card-notifacations.component.html',
  styleUrls: ['./card-notifacations.component.scss']
})
export class CardNotifacationsComponent implements OnInit {

  constructor() { }
  @Output() deleteCardNotify = new EventEmitter<string>();
  @Output() editCardNotify = new EventEmitter<IProgramNotificationModel>();
  // @Input() inputCardId ;
  @Input() notificationsCardDetails: IProgramNotificationDetails = {};


  ngOnInit(): void {



  }

  deleteCard() {
    this.deleteCardNotify.emit(this.notificationsCardDetails.id);
  }
  editCard() {
    this.editCardNotify.emit(this.notificationsCardDetails);
  }


}
