import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-quesion-bank-view',
  templateUrl: './quesion-bank-view.component.html',
  styleUrls: ['./quesion-bank-view.component.scss']
})
export class QuesionBankViewComponent implements OnInit {
  selectedQuestionId: string | undefined;
  selectedCategoryId = { id: '', arabCatgName: '', engCatgName: '' };
  categoryId: string | undefined;
  inputCategoryId: string | undefined;
  @Input() isViewAdd?: boolean;
  @Input() closeCategoryForm?: boolean;
  @Input() closeQuestionForm?: boolean;
  showAddQuestionForm = false;
  submitSuccess: boolean = true;
  showAddCategoryForm = false;
  showAddscientificProblemForm = false;
  addCategory = false;
  isQuestionSave = false;
  constructor(public translate: TranslateService,
    private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.setCurrentLang();
  }

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle() {
    this.languageService.headerPageNameEvent.emit(this.translate.instant('QUESTION_BANK.TITLE'));
  }

  addNew() {
    this.selectedQuestionId = '';
  }

  loadSelectedQuesion(event: any) {
    this.selectedQuestionId = event;
    this.showAddQuestionForm = true;
    this.isQuestionSave = false;
  }

  setSelectedCategory(event: any) {
    this.selectedCategoryId = { id: event.id, arabCatgName: event.arabCatgName, engCatgName: event.engCatgName };
    this.categoryId = event.id;
    this.addCategory = false;
    this.isQuestionSave = false;
  }

  closeAddQuestionForm() {
    this.showAddQuestionForm = false;
  }

  closeAddQuestionFormAfterSave(event: any) {
    this.showAddQuestionForm = false;
    // this.submitSuccess = event; 
    // this.showAddQuestionForm = !event;
  }

  setInputCategoryId(event: any) {
    this.inputCategoryId = event;
    this.showAddCategoryForm = true;
  }

  loadListAfterAddCategory(event: any) {
    this.addCategory = event;
  }

  loadListAfterAddQuestion() {
    this.isQuestionSave = true;
  }

  closeAddCategoryForm() {
    this.showAddCategoryForm = false;
  }

  closeAddCategoryFormAfterSave(event: any) {
    // this.submitSuccess = event; 
    // this.showAddCategoryForm = !event;
    this.showAddCategoryForm = false;

  }
}
