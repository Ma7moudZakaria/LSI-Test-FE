import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-user-join-requests',
  templateUrl: './user-join-requests.component.html',
  styleUrls: ['./user-join-requests.component.scss']
})
export class UserJoinRequestsComponent implements OnInit {

  constructor(
     public translate: TranslateService) {
      }

  ngOnInit(): void {
  }

}
