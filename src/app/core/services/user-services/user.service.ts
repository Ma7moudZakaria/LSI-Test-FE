import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserProfilePicture } from '../../interfaces/user-interfaces/iuser-profile-picture';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getAllUsersURL = environment.baseUrl + 'User/get-all-users/';
  completeProfileURL = environment.baseUrl + 'User/complete-profile/';
  updateUserURL = environment.baseUrl + 'User/update-user/';
  viewUserProfileDetailsURL = environment.baseUrl + 'User/view-user-profile-details/';
  deleteUserURL = environment.baseUrl + 'User/delete-user/';
  updateUserProfilePicURL = environment.baseUrl + 'user/upload-profile-picture'
  getCountryIsoCodeUrl = environment.baseUrl + 'user/get-country-iso-code'
  canDecativate : boolean = false;
  constructor(private http: HttpClient) { }

  completeProfile(model : any):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.completeProfileURL , model);
  }

  updateUser(model : any):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.updateUserURL , model);
  }

  viewUserProfileDetails(id : string) :Observable<BaseResponseModel>
  {
    return this.http.get<BaseResponseModel>(this.viewUserProfileDetailsURL + id)
  }

  getAllUsers() :Observable<BaseResponseModel>
  {
    return this.http.get<BaseResponseModel>(this.getAllUsersURL)
  }

  deleteUser(id : string) :Observable<BaseResponseModel>
  {
    return this.http.delete<BaseResponseModel>(this.deleteUserURL + id)
  }

  updateUserProfilePic(model:any):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.updateUserProfilePicURL, model);
  }

  getCountryIsoCode():Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.getCountryIsoCodeUrl);
  }
  setCanDeActivate(value:boolean){
    this.canDecativate = value;
  }
}
