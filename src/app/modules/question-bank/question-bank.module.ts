import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionBankRoutingModule } from './question-bank-routing.module';
import { QuestionBankCategoryDetailsComponent } from './components/question-bank-category-details/question-bank-category-details.component';
import { QuestionBankQuestionDetailsComponent } from './components/question-bank-question-details/question-bank-question-details.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuesionBankViewComponent } from './components/quesion-bank-view/quesion-bank-view.component';
import { QuestionBankCategoriesViewComponent } from './components/quesion-bank-view/question-bank-categories-view/question-bank-categories-view.component';
import { AddQuestionBankQuestionComponent } from './components/quesion-bank-view/add-question-bank-question/add-question-bank-question.component';
import { QuestionBankQuestionsViewComponent } from './components/quesion-bank-view/question-bank-questions-view/question-bank-questions-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddQuestionBankCategoryComponent } from './components/quesion-bank-view/add-question-bank-category/add-question-bank-category.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AddQuestionBankCategoryComponent, QuestionBankCategoriesViewComponent, QuestionBankCategoryDetailsComponent, AddQuestionBankQuestionComponent,
    QuestionBankQuestionsViewComponent, QuestionBankQuestionDetailsComponent, QuesionBankViewComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    QuestionBankRoutingModule, TranslateModule, MatTooltipModule
  ], providers: [MatTooltipModule]
})
export class QuestionBankModule { }
