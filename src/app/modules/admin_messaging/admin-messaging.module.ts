import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMessagingRoutingModule } from './admin-messaging-routing.module';
import { AdminMessagingViewComponent } from './components/admin-messaging-view/admin-messaging-view.component';
import { ScientificProblemsComponent } from './components/admin-messaging-view/scientific-problems/scientific-problems.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AdminMessagingViewComponent, ScientificProblemsComponent],
  imports: [
    CommonModule,
    AdminMessagingRoutingModule,SharedModule,
    FormsModule,  ReactiveFormsModule,TranslateModule
  ]
})
export class AdminMessagingModule { }
