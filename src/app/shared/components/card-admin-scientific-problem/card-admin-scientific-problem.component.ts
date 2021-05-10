import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';

@Component({
  selector: 'app-card-admin-scientific-problem',
  templateUrl: './card-admin-scientific-problem.component.html',
  styleUrls: ['./card-admin-scientific-problem.component.scss']
})
export class CardAdminScientificProblemComponent implements OnInit {

  langEnum = LanguageEnum;

  constructor(public translate:TranslateService) { }
  @Input() scientificProblem: IScientificProblemGridItems = {};
  @Output() deleteScientificProblem = new EventEmitter<string>();

  showAddReplyArea = false;

  ngOnInit(): void {
  }

  showAddReplyAreaTog(){
    this.showAddReplyArea = this.showAddReplyArea ? false : true;
  }

  saveReply(){
    this.showAddReplyAreaTog();
  }

  deleteScientificProblemEve(){
    this.deleteScientificProblem.emit(this.scientificProblem.id);
  }
}
