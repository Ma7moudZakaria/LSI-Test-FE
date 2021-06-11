import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeelingsRoutingModule } from './feelings-routing.module';
import { FeelingsViewComponent } from './feelings-view/feelings-view.component';
import { ListFeelingsComponent } from './feelings-view/list-feelings/list-feelings.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FeelingsViewComponent, ListFeelingsComponent],
  imports: [
    CommonModule,
    FeelingsRoutingModule,
    SharedModule
  ]
})
export class FeelingsModule { }
