import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamFormRoutingModule } from './exam-form-routing.module';

import { ExamFormViewComponent } from './components/exam-form-view/exam-form-view.component';
import { AddExamComponent } from './components/exam-form-view/add-exam/add-exam.component';
import { ExamViewComponent } from './components/exam-form-view/exam-view/exam-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';




@NgModule({
  declarations: [AddExamComponent, ExamViewComponent, ExamFormViewComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ExamFormRoutingModule,
     TranslateModule
  ]
})
export class ExamFormModule { }
