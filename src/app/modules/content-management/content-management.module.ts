import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagementRoutingModule } from './content-management-routing.module';
import { ContentManagementSystemComponent } from './components/content-management-system/content-management-system';
import { ViewAllContentManagementComponent } from './components/view-all-content-management/view-all-content-management';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [ContentManagementSystemComponent,ViewAllContentManagementComponent, HomeComponent],
  imports: [
    CommonModule,
    ContentManagementRoutingModule
  ]
})
export class ContentManagementModule { }
