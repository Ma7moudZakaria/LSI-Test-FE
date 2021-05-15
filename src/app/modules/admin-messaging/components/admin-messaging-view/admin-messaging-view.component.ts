import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';
import { ScientificProblemsComponent } from './scientific-problems/scientific-problems.component';

@Component({
  selector: 'app-admin-messaging-view',
  templateUrl: './admin-messaging-view.component.html',
  styleUrls: ['./admin-messaging-view.component.scss']
})
export class AdminMessagingViewComponent implements OnInit {
  
  @ViewChild(ScientificProblemsComponent) scientificProblmChild:ScientificProblemsComponent | undefined;
  
  showtap:string='scientificProblem';
  showAddReplyOverlay = false;
  scProbObjForAddReplyView : IScientificProblemGridItems = {}

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  showAddReplyToScProblem(event : IScientificProblemGridItems){
    this.scProbObjForAddReplyView = event;
    this.showAddReplyOverlay = !this.showAddReplyOverlay;

    if (!this.showAddReplyOverlay) {this.scientificProblmChild?.getScientificProblems();}
  }
}
