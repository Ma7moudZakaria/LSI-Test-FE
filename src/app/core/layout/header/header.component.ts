import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../../enums/language-enum.enum';
import { BaseConstantModel } from '../../ng-model/base-constant-model';
import { AuthService } from '../../services/auth-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  language:LanguageEnum = LanguageEnum.en;
  constructor(public translate : TranslateService, 
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    //this.switchLang();
  }

  switchLang() {
    this.language = this.language === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.auth.switchLanguage(this.language).subscribe(res =>{
      if (res.isSuccess){
        this.switchLangCallBack();
      }
      else{

      }
    });
  }

  switchLangCallBack() {
    this.auth.currentLanguageEvent.emit(this.language);

    this.translate.use(this.language.split("-")[0].toLowerCase());
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

  showHeader(){
    //  console.log(this.router.url);
    // console.log(!BaseConstantModel.NO_HEADER_ROUTES.includes(this.router.url.split('?')[0]) && this.router.url !== '/')
    return !BaseConstantModel.NO_HEADER_ROUTES.includes(this.router.url.split('?')[0]) && this.router.url !== '/';
    // return BaseConstantModel.NO_HEADER_ROUTES.some(r => r.indexOf(this.router.url))
  }

  displayLang(){
    return this.language === LanguageEnum.ar ? LanguageEnum.en.toUpperCase() : LanguageEnum.ar.toUpperCase();
  }

}
