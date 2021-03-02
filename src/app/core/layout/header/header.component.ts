import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../../enums/language-enum.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  language:LanguageEnum = LanguageEnum.en;
  constructor(public translate : TranslateService) { }

  ngOnInit(): void {
    this.switchLang();
  }

  switchLang(){
    this.language = this.language === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar
    this.translate.use(this.language.toLowerCase());
    if (this.language === LanguageEnum.ar){
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      document.getElementsByTagName('html')[0].setAttribute('lang', 'ar');
    }
    else{
      // document.getElementsByTagName('html')[0].removeAttribute('dir');
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      document.getElementsByTagName('html')[0].setAttribute('lang', 'en');
    }
  }

}
