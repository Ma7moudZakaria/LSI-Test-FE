import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamFormRoutingModule } from './exam-form-routing.module';
import { AddExamComponent } from './components/exam-form/add-exam/add-exam.component';
import { ExamFormComponent } from './components/exam-form/exam-form.component';
import { ExamViewComponent } from './components/exam-form/exam-view/exam-view.component';




@NgModule({
  declarations: [AddExamComponent, ExamFormComponent, ExamViewComponent],
  imports: [
    CommonModule,
    ExamFormRoutingModule
  ]
})
export class ExamFormModule { }
