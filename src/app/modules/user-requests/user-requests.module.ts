import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRequestsRoutingModule } from './user-requests-routing.module';
import { UserRequestsViewComponent } from './components/user-requests-view/user-requests-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuestionBankRoutingModule } from '../question-bank/question-bank-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserRequestViewComponent } from './components/user-requests-view/user-requests-view/user-requests-questions-view.component';
import { UserRequestsCategoriesViewComponent } from './components/user-requests-view/user-requests-categories-view/user-requests-categories-view.component';


@NgModule({
  declarations: [UserRequestsViewComponent , UserRequestsCategoriesViewComponent , UserRequestViewComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    QuestionBankRoutingModule, TranslateModule, MatTooltipModule
  ], providers: [MatTooltipModule]
})
export class UserRequestsModule { }
