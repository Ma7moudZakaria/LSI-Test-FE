import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class StudentDropOutRequestService {

  StudentDropOutRequestAdvFilterAdminViewUrl = environment.baseUrl + 'StudentDropOutRequest/student-drop-out-requests-filter-admin-view/';
  StudentDropOutRequestAdvFilterStudentViewUrl = environment.baseUrl + 'StudentDropOutRequest/student-drop-out-requests-filter-student-view/';
  CreateStudentDropOutRequestUrl = environment.baseUrl + 'StudentDropOutRequest/create-student-drop-out-request/';
  StudentDropOutRequestsAcceptanceUrl = environment.baseUrl + 'StudentDropOutRequest/accept-student-drop-out-request/';
  StudentDropOutRequestsRejectionUrl = environment.baseUrl + 'StudentDropOutRequest/reject-student-drop-out-request/';

  constructor(private http: HttpClient) { }

  createStudentDropOutRequest(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.CreateStudentDropOutRequestUrl, model);
  }

  studentDropOutRequestAdvFilterAdminView(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.StudentDropOutRequestAdvFilterAdminViewUrl, model);
  }

  studentDropOutRequestAdvFilterStudentView(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.StudentDropOutRequestAdvFilterStudentViewUrl, model);
  }

  studentDropOutRequestsAcceptance(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.StudentDropOutRequestsAcceptanceUrl, model);
  }

  studentDropOutRequestsRejection(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.StudentDropOutRequestsRejectionUrl, model);
  }
}
