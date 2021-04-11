import { AuthGuard } from './../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentManagementSystemViewComponent } from './components/content-management-system-view/content-management-system-view.component';
import { ContentManagementSystemComponent } from './components/content-management-system-view/content-management-system/content-management-system';
import { ViewAllContentManagementComponent } from './components/view-all-content-management/view-all-content-management';
import { HasUnsavedDataGuard } from 'src/app/core/guards/HasUnsavedDataGuard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'create-content-management', component: ContentManagementSystemComponent },
      { path: 'update-content-management/:id', component: ContentManagementSystemComponent },
      { path: 'view-all-content-management', component: ViewAllContentManagementComponent },
      // { path: 'content-management-system-view', component: ContentManagementSystemViewComponent },
      { path: 'content-management-system-view', component: ContentManagementSystemViewComponent, canDeactivate: [HasUnsavedDataGuard] },



      // {
      //   path: ':id', component: ContentManagementSystemViewComponent,
      //   children: [
      //     { path: 'view-all-content-management', component: ContentManagementSystemComponent, canDeactivate: [HasUnsavedDataGuard] }


      //   ]
      // }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManagementRoutingModule { }
