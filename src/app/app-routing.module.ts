import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'question-bank', loadChildren: () => import('./modules/question-bank/question-bank.module').then(m => m.QuestionBankModule) },
  { path: 'scientific-material', loadChildren: () => import('./modules/scientific-material/scientific-material.module').then(m => m.ScientificMaterialModule) },
  { path: 'shared', loadChildren: () => import('./modules/shared-material/shared-material.module').then(m => m.SharedMaterialModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'content-management', loadChildren: () => import('./modules/content-management/content-management.module').then(m => m.ContentManagementModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
