import { ProgramConditionSettingComponent } from './components/program-condition-setting/program-condition-setting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingDashboardComponent } from './components/setting-dashboard/setting-dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [

      { path: 'setting-dashboard', component: SettingDashboardComponent },
      { path: 'prog-cond-sett', component: ProgramConditionSettingComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
