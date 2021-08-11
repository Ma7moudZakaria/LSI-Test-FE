import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProgramSubscriptionRoutingModule } from './student-program-subscription-routing.module';
import { StudentProgramSubViewComponent } from './student-program-sub-view/student-program-sub-view.component';
import { StudentProgramsComponent } from './student-programs/student-programs.component';
import { SubscriptionSubmitComponent } from './student-program-sub-view/subscription-submit/subscription-submit.component';
import { StudentProgramSubDetailsComponent } from './student-program-sub-view/student-program-sub-details/student-program-sub-details.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import { PredefinedConditionOverlayComponent } from './student-program-sub-view/predefined-condition-overlay/predefined-condition-overlay.component';
import { JoiningExamOverlayComponent } from './student-program-sub-view/joining-exam-overlay/joining-exam-overlay.component';
import { CustomConditionOverlayComponent } from './student-program-sub-view/custom-condition-overlay/custom-condition-overlay.component';


@NgModule({
  declarations: [StudentProgramSubViewComponent, StudentProgramsComponent, SubscriptionSubmitComponent, StudentProgramSubDetailsComponent, PredefinedConditionOverlayComponent, JoiningExamOverlayComponent, CustomConditionOverlayComponent],
  imports: [
    CommonModule,
    StudentProgramSubscriptionRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class StudentProgramSubscriptionModule { }
