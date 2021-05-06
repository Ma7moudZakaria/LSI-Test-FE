import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestsViewComponent } from './components/user-requests-view/user-requests-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuestionBankRoutingModule } from '../question-bank/question-bank-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserScientificProblemComponent } from './components/user-requests-view/user-scientific-problem/user-scientific-problem.component';
import { UserRequestsCategoriesViewComponent } from './components/user-requests-view/user-requests-categories-view/user-requests-categories-view.component';


@NgModule({
  declarations: [UserRequestsViewComponent , UserRequestsCategoriesViewComponent , UserScientificProblemComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    QuestionBankRoutingModule, TranslateModule, MatTooltipModule
  ], providers: [MatTooltipModule]
})
export class UserRequestsModule { }
