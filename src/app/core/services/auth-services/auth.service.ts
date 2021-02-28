import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationModel } from '../../interfaces/auth/authentication-model';
import { ForgotPasswordModel } from '../../interfaces/auth/forgot-password-model';
import { ResetPasswordModel } from '../../interfaces/auth/reset-password-model';
import { UserModel } from '../../interfaces/auth/user-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  RegisterUrl = environment.BaseURL + 'Users/register';
  UserAuthenticationUrl = environment.BaseURL + 'Users/user-authentication';
  ForgotPasswordUrl = environment.BaseURL + 'Users/forgot-password';
  ResetPasswordUrl = environment.BaseURL + 'Users/reset-password';
  ActivateUserUrl = environment.BaseURL + 'Users/send-new-activation-code/';

  constructor(private http:HttpClient) { }

  register(model: UserModel) {
    return this.http.post<BaseResponseModel>(this.RegisterUrl, model);
  }

  UserAuthentication(model:AuthenticationModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.UserAuthenticationUrl, model);
  }

  ForgotPassword(model:ForgotPasswordModel):Observable<any>{
    return this.http.post<BaseResponseModel>(this.ForgotPasswordUrl, model);
  }

  ResetPassword(model:ResetPasswordModel):Observable<any>{
    return this.http.post<BaseResponseModel>(this.ResetPasswordUrl, model);
  }

  ActivateUser(Id:any):Observable<any>{
    return this.http.put<BaseResponseModel>(this.ActivateUserUrl + Id , null);
  }
}
