import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TeacherProgramsComponent } from './teacher-programs-for-subscription/teacher-programs-for-subscription.component';
import { TeacherProgramSubViewComponent } from './teacher-program-sub-view/teacher-program-sub-view.component';
import { TeacherProgramSubDetailsComponent } from './teacher-program-sub-view/teacher-program-sub-details/teacher-program-sub-details.component';
import { TeacherSubmitSubscriptionComponent } from './teacher-program-sub-view/teacher-submit-subscription/teacher-submit-subscription.component';
import { TeacherProgramSubscriptionRoutingModule } from './teacher-program-subscription-routing.module';


@NgModule({
  declarations: [TeacherProgramsComponent, TeacherProgramSubViewComponent, TeacherProgramSubDetailsComponent, TeacherSubmitSubscriptionComponent],
  imports: [
    CommonModule,
    TeacherProgramSubscriptionRoutingModule,
    SharedModule, TranslateModule
  ]
})
export class TeacherProgramSubscriptionModule { }
