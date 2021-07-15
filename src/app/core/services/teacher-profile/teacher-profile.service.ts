import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../../ng-model/base-response-model';
@Injectable({
  providedIn: 'root'
})
export class TeacherProfileService {


  updateTeacherUrl = environment.baseUrl + 'Teacher/update-teacher-profile/';
  viewTeacherProfileDetailsURL =  environment.baseUrl + 'Teacher/view-teacher-profile-details/';
  getTeacherSystemSubscriptionAdvancedFilterUrl = environment.baseUrl + 'Teacher/get-teacher-system-subscription-advanced-filter/';
  teacherSubscriptionsAcceptanceUrl = environment.baseUrl + 'Teacher/accept-teacher-system-subscription/';
  TeacherSubscriptionsRejectionUrl = environment.baseUrl + 'Teacher/reject-teacher-system-subscription/';

  constructor(private http: HttpClient) { }

  updateTeacher(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.updateTeacherUrl, model);
  }

  viewTeacherProfileDetails(id : string) :Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.viewTeacherProfileDetailsURL + id)
  }

  getTeacherSystemSubscriptionAdvancedFilter(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getTeacherSystemSubscriptionAdvancedFilterUrl, model);
  }

  teacherSubscriptionsAcceptance(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.teacherSubscriptionsAcceptanceUrl, model);
  }

  teacherSubscriptionsRejection(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.TeacherSubscriptionsRejectionUrl, model);
  }
}
