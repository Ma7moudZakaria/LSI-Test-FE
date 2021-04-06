import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagementRoutingModule } from './content-management-routing.module';
import { ContentManagementSystemViewComponent } from './components/content-management-system-view/content-management-system-view.component';
import { ViewAllContentManagementTypeComponent } from './components/content-management-system-view/view-all-content-management-type/view-all-content-management-type.component';
import { HomeComponent } from './components/home/home.component';
import { ViewAllContentManagementComponent } from './components/view-all-content-management/view-all-content-management';
import { ContentManagementSystemComponent } from './components/content-management-system-view/content-management-system/content-management-system';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContentManagementSystemComponent,ViewAllContentManagementComponent, HomeComponent, ContentManagementSystemViewComponent, ViewAllContentManagementTypeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ContentManagementRoutingModule,
    TranslateModule
  ]
})
export class ContentManagementModule { }
