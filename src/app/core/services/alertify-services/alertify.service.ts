import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../../enums/language-enum.enum';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor(public translate: TranslateService) {
  }
  confirm(title: string, message: string, okCallback: () => any, cancelCallback: () => any) {
    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-outline-danger";
    alertify.confirm(message, function (e: any) {
      okCallback();
    }, function (e: any) {
      cancelCallback();
    }).set({ title: title }).set({ labels: { ok: 'نعم', cancel: 'لا' } });
  }

  success(message: string) {
    if (this.translate.currentLang === LanguageEnum.ar) { alertify.set('notifier', 'position', 'bottom-left'); }
    else {
      alertify.set('notifier', 'position', 'bottom-right');
    }

    alertify.success(message);
    // alertify.success(message + alertify.get('notifier', 'position'));


  }
  error(message: string) {
    if (this.translate.currentLang === LanguageEnum.ar) { alertify.set('notifier', 'position', 'bottom-left'); }
    else {
      alertify.set('notifier', 'position', 'bottom-right');
    }

    alertify.error(message, 0);


  }
  // error(message: string) {
  //   alertify.error(message);
  // }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
  alert(title: string, message: string) {
    alertify.alert(title, message);
  }
  notify(title: string, url: any) {

    var msg = alertify.notify(title, 'custom', 10);
    msg.callback = function (isClicked: any) {
      if (isClicked)
        window.location.href = url;
      else
        console.log('notification auto-dismissed');
    };
  }

}
