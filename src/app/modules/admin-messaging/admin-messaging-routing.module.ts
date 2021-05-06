import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMessagingViewComponent } from './components/admin-messaging-view/admin-messaging-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'admin-messaging-view', component: AdminMessagingViewComponent},
     ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMessagingRoutingModule { }
