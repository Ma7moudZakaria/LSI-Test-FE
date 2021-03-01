import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthentication } from '../../interfaces/auth/iauthentication-model';
import { IForgotPassword } from '../../interfaces/auth/iforgot-password-model';
import { IResetPassword } from '../../interfaces/auth/ireset-password-model';
import { IUser } from '../../interfaces/auth/iuser-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl = environment.BaseURL + 'Users/register';
  userAuthenticationUrl = environment.BaseURL + 'User/user-authenticate';
  forgotPasswordUrl = environment.BaseURL + 'User/forgot-password';
  resetPasswordUrl = environment.BaseURL + 'User/reset-password';
  activateUserUrl = environment.BaseURL + 'User/send-new-activation-code/';

  constructor(private http:HttpClient) { }

  register(model: IUser) {
    return this.http.post<BaseResponseModel>(this.registerUrl, model);
  }

  userAuthentication(model:IAuthentication){
    return this.http.post(this.userAuthenticationUrl, model);
  }

  forgotPassword(model:IForgotPassword):Observable<any>{
    return this.http.post<BaseResponseModel>(this.forgotPasswordUrl, model);
  }

  resetPassword(model:IResetPassword):Observable<any>{
    return this.http.post<BaseResponseModel>(this.resetPasswordUrl, model);
  }

  activateUser(Id:any):Observable<any>{
    return this.http.put<BaseResponseModel>(this.activateUserUrl + Id , null);
  }
}
