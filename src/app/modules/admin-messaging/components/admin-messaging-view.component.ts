import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ScientificProblemsComponent } from './scientific-problems-view/scientific-problems/scientific-problems.component';

@Component({
  selector: 'app-admin-messaging-view',
  templateUrl: './admin-messaging-view.component.html',
  styleUrls: ['./admin-messaging-view.component.scss']
})
export class AdminMessagingViewComponent implements OnInit {

  @ViewChild(ScientificProblemsComponent) scientificProblmChild: ScientificProblemsComponent | undefined;

  showtap: string = 'student';
  // showAddReplyOverlay = false;
  // showAddScProbToQuestionBankOverlay = false;
  // scProbObjForAddReplyView : IScientificProblemGridItems = {}
  // scProbObjForAddToQuestionBankView : IScientificProblemGridItems = {}

  constructor(public translate: TranslateService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.setCurrentLang();
  }

  emitHeaderTitle() {
    this.languageService.headerPageNameEvent.emit(this.translate.currentLang == LanguageEnum.ar ? 'المراسلات' : 'Messaging');
  }

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  // showAddReplyToScProblemView(event : IScientificProblemGridItems){
  //   this.scProbObjForAddReplyView = event;
  //   this.showAddReplyOverlay = !this.showAddReplyOverlay;

  //   if (!this.showAddReplyOverlay) {this.scientificProblmChild?.getScientificProblems();}
  // }

  // showAddScProbToQuestionBankView(event : IScientificProblemGridItems){
  //   this.scProbObjForAddToQuestionBankView = event;
  //   this.showAddScProbToQuestionBankOverlay = !this.showAddScProbToQuestionBankOverlay;

  //   if (!this.showAddScProbToQuestionBankOverlay) {this.scientificProblmChild?.getScientificProblems();}
  // }

  // closeOverlay(){
  //   this.showAddReplyOverlay = false;
  //   this.showAddScProbToQuestionBankOverlay = false;
  //   this.scientificProblmChild?.getScientificProblems();
  // }
}
