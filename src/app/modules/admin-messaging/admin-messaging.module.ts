import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMessagingRoutingModule } from './admin-messaging-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminMessagingViewComponent } from './components/admin-messaging-view/admin-messaging-view.component';
import { ScientificProblemsComponent } from './components/admin-messaging-view/scientific-problems/scientific-problems.component';


@NgModule({
  declarations: [AdminMessagingViewComponent, ScientificProblemsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    MatIconModule,
    AdminMessagingRoutingModule
  ]
})
export class AdminMessagingModule { }
