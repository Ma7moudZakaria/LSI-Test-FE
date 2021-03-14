import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalkthroughRoutingModule } from './walkthrough-routing.module';
import { WalkThroughComponent } from './components/view-all-walk-through/walk-through/walk-through';
import { ViewAllWalkThroughComponent } from './components/view-all-walk-through/view-all-walk-through';
import { WalkThroughPagesComponent } from './components/view-all-walk-through/walk-through-pages/walk-through-pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [WalkThroughComponent,ViewAllWalkThroughComponent,WalkThroughPagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    WalkthroughRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class WalkthroughModule { }
