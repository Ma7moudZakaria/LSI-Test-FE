import { EventEmitter, ViewChild } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IUserScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iuser-scientific-problem-filter';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { UserScientificProblemListViewComponent } from './user-scientific-problem-list-view/user-scientific-problem-list-view.component';
@Component({
  selector: 'app-user-scientific-problem',
  templateUrl: './user-scientific-problem.component.html',
  styleUrls: ['./user-scientific-problem.component.scss']
})
export class UserScientificProblemComponent implements OnInit {

  showAddscientificProblemForm = false;

  @ViewChild(UserScientificProblemListViewComponent) userScientificProbChild:UserScientificProblemListViewComponent | undefined;

  constructor(
     public translate: TranslateService,
     public scientificProblemService: ScientificProblemService,) {
      }

  ngOnInit(): void {
  }

  openScientificProblem(event: boolean) {
    this.showAddscientificProblemForm = event;
  }

  closeScientificProblem(event: boolean) {
    this.showAddscientificProblemForm = event;
    this.userScientificProbChild?.getScientificProblemByUserId();
  }


}
