import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingDashboardComponent } from './components/setting-dashboard/setting-dashboard.component';
import { ProgramConditionSettingComponent } from './components/program-condition-setting/program-condition-setting.component';
import { AddConditionSettingComponent } from './components/program-condition-setting/add-condition-setting/add-condition-setting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewConditionSettingComponent } from './components/program-condition-setting/view-condition-setting/view-condition-setting.component';


@NgModule({
  declarations: [SettingDashboardComponent, ProgramConditionSettingComponent, AddConditionSettingComponent, ViewConditionSettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TranslateModule, SharedModule
  ],
  exports: [SettingDashboardComponent]
})
export class SettingModule { }
