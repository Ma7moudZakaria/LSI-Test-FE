import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class TeacherDropOutRequestService {
  teacherDropOutRequestAdvFilterAdminViewUrl = environment.baseUrl + 'TeacherDropOutRequest/teacher-drop-out-request-adv-filter-admin-view/';
  teacherDropOutRequestAdvFilterTeacherViewUrl = environment.baseUrl + 'TeacherDropOutRequest/teacher-drop-out-request-adv-filter-teacher-view/';
  createTeacherDropOutRequestUrl = environment.baseUrl + 'TeacherDropOutRequest/create-teacher-drop-out-request/';
  teacherDropOutRequestsAcceptanceUrl = environment.baseUrl + 'TeacherDropOutRequest/accept-teacher-drop-out-request/';
  teacherDropOutRequestsRejectionUrl = environment.baseUrl + 'TeacherDropOutRequest/reject-teacher-drop-out-request/';
  teacherDetailsUrl = environment.baseUrl + 'Teacher/view-teacher-profile-details/';

  constructor(private http: HttpClient) { }

  createTeacherDropOutRequest(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.createTeacherDropOutRequestUrl, model);
  }

  teacherDropOutRequestAdvFilterAdminView(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.teacherDropOutRequestAdvFilterAdminViewUrl, model);
  }

  teacherDropOutRequestAdvFilterTeacherView(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.teacherDropOutRequestAdvFilterTeacherViewUrl, model);
  }

  teacherDropOutRequestsAcceptance(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.teacherDropOutRequestsAcceptanceUrl, model);
  }

  teacherDropOutRequestsRejection(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.teacherDropOutRequestsRejectionUrl, model);
  }
  teacherDetails(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.teacherDetailsUrl+id)
  }




}
