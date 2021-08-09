import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherProgramSubscriptionRoutingModule } from './teacher-program-subscription-routing.module';
import { TeacherProgramsComponent } from './teacher-programs/teacher-programs.component';
import { TeacherProgramSubViewComponent } from './teacher-program-sub-view/teacher-program-sub-view.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [TeacherProgramsComponent, TeacherProgramSubViewComponent],
  imports: [
    CommonModule,
    TeacherProgramSubscriptionRoutingModule,
    SharedModule
  ]
})
export class TeacherProgramSubscriptionModule { }
