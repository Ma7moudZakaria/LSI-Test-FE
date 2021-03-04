import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActivationCode } from '../../interfaces/auth/iactivation-code';
import { IAuthentication } from '../../interfaces/auth/iauthentication';
import { IForgotPassword } from '../../interfaces/auth/iforgot-password';
import { IResetPassword } from '../../interfaces/auth/ireset-password';
import { IUser } from '../../interfaces/auth/iuser-model';
import { IProfileUser } from '../../interfaces/user-interfaces/iprofileuser';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    changeLanguageUrl = environment.BaseURL + 'Language/set-lang';
  registerUrl = environment.BaseURL + 'User/register';
  userAuthenticationUrl = environment.BaseURL + 'User/user-authenticate';
  forgotPasswordUrl = environment.BaseURL + 'User/send-forgot-password-url';
  resetPasswordUrl = environment.BaseURL + 'User/reset-password';
    verifyUserUrl = environment.BaseURL + 'User/verify-user-activiation-code/';
  sendActivateCodeUrl = environment.BaseURL + 'User/send-new-activation-code/';
  viewProfileDetailsUrl = environment.BaseURL + 'User/view-user-profile-details/';
  updateUserUrl = environment.BaseURL + 'User/update-user';

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
    return this.http.post<BaseResponseModel>(this.verifyUserUrl , model);
  }

  sendActivateCode(Id:any):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.sendActivateCodeUrl + Id , null);
  }

  viewProfileDetails(Id: any) {
    return this.http.get<BaseResponseModel>(this.viewProfileDetailsUrl + Id);
  }

  updateUser(model:IProfileUser){
    return this.http.put<BaseResponseModel>(this.updateUserUrl, model);
  }
}
