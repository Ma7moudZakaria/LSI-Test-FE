import {Component, OnInit, ViewChild} from '@angular/core';
import {IScientificProblemGridItems} from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';
import {ScientificProblemsComponent} from './scientific-problems/scientific-problems.component';
import {IScientificProblemFilter} from '../../../../core/interfaces/scientific-problrm/iscientific-problem-filter';

@Component({
  selector: 'app-scientific-problems-view',
  templateUrl: './scientific-problems-view.component.html',
  styleUrls: ['./scientific-problems-view.component.scss']
})
export class ScientificProblemsViewComponent implements OnInit {
  @ViewChild(ScientificProblemsComponent) scientificProblmChild:ScientificProblemsComponent | undefined;

  showAddReplyOverlay = false;
  showAddScProbToQuestionBankOverlay = false;
  scProbObjForAddReplyView : IScientificProblemGridItems = {}
  scProbObjForAddToQuestionBankView : IScientificProblemGridItems = {}
  openAdvancedSearch: boolean = false
  filter: IScientificProblemFilter = {skip : 0, take : 12, sorField : '', ordType: 1, page : 1};

  constructor() { }

  ngOnInit(): void {
  }

  showAddReplyToScProblemView(event : IScientificProblemGridItems){
    this.scProbObjForAddReplyView = event;
    this.showAddReplyOverlay = !this.showAddReplyOverlay;

    if (!this.showAddReplyOverlay) {this.scientificProblmChild?.getScientificProblems();}
  }

  showAddScProbToQuestionBankView(event : IScientificProblemGridItems){
    this.scProbObjForAddToQuestionBankView = event;
    this.showAddScProbToQuestionBankOverlay = !this.showAddScProbToQuestionBankOverlay;

    if (!this.showAddScProbToQuestionBankOverlay) {this.scientificProblmChild?.getScientificProblems();}
  }

  closeOverlay(){
    this.showAddReplyOverlay = false;
    this.showAddScProbToQuestionBankOverlay = false;
    this.scientificProblmChild?.getScientificProblems();
  }

  closeAdvancedSearch(event: IScientificProblemFilter) {
    this.openAdvancedSearch = false;
    this.filter = event
    this.scientificProblmChild?.getScientificProblems();
  }


  openAdvancedSearchPopup(event: IScientificProblemFilter) {
    this.openAdvancedSearch = true;
    this.filter = event

  }
}
