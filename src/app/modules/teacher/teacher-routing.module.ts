import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateTeacherProfileHasUnsavedDataGuard } from 'src/app/core/guards/update-teacher-profile-has-unsaved-data-guard';
import { UpdateTeacherProfileComponent } from './components/update-teacher-profile/update-teacher-profile.component';
import { ViewTeacherProfileComponent } from './components/view-teacher-profile/view-teacher-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [

      { path: 'update-teacher-profile', component: UpdateTeacherProfileComponent, canDeactivate: [UpdateTeacherProfileHasUnsavedDataGuard] },
      // { path: 'update-teacher-profile-details/:id', component: UpdateTeacherProfileComponent },
      { path: 'view-teacher-profile-details', component: ViewTeacherProfileComponent },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
