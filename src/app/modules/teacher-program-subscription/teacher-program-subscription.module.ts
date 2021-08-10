import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherProgramSubscriptionRoutingModule } from './teacher-program-subscription-routing.module';
import { TeacherProgramsComponent } from './teacher-programs/teacher-programs.component';
import { TeacherProgramSubViewComponent } from './teacher-program-sub-view/teacher-program-sub-view.component';
import { SharedModule } from '../../shared/shared.module';
import { TeacherProgramSubDetailsComponent } from './teacher-program-sub-view/teacher-program-sub-details/teacher-program-sub-details.component';


@NgModule({
  declarations: [TeacherProgramsComponent, TeacherProgramSubViewComponent, TeacherProgramSubDetailsComponent],
  imports: [
    CommonModule,
    TeacherProgramSubscriptionRoutingModule,
    SharedModule,
  ]
})
export class TeacherProgramSubscriptionModule { }
