import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStuTabRoutingModule } from './admin-stu-tab-routing.module';
import { AdminStuListComponent } from './admin-stu-tab/admin-stu-list/admin-stu-list.component';
import { AdminStuTabsDetailsComponent } from './admin-stu-tab/admin-stu-tabs-details/admin-stu-tabs-details.component';
import { AdminStuBasicInfoComponent } from './admin-stu-tab/admin-stu-tabs-details/admin-stu-basic-info/admin-stu-basic-info.component';
import { AdminStuProgramsComponent } from './admin-stu-tab/admin-stu-tabs-details/admin-stu-programs/admin-stu-programs.component';
import { AdminStuDropOutComponent } from './admin-stu-tab/admin-stu-tabs-details/admin-stu-drop-out/admin-stu-drop-out.component';
import { AdminStuVacationRequestComponent } from './admin-stu-tab/admin-stu-tabs-details/admin-stu-vacation-request/admin-stu-vacation-request.component';
import { AdminStuJoinRequestComponent } from './admin-stu-tab/admin-stu-tabs-details/admin-stu-join-request/admin-stu-join-request.component';
import { AdminStuTabComponent } from './admin-stu-tab/admin-stu-tab.component';


@NgModule({
  declarations: [AdminStuListComponent, AdminStuTabsDetailsComponent, AdminStuBasicInfoComponent, AdminStuProgramsComponent, AdminStuDropOutComponent, AdminStuVacationRequestComponent, AdminStuJoinRequestComponent, AdminStuTabComponent],
  imports: [
    CommonModule,
    AdminStuTabRoutingModule
  ]
})
export class AdminStuTabModule { }
