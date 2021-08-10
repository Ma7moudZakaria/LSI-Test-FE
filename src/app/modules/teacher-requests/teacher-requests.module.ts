import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRequestsTeacherViewRoutingModule } from './teacher-requests-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { TeacherRequestsViewComponent } from './teacher-requests-view/teacher-requests-view.component';
import { TeacherRequestsViewListComponent } from './teacher-requests-view/teacher-requests-view-list/teacher-requests-view-list.component';
import { TeacherRequestsViewDetailsComponent } from './teacher-requests-view/teacher-requests-view-details/teacher-requests-view-details.component';
import { TeacherJoinRequestComponent } from './teacher-requests-view/teacher-requests-view-details/teacher-join-request/teacher-join-request.component';
import { TeacherDropOutRequestComponent } from './teacher-requests-view/teacher-requests-view-details/teacher-drop-out-request/teacher-drop-out-request.component';
import { AddDropOutRequestComponent } from './teacher-requests-view/teacher-requests-view-details/teacher-drop-out-request/add-drop-out-request/add-drop-out-request.component';
import { DropOutRequestGridComponent } from './teacher-requests-view/teacher-requests-view-details/teacher-drop-out-request/drop-out-request-grid/drop-out-request-grid.component';


@NgModule({
  declarations: [TeacherRequestsViewComponent, TeacherRequestsViewListComponent, TeacherRequestsViewDetailsComponent, TeacherJoinRequestComponent, TeacherDropOutRequestComponent, AddDropOutRequestComponent, DropOutRequestGridComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    MatIconModule,
    TeacherRequestsTeacherViewRoutingModule
  ]
})
export class TeacherRequestsTeacherViewModule { }
