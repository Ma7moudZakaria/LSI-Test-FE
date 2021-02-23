import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionBankRoutingModule } from './question-bank-routing.module';
import { AddQuestionBankCategoryComponent } from './components/add-question-bank-category/add-question-bank-category/add-question-bank-category.component';
import { QuestionBankCategoriesViewComponent } from './components/question-bank-categories-view/question-bank-categories-view/question-bank-categories-view.component';


@NgModule({
  declarations: [AddQuestionBankCategoryComponent, QuestionBankCategoriesViewComponent],
  imports: [
    CommonModule,
    QuestionBankRoutingModule
  ]
})
export class QuestionBankModule { }
