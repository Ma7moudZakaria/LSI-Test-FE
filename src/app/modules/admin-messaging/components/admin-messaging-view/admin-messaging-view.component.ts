import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';

@Component({
  selector: 'app-admin-messaging-view',
  templateUrl: './admin-messaging-view.component.html',
  styleUrls: ['./admin-messaging-view.component.scss']
})
export class AdminMessagingViewComponent implements OnInit {
  showtap:string='scientificProblem';
  showAddReplyOverlay = false;
  scProbObjForAddReplyView : IScientificProblemGridItems | undefined

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  showAddReplyToScProblem(event : IScientificProblemGridItems){
    this.scProbObjForAddReplyView = event;
    this.showAddReplyOverlay = !this.showAddReplyOverlay;
  }
}
