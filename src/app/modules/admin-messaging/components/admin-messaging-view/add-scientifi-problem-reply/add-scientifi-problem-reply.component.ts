import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';

@Component({
  selector: 'app-add-scientifi-problem-reply',
  templateUrl: './add-scientifi-problem-reply.component.html',
  styleUrls: ['./add-scientifi-problem-reply.component.scss']
})
export class AddScientifiProblemReplyComponent implements OnInit {

  @Output() closeAddReplyToScProblem = new EventEmitter<IScientificProblemGridItems>();

  @Input() scProbObjForAddReplyView : IScientificProblemGridItems | undefined

  constructor(tranlste:TranslateService) { }

  ngOnInit(): void {
  }

  closeAddReplyEvent(){
    this.closeAddReplyToScProblem.emit();
  }

}
