import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingDashboardComponent } from './components/setting-dashboard/setting-dashboard.component';


@NgModule({
  declarations: [SettingDashboardComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports: [SettingDashboardComponent]
})
export class SettingModule { }
