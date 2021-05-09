import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserRequests } from 'src/app/core/enums/user-requests.enum.enum';
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
  showAddscientificProblemForm = false;
  showScientificProbreqs:boolean = false;
  showJoinReqs:boolean = true;
  showWithdrawalReqs:boolean = false;

  scientificProblem: string | undefined;
  
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

  setSelectedCategory(event: UserRequests) {
    switch(event){
      case UserRequests.JoinRequest:
        this.showWithdrawalReqs = false;
        this.showScientificProbreqs = false;
        this.showJoinReqs = true;
        break;
      case UserRequests.Withdrawal:
        this.showWithdrawalReqs = true;
        this.showScientificProbreqs = false;
        this.showJoinReqs = false;
          break;
      case UserRequests.ScientificProblem:
        this.showWithdrawalReqs = false;
        this.showScientificProbreqs = true;
        this.showJoinReqs = false;
            break;
    }
  }

  loadSelectedUserScientificProblem(event: any) {
    this.selectedUserScientificProblemId = event;
  }

  setInputCategoryId(event: any) {
    this.inputCategoryId = event;
  }


  openScientificProblem(event: boolean) {
    this.showAddscientificProblemForm = event;
  }

  closeScientificProblem(event: boolean) {
    this.showAddscientificProblemForm = event;
  }
}
