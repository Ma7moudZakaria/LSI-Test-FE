import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramNotificationDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-details';
import { IProgramNotificationModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-model';
@Component({
  selector: 'app-card-notifacations',
  templateUrl: './card-notifacations.component.html',
  styleUrls: ['./card-notifacations.component.scss']
})
export class CardNotifacationsComponent implements OnInit {

  constructor(public translate: TranslateService) { }
  @Output() deleteCardNotify = new EventEmitter<string>();
  @Output() editCardNotify = new EventEmitter<IProgramNotificationModel>();
  @Input() notificationsCardDetails: IProgramNotificationDetails = {};

  lang = LanguageEnum;


  ngOnInit(): void {

  }

  deleteCard() {
    this.deleteCardNotify.emit(this.notificationsCardDetails.id);
  }
  editCard() {
    this.editCardNotify.emit(this.notificationsCardDetails);
  }


}
