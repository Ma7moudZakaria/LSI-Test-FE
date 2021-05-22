import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IQuestionBankCategoriesFilter } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-filter-.request';
import { IQuestionBankCategoriesModel } from 'src/app/core/interfaces/questionBankCategories-interfaces/iquestion-bank-categories-model';
import { IAddScProbToQuestionBank } from 'src/app/core/interfaces/scientific-problrm/iadd-sc-prob-to-question-bank';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { QuestionBankCategoryService } from 'src/app/core/services/question-bank-services/question-bank-category.service';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';
import { LanguageServiceHost } from 'typescript';

@Component({
  selector: 'app-add-scientifi-problem-to-question-bank',
  templateUrl: './add-scientifi-problem-to-question-bank.component.html',
  styleUrls: ['./add-scientifi-problem-to-question-bank.component.scss']
})
export class AddScientifiProblemToQuestionBankComponent implements OnInit {

  @Output() closeAddScProblemToQuestionBankView = new EventEmitter<IScientificProblemGridItems>();

  @Input() scProbObjForAddToQuestionBankView: IScientificProblemGridItems = {}

  resultMessage: BaseMessageModel = {};
  questionBankCategoryFilter: IQuestionBankCategoriesFilter = { skip: 0, take: 2147483647 };
  questionBankCategoryList: IQuestionBankCategoriesModel[] = [];
  selectedCategory: IQuestionBankCategoriesModel | undefined;
  langEnum = LanguageEnum

  constructor(public translate: TranslateService,
    private questionBankService: QuestionBankQuestionService,
    private questionBankCategoryService: QuestionBankCategoryService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.getQuestionBankCategories();
  }

  closeAddScProblemToQuestionBankEvent() {
    this.closeAddScProblemToQuestionBankView.emit();
  }

  getQuestionBankCategories() {
    this.questionBankCategoryService.getQuestionBankCategoriesFilter(this.questionBankCategoryFilter).subscribe(res => {
      if (res.isSuccess) {
        this.questionBankCategoryList = res.data;
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }

  saveScProblemToQuestionBank() {
    let model: IAddScProbToQuestionBank = {
      id: this.scProbObjForAddToQuestionBankView.id,
      question: this.scProbObjForAddToQuestionBankView?.questText,
      reply: this.scProbObjForAddToQuestionBankView?.repText,
      catId: this.selectedCategory?.id
    };

    if (model.catId) {
      this.questionBankService.moveScProbToQuestionBank(model).subscribe(res => {
        if (res.isSuccess) {
          this.alertify.success(res.message || '');
          this.closeAddScProblemToQuestionBankView.emit();
        }
        else {
          this.resultMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      }, error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
    }
    else {
      this.resultMessage = {
        message: this.translate.instant('dfgdfg'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }

}
