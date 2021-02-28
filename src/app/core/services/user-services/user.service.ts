import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  GetAllUsersURL = environment.BaseURL + 'User/get-all-users/';
  CompleteProfileURL = environment.BaseURL + 'User/complete-profile/';
  UpdateUserURL = environment.BaseURL + 'User/update-user/';
  ViewUserProfileDetailsURL = environment.BaseURL + 'User/view-user-profile-details/';
  DeleteUserURL = environment.BaseURL + 'User/delete-user/';
  

  constructor(private http: HttpClient) { }

  completeProfile(model : any):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.CompleteProfileURL , model);
  }

  updateUser(model : any):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.UpdateUserURL , model);
  }

  viewUserProfileDetails(id : string) 
  {
    return this.http.get<BaseResponseModel>(this.ViewUserProfileDetailsURL + id)
  }

  getAllUsers() 
  {
    return this.http.get<BaseResponseModel>(this.GetAllUsersURL)
  }

  deleteUser(id : string) 
  {
    return this.http.delete<BaseResponseModel>(this.DeleteUserURL + id)
  }
}
