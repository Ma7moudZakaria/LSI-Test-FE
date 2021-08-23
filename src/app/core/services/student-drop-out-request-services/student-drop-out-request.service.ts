import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStudentMyProgramsRequestModel } from '../../interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class StudentDropOutRequestService {

  studentDropOutRequestAdvFilterAdminViewUrl = environment.baseUrl + 'StudentDropOutRequest/student-drop-out-requests-filter-admin-view/';
  studentDropOutRequestAdvFilterStudentViewUrl = environment.baseUrl + 'StudentDropOutRequest/student-drop-out-requests-filter-student-view/';
  createStudentDropOutRequestUrl = environment.baseUrl + 'StudentDropOutRequest/create-student-drop-out-request/';
  studentDropOutRequestsAcceptanceUrl = environment.baseUrl + 'StudentDropOutRequest/accept-student-drop-out-request/';
  studentDropOutRequestsRejectionUrl = environment.baseUrl + 'StudentDropOutRequest/reject-student-drop-out-request/';
  studentDropOutCancelRequestUrl = environment.baseUrl + 'StudentDropOutRequest/student-cancel-droup-out-request/';
  studentDropOutAvailableProgramUrl = environment.baseUrl + 'StudentDropOutRequest/student-avaliable-program-to-droup-out/';

  constructor(private http: HttpClient) { }

  createStudentDropOutRequest(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.createStudentDropOutRequestUrl, model);
  }

  studentDropOutRequestAdvFilterAdminView(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.studentDropOutRequestAdvFilterAdminViewUrl, model);
  }

  studentDropOutRequestAdvFilterStudentView(model: any): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.studentDropOutRequestAdvFilterStudentViewUrl, model);
  }

  studentDropOutRequestsAcceptance(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.studentDropOutRequestsAcceptanceUrl, model);
  }

  studentDropOutRequestsRejection(model: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.studentDropOutRequestsRejectionUrl, model);
  }

  studentDropOutCancelRequest(id: string): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.studentDropOutCancelRequestUrl, id);
  }

  studentDropOutAvailableProgram(model: IStudentMyProgramsRequestModel){
    return this.http.get<BaseResponseModel>(this.studentDropOutAvailableProgramUrl + model.usrId);
  }
}
