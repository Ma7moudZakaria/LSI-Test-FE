import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { JsonpClientBackend } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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
  // headerPageNameEvent: any;
  currentLanguageEvent = new EventEmitter<LanguageEnum>();
  headerPageNameEvent = new EventEmitter<string>();

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
    this.switchLangCallBack(language);

    this.auth.switchLanguage(language).subscribe(res =>{
    });
  }

  switchLangCallBack(language:LanguageEnum) {

    this.translate.use(language).subscribe(res => {
      this.currentLanguageEvent.emit(language);
    })

    /*used for refreshment case*/
    localStorage.setItem('lang', JSON.stringify(language));

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
