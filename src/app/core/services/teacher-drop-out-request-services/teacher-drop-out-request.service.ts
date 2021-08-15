import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class TeacherDropOutRequestService {
  TeacherDropOutRequestAdvFilterAdminViewUrl = environment.baseUrl + 'TeacherDropOutRequest/teacher-drop-out-request-adv-filter-admin-view/';
  TeacherDropOutRequestAdvFilterTeacherViewUrl = environment.baseUrl + 'TeacherDropOutRequest/teacher-drop-out-request-adv-filter-teacher-view/';
  CreateTeacherDropOutRequestUrl = environment.baseUrl + 'TeacherDropOutRequest/create-teacher-drop-out-request/';
  TeacherDropOutRequestsAcceptanceUrl = environment.baseUrl + 'TeacherDropOutRequest/accept-teacher-drop-out-request/';
  TeacherDropOutRequestsRejectionUrl = environment.baseUrl + 'TeacherDropOutRequest/reject-teacher-drop-out-request/';

  constructor(private http: HttpClient) { }

  createTeacherDropOutRequest(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.CreateTeacherDropOutRequestUrl, model);
  }

  teacherDropOutRequestAdvFilterAdminView(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.TeacherDropOutRequestAdvFilterAdminViewUrl, model);
  }

  teacherDropOutRequestAdvFilterTeacherView(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.TeacherDropOutRequestAdvFilterTeacherViewUrl, model);
  }

  teacherDropOutRequestsAcceptance(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.TeacherDropOutRequestsAcceptanceUrl, model);
  }

  teacherDropOutRequestsRejection(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.TeacherDropOutRequestsRejectionUrl, model);
  }
}
