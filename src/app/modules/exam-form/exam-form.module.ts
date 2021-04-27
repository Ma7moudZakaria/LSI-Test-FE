import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamFormRoutingModule } from './exam-form-routing.module';

import { ExamFormViewComponent } from './components/exam-form-view/exam-form-view.component';
import { AddExamComponent } from './components/exam-form-view/add-exam/add-exam.component';
import { ExamViewComponent } from './components/exam-form-view/exam-view/exam-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AttacheExamTemplateComponent } from './components/exam-form-view/attache-exam-template/attache-exam-template.component';




@NgModule({
  declarations: [AddExamComponent, ExamViewComponent, ExamFormViewComponent, AttacheExamTemplateComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ExamFormRoutingModule,
     TranslateModule
     , MatTooltipModule
  ], providers: [MatTooltipModule]
})
export class ExamFormModule { }
