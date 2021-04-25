import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { ViewTeacherProfileComponent } from './components/view-teacher-profile/view-teacher-profile.component';
import { UpdateTeacherProfileComponent } from './components/update-teacher-profile/update-teacher-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ViewTeacherProfileComponent, UpdateTeacherProfileComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatTooltipModule,
    MatRadioModule, SharedModule

  ], providers: [MatTooltipModule],
  exports: [ViewTeacherProfileComponent]
})
export class TeacherModule { }
