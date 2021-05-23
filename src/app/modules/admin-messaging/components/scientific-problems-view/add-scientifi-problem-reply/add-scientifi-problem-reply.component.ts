import { transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAddScProbReply } from 'src/app/core/interfaces/scientific-problrm/iadd-sc-prob-reply';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';

@Component({
  selector: 'app-add-scientifi-problem-reply',
  templateUrl: './add-scientifi-problem-reply.component.html',
  styleUrls: ['./add-scientifi-problem-reply.component.scss']
})
export class AddScientifiProblemReplyComponent implements OnInit {

  @Output() closeAddReplyToScProblem = new EventEmitter<IScientificProblemGridItems>();

  @Input() scProbObjForAddReplyView: IScientificProblemGridItems = {}

  resultMessage: BaseMessageModel = {};

  constructor(public tranlste: TranslateService,
    private scientificProblemService: ScientificProblemService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  closeAddReplyEvent() {
    this.closeAddReplyToScProblem.emit();
  }

  saveReplyToScientificProble() {
    let model: IAddScProbReply = {
      id: this.scProbObjForAddReplyView?.id,
      reply: this.scProbObjForAddReplyView?.repText
    };

    if (model.reply) {
      this.scientificProblemService.addScientificProblemReply(model).subscribe(res => {
        if (res.isSuccess) {
          this.alertify.success(res.message || '');
          this.closeAddReplyToScProblem.emit();
        }
        else {
          this.resultMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      }, error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
    }
    else {
      this.resultMessage = {
        message: this.tranlste.instant('SCIENTIFIC_PROBLEM.ENTER_REPLAY'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }

  }

}
