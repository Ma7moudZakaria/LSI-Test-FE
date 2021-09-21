import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRecitationRoutingModule } from './teacher-recitation-routing.module';
import { TeacherRecitationGroupsComponent } from './components/teacher-recitation-wrapper/teacher-recitation-groups/teacher-recitation-groups.component';
import { TeacherRecitationGroupSelectedComponent } from './components/teacher-recitation-wrapper/teacher-recitation-group-selected/teacher-recitation-group-selected.component';
import { TeacherRecitationJoinRequestComponent } from './components/teacher-recitation-wrapper/teacher-recitation-join-request/teacher-recitation-join-request.component';
import { AddNewGroupTeacherRecitationComponent } from './components/teacher-recitation-wrapper/add-new-group-teacher-recitation/add-new-group-teacher-recitation.component';
import { TeacherRecitationWrapperComponent } from './components/teacher-recitation-wrapper/teacher-recitation-wrapper.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [TeacherRecitationGroupsComponent, TeacherRecitationGroupSelectedComponent, TeacherRecitationJoinRequestComponent, AddNewGroupTeacherRecitationComponent, TeacherRecitationWrapperComponent],
  imports: [
    CommonModule, SharedModule,
    TeacherRecitationRoutingModule, MatListModule,
    TranslateModule, FormsModule, ReactiveFormsModule

  ]
})
export class TeacherRecitationModule { }
