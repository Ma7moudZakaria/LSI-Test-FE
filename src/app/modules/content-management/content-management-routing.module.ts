import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentManagementSystemViewComponent } from './components/content-management-system-view/content-management-system-view.component';
import { ContentManagementSystemComponent } from './components/content-management-system-view/content-management-system/content-management-system';
import { ViewAllContentManagementComponent } from './components/view-all-content-management/view-all-content-management';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'create-content-management', component: ContentManagementSystemComponent},
      { path: 'update-content-management/:id', component: ContentManagementSystemComponent},
      { path: 'view-all-content-management', component: ViewAllContentManagementComponent},
      { path: 'content-management-system-view', component: ContentManagementSystemViewComponent},
     ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManagementRoutingModule { }
