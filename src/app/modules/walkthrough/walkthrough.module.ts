import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalkthroughRoutingModule } from './walkthrough-routing.module';
import { WalkThroughComponent } from './components/walk-through/walk-through';
import { ViewAllWalkThroughComponent } from './components/view-all-walk-through/view-all-walk-through';


@NgModule({
  declarations: [WalkThroughComponent,ViewAllWalkThroughComponent],
  imports: [
    CommonModule,
    WalkthroughRoutingModule
  ]
})
export class WalkthroughModule { }
