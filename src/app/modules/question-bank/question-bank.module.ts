import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionBankRoutingModule } from './question-bank-routing.module';
import { AddQuestionBankCategoryComponent } from './components/add-question-bank-category/add-question-bank-category.component';
import { QuestionBankCategoriesViewComponent } from './components/question-bank-categories-view/question-bank-categories-view.component';
import { QuestionBankCategoryDetailsComponent } from './components/question-bank-category-details/question-bank-category-details.component';
import { AddQuestionBankQuestionComponent } from './components/add-question-bank-question/add-question-bank-question.component';
import { QuestionBankQuestionsViewComponent } from './components/question-bank-questions-view/question-bank-questions-view.component';
import { QuestionBankQuestionDetailsComponent } from './components/question-bank-question-details/question-bank-question-details.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@NgModule({
  declarations: [AddQuestionBankCategoryComponent, QuestionBankCategoriesViewComponent, QuestionBankCategoryDetailsComponent, AddQuestionBankQuestionComponent, QuestionBankQuestionsViewComponent, QuestionBankQuestionDetailsComponent],
  imports: [
    CommonModule,
    QuestionBankRoutingModule, TranslateModule
  ]
})
export class QuestionBankModule { }
