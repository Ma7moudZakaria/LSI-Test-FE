import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExamComponent } from './components/exam-form-view/add-exam/add-exam.component';
import { ExamFormViewComponent } from './components/exam-form-view/exam-form-view.component';
import { ExamViewComponent } from './components/exam-form-view/exam-view/exam-view.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'exam-form-view', component: ExamFormViewComponent},
     
     ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamFormRoutingModule { }
