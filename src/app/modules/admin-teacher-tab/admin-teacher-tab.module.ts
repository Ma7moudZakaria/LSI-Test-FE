import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTeacherTabRoutingModule } from './admin-teacher-tab-routing.module';
import { AdminTeacherListComponent } from './admin-teacher-tab/admin-teacher-list/admin-teacher-list.component';
import { AdminTeacherTabsDetailsComponent } from './admin-teacher-tab/admin-teacher-tabs-details/admin-teacher-tabs-details.component';
import { AdminTeacherJoinRequestComponent } from './admin-teacher-tab/admin-teacher-tabs-details/admin-teacher-join-request/admin-teacher-join-request.component';
import { AdminTeacherProgramComponent } from './admin-teacher-tab/admin-teacher-tabs-details/admin-teacher-program/admin-teacher-program.component';
import { AdminTeacherDropOutComponent } from './admin-teacher-tab/admin-teacher-tabs-details/admin-teacher-drop-out/admin-teacher-drop-out.component';
import { AdminTeacherBasicInfoComponent } from './admin-teacher-tab/admin-teacher-tabs-details/admin-teacher-basic-info/admin-teacher-basic-info.component';
import { AdminTeacherTabComponent } from './admin-teacher-tab/admin-teacher-tab.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AdminTeacherListComponent, AdminTeacherTabsDetailsComponent, AdminTeacherJoinRequestComponent, AdminTeacherProgramComponent, AdminTeacherDropOutComponent, AdminTeacherBasicInfoComponent, AdminTeacherTabComponent],
  imports: [
    CommonModule,
    AdminTeacherTabRoutingModule,
    TranslateModule,
    FormsModule,
    MatCheckboxModule,
    SharedModule
  ]
})
export class AdminTeacherTabModule { }
