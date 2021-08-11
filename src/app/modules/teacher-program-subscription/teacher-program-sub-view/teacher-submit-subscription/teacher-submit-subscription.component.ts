import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IScientificProblemGridItems} from '../../../../core/interfaces/scientific-problrm/iscientific-problem-grid-items';
import {BaseMessageModel} from '../../../../core/ng-model/base-message-model';
import {IQuestionBankCategoriesFilter} from '../../../../core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-filter-.request';
import {IQuestionBankCategoriesModel} from '../../../../core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
import {LanguageEnum} from '../../../../core/enums/language-enum.enum';
import {TranslateService} from '@ngx-translate/core';
import {QuestionBankQuestionService} from '../../../../core/services/question-bank-services/question-bank-question.service';
import {QuestionBankCategoryService} from '../../../../core/services/question-bank-services/question-bank-category.service';
import {AlertifyService} from '../../../../core/services/alertify-services/alertify.service';
import {BaseConstantModel} from '../../../../core/ng-model/base-constant-model';
import {IAddScProbToQuestionBank} from '../../../../core/interfaces/scientific-problrm/iadd-sc-prob-to-question-bank';

@Component({
  selector: 'app-teacher-submit-subscription',
  templateUrl: './teacher-submit-subscription.component.html',
  styleUrls: ['./teacher-submit-subscription.component.scss']
})
export class TeacherSubmitSubscriptionComponent implements OnInit {

  @Output() closeOverlay = new EventEmitter<boolean>();



  resultMessage: BaseMessageModel = {};

  langEnum = LanguageEnum

  constructor(public translate: TranslateService,) { }

  ngOnInit(): void {

  }

  closeSubsOverlay() {
    this.closeOverlay.emit(false);
  }





}
