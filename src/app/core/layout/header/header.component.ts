import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../../enums/language-enum.enum';
import { BaseConstantModel } from '../../ng-model/base-constant-model';
import { AuthService } from '../../services/auth-services/auth.service';
import { LanguageService } from '../../services/language-services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentLang = '';
  showPro = true;
  submitClose = false;
  title = '';
  constructor(private langService: LanguageService) { }

  ngOnInit(): void {
    this.currentLang = JSON.parse(localStorage.getItem("lang") || '{}');
    this.titleSubscription();
  }

  titleSubscription(){
    this.langService.headerPageNameEvent.subscribe(res => {
      this.title = res;
    })
  }

  switchLang() {
    if (this.currentLang && Object.keys(this.currentLang).length === 0 && this.currentLang.constructor === Object) {
      this.langService.switchLang(LanguageEnum.ar);
    }
    else {
      this.currentLang = this.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
      this.langService.switchLang(this.currentLang as LanguageEnum);
    }
  }

  displayLang() {
    return this.currentLang === LanguageEnum.ar ? LanguageEnum.en.split('-')[0].toUpperCase() : LanguageEnum.ar.split('-')[0].toUpperCase();
  }
  closeProfile(event: boolean) {
    this.submitClose = event;
    this.showPro = true

  }
}
