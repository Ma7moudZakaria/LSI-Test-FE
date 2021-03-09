import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  

  constructor(private http: HttpClient) { }

  completeProfile(model : any):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.completeProfileURL , model);
  }

  updateUser(model : any):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.updateUserURL , model);
  }

  viewUserProfileDetails(id : string) 
  {
    return this.http.get<BaseResponseModel>(this.viewUserProfileDetailsURL + id)
  }

  getAllUsers() 
  {
    return this.http.get<BaseResponseModel>(this.getAllUsersURL)
  }

  deleteUser(id : string) 
  {
    return this.http.delete<BaseResponseModel>(this.deleteUserURL + id)
  }
}
