import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingDashboardComponent } from './components/setting-dashboard/setting-dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'setting-dashboard', component: SettingDashboardComponent}],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
