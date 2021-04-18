import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageEnum } from '../../enums/language-enum.enum';
import { IActivationCode } from '../../interfaces/auth-interfaces/iactivation-code';
import { IAuthentication } from '../../interfaces/auth-interfaces/iauthentication';
import { IForgotPassword } from '../../interfaces/auth-interfaces/iforgot-password';
import { IResetPassword } from '../../interfaces/auth-interfaces/ireset-password';
import { IUser } from '../../interfaces/auth-interfaces/iuser-model';
import { IUserSocialRegister } from '../../interfaces/auth-interfaces/iuser-social-register';
import { IUpdateUserProfile } from '../../interfaces/user-interfaces/iupdateuserprofile';
import { Iuser } from '../../interfaces/user-interfaces/iuser';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  switchLanguageUrl = environment.baseUrl + 'Language/set-lang';
  registerUrl = environment.baseUrl + 'User/register';
  userAuthenticationUrl = environment.baseUrl + 'User/user-authenticate';
  forgotPasswordUrl = environment.baseUrl + 'User/send-forgot-password-url';
  resetPasswordUrl = environment.baseUrl + 'User/reset-password';
  verifyUserUrl = environment.baseUrl + 'User/verify-user-activiation-code/';
  sendActivateCodeUrl = environment.baseUrl + 'User/send-new-activation-code/';
  viewProfileDetailsUrl = environment.baseUrl + 'User/view-user-profile-details/';
  updateUserUrl = environment.baseUrl + 'User/update-user';
  socialAuthenticationUrl = environment.baseUrl + 'User/social-authentication';

  constructor(private http: HttpClient, private router: Router) { }

  switchLanguage(lang: string): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.switchLanguageUrl + '/' + lang, null);
  }

  register(model: IUser) {
    return this.http.post<BaseResponseModel>(this.registerUrl, model);
  }

  userAuthentication(model: IAuthentication) {
    return this.http.post<BaseResponseModel>(this.userAuthenticationUrl, model);
  }

  forgotPassword(model: IForgotPassword): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.forgotPasswordUrl, model);
  }

  resetPassword(model: IResetPassword): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.resetPasswordUrl, model);
  }

  activateUser(model: IActivationCode): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.verifyUserUrl, model);
  }

  sendActivateCode(Id: string): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.sendActivateCodeUrl + Id, null);
  }

  viewProfileDetails(Id: string) {
    return this.http.get<BaseResponseModel>(this.viewProfileDetailsUrl + Id);
  }

  updateUser(model: IUpdateUserProfile) {
    return this.http.put<BaseResponseModel>(this.updateUserUrl, model);
  }

  logout() {
    var user = JSON.parse(localStorage.getItem("user") || '{}') as Iuser;
    // var lang = JSON.parse(localStorage.getItem("lang") || '{}');

    if (user != null) {
      localStorage.removeItem("user");
    }
    // if (lang != null){
    //   localStorage.removeItem("lang");
    // }

    this.router.navigateByUrl('');
  }

  socialAuthentication(model: IUserSocialRegister): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.socialAuthenticationUrl, model);
  }
}
