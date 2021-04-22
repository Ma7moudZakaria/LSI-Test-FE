import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../../ng-model/base-response-model';
@Injectable({
  providedIn: 'root'
})
export class TeacherProfileService {


  updateTeacherUrl = environment.baseUrl + 'User/update-teacher-profile/';
  viewTeacherProfileDetailsURL = environment.baseUrl + 'User/view-teacher-profile-details/';

  constructor(private http: HttpClient) { }

  updateTeacher(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.updateTeacherUrl, model);
  }

  viewTeacherProfileDetails(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.viewTeacherProfileDetailsURL + id)
  }
}
