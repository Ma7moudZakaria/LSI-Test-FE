import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-messaging-view',
  templateUrl: './admin-messaging-view.component.html',
  styleUrls: ['./admin-messaging-view.component.scss']
})
export class AdminMessagingViewComponent implements OnInit {
  showtap:string='ROLES';
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
