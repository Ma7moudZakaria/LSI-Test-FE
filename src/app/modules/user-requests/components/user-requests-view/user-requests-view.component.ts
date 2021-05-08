import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-user-requests-view',
  templateUrl: './user-requests-view.component.html',
  styleUrls: ['./user-requests-view.component.scss']
})
export class UserRequestsViewComponent implements OnInit {
  selectedUserScientificProblemId: string | undefined;
  selectedCategoryId = {  userRequestNum : "" , nameAr : "" , nameEn : "" };
  categoryId: string | undefined;
  inputCategoryId: string | undefined;
  
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

  setSelectedCategory(event: any) {
    this.selectedCategoryId = { userRequestNum : event.userRequestNum, nameAr: event.nameAr, nameEn: event.nameEn };
    this.categoryId = event.id;
  }

  loadSelectedUserScientificProblem(event: any) {
    this.selectedUserScientificProblemId = event;
  }

  setInputCategoryId(event: any) {
    this.inputCategoryId = event;
  }
}
