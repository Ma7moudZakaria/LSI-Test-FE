import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-student-program-wrapper',
  templateUrl: './student-program-wrapper.component.html',
  styleUrls: ['./student-program-wrapper.component.scss']
})
export class StudentProgramWrapperComponent implements OnInit {

  constructor(
    private languageService: LanguageService, public translate: TranslateService
  ) { }

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
    this.languageService.headerPageNameEvent.emit(this.translate.instant('GENERAL.MY_PROGRAM'));
  }

}
