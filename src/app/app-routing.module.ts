import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'questionBank', loadChildren: () => import('./modules/question-bank/question-bank.module').then(m => m.QuestionBankModule) },
  {path: 'scientific-material', loadChildren: () => import('./modules/scientific-material/scientific-material.module').then(m => m.ScientificMaterialModule)},
  { path: 'shared', loadChildren: () => import('./modules/shared-material/shared-material.module').then(m => m.SharedMaterialModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
