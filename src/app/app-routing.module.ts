
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
  { path: 'teacher', loadChildren: () => import('./modules/teacher/teacher.module').then(m => m.TeacherModule) },
  { path: 'question-bank', loadChildren: () => import('./modules/question-bank/question-bank.module').then(m => m.QuestionBankModule), canActivate: [AuthGuard] },
  { path: 'scientific-material', loadChildren: () => import('./modules/scientific-material/scientific-material.module').then(m => m.ScientificMaterialModule), canActivate: [AuthGuard] },
  { path: 'shared', loadChildren: () => import('./modules/shared-material/shared-material.module').then(m => m.SharedMaterialModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'content-management', loadChildren: () => import('./modules/content-management/content-management.module').then(m => m.ContentManagementModule) },
  { path: 'walk-through', loadChildren: () => import('./modules/walkthrough/walkthrough.module').then(m => m.WalkthroughModule) },
  { path: 'setting', loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule) },
  { path: 'exam-form', loadChildren: () => import('./modules/exam-form/exam-form.module').then(m => m.ExamFormModule), canActivate: [AuthGuard] },
  { path: 'role-management', loadChildren: () => import('./modules/role-management/role-management.module').then(m => m.RoleManagementModule), canActivate: [AuthGuard] },
  { path: 'user-requests', loadChildren: () => import('./modules/user-requests/user-requests.module').then(m => m.UserRequestsModule), canActivate: [AuthGuard] },
  { path: 'admin-messaging', loadChildren: () => import('./modules/admin-messaging/admin-messaging.module').then(m => m.AdminMessagingModule), canActivate: [AuthGuard] },

  { path: 'feelings', loadChildren: () => import('./modules/feelings/feelings.module').then(m => m.FeelingsModule), canActivate: [AuthGuard] },

  { path: 'program', loadChildren: () => import('./modules/program/program.module').then(m => m.ProgramModule), canActivate: [AuthGuard] },
  { path: 'student-programs', loadChildren: () => import('./modules/student-programs/student-programs.module').then(m => m.StudentProgramsModule), canActivate: [AuthGuard] },
  { path: 'program-for-subscription', loadChildren: () => import('./modules/teacher-program-subscription/teacher-program-subscription.module').then(m => m.TeacherProgramSubscriptionModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
