import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-quesion-bank-view',
  templateUrl: './quesion-bank-view.component.html',
  styleUrls: ['./quesion-bank-view.component.scss']
})
export class QuesionBankViewComponent implements OnInit {
  selectedQuestionId:string | undefined;
  selectedCategoryId:string|undefined;
  inputCategoryId:string|undefined;
  @Input() isViewAdd?:boolean; 
  @Input() closeCategoryForm?:boolean; 
  @Input() closeQuestionForm?:boolean; 
  showAddQuestionForm = false;
  submitSuccess:any;
  showAddCategoryForm = false;
  constructor(public translate: TranslateService,
    private languageService: LanguageService) {
   }

  ngOnInit(): void {
    this.setCurrentLang();
  }

  setCurrentLang(){
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('QUESTION_BANK.TITLE'));
  }

  addNew(){
    this.selectedQuestionId = '';
  }
  loadSelectedQuesion(event:any){
   this.selectedQuestionId = event;
   this.showAddQuestionForm =true;
  }

  setSelectedCategory(event:any){
    this.selectedCategoryId = event;
  }
  closeAddQuestionForm(){
    this.showAddQuestionForm = false;
  }
  closeAddQuestionFormAfterSave(event:any){
    this.submitSuccess = event; 
    this.showAddQuestionForm = !event;

  }
  setInputCategoryId(event:any){
    this.inputCategoryId = event;
    this.showAddCategoryForm =true;
  }

  closeAddCategoryForm(){
    this.showAddCategoryForm = false;
  }
  closeAddCategoryFormAfterSave(event:any){
    this.submitSuccess = event; 
    this.showAddCategoryForm = !event;

  }

}
