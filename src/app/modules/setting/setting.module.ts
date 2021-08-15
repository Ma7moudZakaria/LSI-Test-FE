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
import { ProgramCategoriesComponent } from './components/program-categories/program-categories.component';
import { ViewProgramCategoriesComponent } from './components/program-categories/view-program-categories/view-program-categories.component';
import { AddProgramCategoriesComponent } from './components/program-categories/add-program-categories/add-program-categories.component';


@NgModule({
  declarations: [SettingDashboardComponent, ProgramConditionSettingComponent, AddConditionSettingComponent, ViewConditionSettingComponent, ProgramCategoriesComponent, ViewProgramCategoriesComponent, AddProgramCategoriesComponent],
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
