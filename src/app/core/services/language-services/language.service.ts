import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserModule } from 'src/app/modules/user/user.module';
import { LanguageEnum } from '../../enums/language-enum.enum';
import { Iuser } from '../../interfaces/user-interfaces/iuser';
import { AuthService } from '../auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentUser:Iuser | undefined
  constructor(private auth: AuthService, private translate: TranslateService) { 
    this.currentUser = JSON.parse(localStorage.getItem("user") || '{}');
  }

  initLang(){
    let currentLang = JSON.parse(localStorage.getItem("lang") || '{}');
    if (currentLang && Object.keys(currentLang).length === 0 && currentLang.constructor === Object){
      this.switchLang(LanguageEnum.ar);
    }
    else{
      this.switchLang(currentLang as LanguageEnum);
    }
  }

  switchLang(language:LanguageEnum) {
    this.auth.switchLanguage(language).subscribe(res =>{
      if (res.isSuccess){
        this.switchLangCallBack(language);
      }
      else{

      }
    });
  }

  switchLangCallBack(language:LanguageEnum) {
  
    this.auth.currentLanguageEvent.emit(language);
    /*used for refreshment case*/
    localStorage.setItem('lang', JSON.stringify(language));

    this.translate.use(language.split("-")[0].toLowerCase());
    if (language === LanguageEnum.ar){
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
