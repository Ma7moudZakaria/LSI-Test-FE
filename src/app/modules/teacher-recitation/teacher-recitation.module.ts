import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRecitationRoutingModule } from './teacher-recitation-routing.module';
import { TeacherRecitationGroupsComponent } from './components/teacher-recitation-wrapper/teacher-recitation-groups/teacher-recitation-groups.component';
import { TeacherRecitationGroupSelectedComponent } from './components/teacher-recitation-wrapper/teacher-recitation-group-selected/teacher-recitation-group-selected.component';
import { AddNewGroupTeacherRecitationComponent } from './components/teacher-recitation-wrapper/add-new-group-teacher-recitation/add-new-group-teacher-recitation.component';
import { TeacherRecitationWrapperComponent } from './components/teacher-recitation-wrapper/teacher-recitation-wrapper.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { RejectedGroupRequestFormComponent } from './components/teacher-recitation-wrapper/rejected-group-request-form/rejected-group-request-form.component';

@NgModule({
  declarations: [TeacherRecitationGroupsComponent, TeacherRecitationGroupSelectedComponent,
    AddNewGroupTeacherRecitationComponent, TeacherRecitationWrapperComponent, RejectedGroupRequestFormComponent],
  imports: [
    CommonModule, SharedModule,
    TeacherRecitationRoutingModule, MatListModule,
    TranslateModule, FormsModule, ReactiveFormsModule

  ]
})
export class TeacherRecitationModule { }
