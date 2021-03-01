import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionBankCategoryComponent } from './components/add-question-bank-category/add-question-bank-category.component';
import { AddQuestionBankQuestionComponent } from './components/add-question-bank-question//add-question-bank-question.component';
import { QuestionBankCategoriesViewComponent } from './components/question-bank-categories-view/question-bank-categories-view.component';
import { QuestionBankCategoryDetailsComponent } from './components/question-bank-category-details/question-bank-category-details.component';
import { QuestionBankQuestionDetailsComponent } from './components/question-bank-question-details/question-bank-question-details.component';
import { QuestionBankQuestionsViewComponent } from './components/question-bank-questions-view/question-bank-questions-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'question-bank-categories-view', component: QuestionBankCategoriesViewComponent},
      { path: 'add-question-bank-category', component: AddQuestionBankCategoryComponent},
      {path: 'edit-question-bank-category/:id' , component: AddQuestionBankCategoryComponent},
      { path: 'question-bank-category-details/:id', component: QuestionBankCategoryDetailsComponent},
      { path: 'question-bank-questions-view', component: QuestionBankQuestionsViewComponent},
      { path: 'add-question-bank-question', component: AddQuestionBankQuestionComponent},
      {path: 'edit-question-bank-question/:id' , component: AddQuestionBankQuestionComponent},
      { path: 'question-bank-question-details/:id', component: QuestionBankQuestionDetailsComponent},
     
     ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionBankRoutingModule { }
