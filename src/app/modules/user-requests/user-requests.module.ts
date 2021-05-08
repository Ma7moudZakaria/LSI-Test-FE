import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestsViewComponent } from './components/user-requests-view/user-requests-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserScientificProblemComponent } from './components/user-requests-view/user-scientific-problem/user-scientific-problem.component';
import { UserRequestsCategoriesViewComponent } from './components/user-requests-view/user-requests-categories-view/user-requests-categories-view.component';
import { UserRequestsRoutingModule } from './user-requests-routing.module';
import { UserWithdrawalRequestsComponent } from './components/user-requests-view/user-withdrawal-requests/user-withdrawal-requests.component';
import { UserJoinRequestsComponent } from './components/user-requests-view/user-join-requests/user-join-requests.component';


@NgModule({
  declarations: [UserRequestsViewComponent , UserRequestsCategoriesViewComponent , UserWithdrawalRequestsComponent , UserJoinRequestsComponent, UserScientificProblemComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRequestsRoutingModule, TranslateModule, MatTooltipModule
  ], providers: [MatTooltipModule]
})
export class UserRequestsModule { }
