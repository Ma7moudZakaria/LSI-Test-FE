import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActivationCode } from '../../interfaces/auth/iactivation-code-module';
import { IAuthentication } from '../../interfaces/auth/iauthentication-model';
import { IForgotPassword } from '../../interfaces/auth/iforgot-password-model';
import { IResetPassword } from '../../interfaces/auth/ireset-password-model';
import { IUser } from '../../interfaces/auth/iuser-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    changeLanguageUrl = environment.BaseURL + 'Language/set-lang';
    registerUrl = environment.BaseURL + 'Users/register';
    userAuthenticationUrl = environment.BaseURL + 'User/user-authenticate';
    forgotPasswordUrl = environment.BaseURL + 'User/forgot-password';
    resetPasswordUrl = environment.BaseURL + 'User/reset-password';
    activateUserUrl = environment.BaseURL + 'User/send-new-activation-code/';
    activateUserUrl = environment.BaseURL + 'User/verify-user-activiation-code/';

  constructor(private http: HttpClient) { }

  changeLanguage(lang:any){
    return this.http.put(this.changeLanguageUrl + '/' + lang, null);
    }

    register(model: IUser) {
    return this.http.post<BaseResponseModel>(this.registerUrl, model);
  }

  userAuthentication(model:IAuthentication){
    return this.http.post<BaseResponseModel>(this.userAuthenticationUrl, model);
  }

  forgotPassword(model:IForgotPassword):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.forgotPasswordUrl, model);
  }

  resetPassword(model:IResetPassword):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.resetPasswordUrl, model);
  }

  activateUser(model:IActivationCode):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.activateUserUrl , model);
  }

  sendActivateCode(Id:any):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.sendActivateCodeUrl + Id , null);
  }
}
