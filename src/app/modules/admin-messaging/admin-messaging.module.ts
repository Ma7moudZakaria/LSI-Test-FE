import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMessagingRoutingModule } from './admin-messaging-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminMessagingViewComponent } from './components/admin-messaging-view.component';
import { ScientificProblemsComponent } from './components/scientific-problems-view/scientific-problems/scientific-problems.component';
import { AddScientifiProblemReplyComponent } from './components/scientific-problems-view/add-scientifi-problem-reply/add-scientifi-problem-reply.component';
import { AddScientifiProblemToQuestionBankComponent } from './components/scientific-problems-view/add-scientifi-problem-to-question-bank/add-scientifi-problem-to-question-bank.component';


@NgModule({
  declarations: [AdminMessagingViewComponent, ScientificProblemsComponent, AddScientifiProblemReplyComponent, AddScientifiProblemToQuestionBankComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    MatIconModule,
    AdminMessagingRoutingModule
  ]
})
export class AdminMessagingModule { }
