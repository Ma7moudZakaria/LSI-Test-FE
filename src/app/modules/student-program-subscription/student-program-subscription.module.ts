import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProgramSubscriptionRoutingModule } from './student-program-subscription-routing.module';
import { StudentProgramSubViewComponent } from './student-program-sub-view/student-program-sub-view.component';
import { StudentProgramsComponent } from './student-programs/student-programs.component';
import { SubscriptionSubmitComponent } from './student-program-sub-view/subscription-submit/subscription-submit.component';
import { StudentProgramSubDetailsComponent } from './student-program-sub-view/student-program-sub-details/student-program-sub-details.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [StudentProgramSubViewComponent, StudentProgramsComponent, SubscriptionSubmitComponent, StudentProgramSubDetailsComponent],
  imports: [
    CommonModule,
    StudentProgramSubscriptionRoutingModule,
    SharedModule
  ]
})
export class StudentProgramSubscriptionModule { }
