import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherProgramsRoutingModule } from './teacher-programs-routing.module';
import { TeacherProgramWrapperComponent } from './teacher-program-wrapper/teacher-program-wrapper.component';
import { TeacherProgramsComponent } from './teacher-program-wrapper/teacher-programs/teacher-programs.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TeacherProgramWrapperComponent, TeacherProgramsComponent],
  imports: [
    CommonModule,SharedModule,
    TeacherProgramsRoutingModule,TranslateModule
  ]
})
export class TeacherProgramsModule { }
