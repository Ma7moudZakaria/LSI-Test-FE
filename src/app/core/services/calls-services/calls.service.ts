import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddGroupExplanationModel } from '../../interfaces/calls/iadd-group-explanation-model';
import { IAddStudentInGroupExplanationModel } from '../../interfaces/calls/iadd-student-in-group-explanation-model';
import { IGroupExplanationsStudentViewRequest } from '../../interfaces/calls/igroup-explanations-student-view-request';
import { IGroupExplanationsTeacherViewRequest } from '../../interfaces/calls/igroup-explanations-teacher-view-request';
import { IRejectGroupExplanationRequest } from '../../interfaces/calls/ireject-group-explanation-request';
import { IUsersInBatctRequest } from '../../interfaces/calls/iusers-in-batct-request';
import { BaseResponseModel } from '../../ng-model/base-response-model';
@Injectable({
  providedIn: 'root'
})
export class CallsService {
  getUsersInBatchURL = environment.baseUrl + 'Calls/get-all-users-to-add-into-group-explanation';
  addGroupExplanationURL = environment.baseUrl + 'Calls/add-group-explanation';
  addStudentURL = environment.baseUrl + 'Calls/add-group-member-into-group-explanation';
  StudentRequestURL = environment.baseUrl + 'Calls/student-request-to-join-group-explanation';
  acceptGroupRequestURL = environment.baseUrl + 'Calls/accept-group-explanation-request';
  rejectedGroupRequestURL = environment.baseUrl + 'Calls/reject-group-explanation-request';
  CancelExplanationRequestURL = environment.baseUrl + 'Calls/student-cancel-explanation-request/​​';
  getDetailsGroupExplanationURL = environment.baseUrl + 'Calls/get-group-explanation-details-by-id/'
  getTeacherViewtGroupExplanationURL = environment.baseUrl + 'Calls/get-all-group-explanations-teacher-view'
  getStudentViewtGroupExplanationURL = environment.baseUrl + 'Calls/get-all-group-explanations-student-view/'
  // getJoinRequestGroupExplanationURL = environment.baseUrl + 'Calls/get-all-join-requests-explanations/'
  removeStudentGroupExplanationURL = environment.baseUrl + 'Calls/remove-student-from-group-explanation/'
  constructor(private http: HttpClient) { }

  getAllUsersInBatct(model: IUsersInBatctRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getUsersInBatchURL, model);
  }

  addGroupExplanation(model: IAddGroupExplanationModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addGroupExplanationURL, model);
  }

  addStudentInGroupExplanation(model: IAddStudentInGroupExplanationModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addStudentURL, model);
  }

  acceptGroupRequest(Id: string[]): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.acceptGroupRequestURL, Id);
  }
  rejectedGroupRequest(model: IRejectGroupExplanationRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.rejectedGroupRequestURL, model);
  }

  getGroupExplanationDetails(Id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getDetailsGroupExplanationURL + Id);
  }
  removeStudentGroupExplanation(Id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.removeStudentGroupExplanationURL + Id);
  }

  getTeacherViewtGroupExplanation(model: IGroupExplanationsTeacherViewRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getTeacherViewtGroupExplanationURL, model);
  }

  getStudentViewtGroupExplanation(model: IGroupExplanationsStudentViewRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getStudentViewtGroupExplanationURL, model);
  }
  // getJoinRequestGroupExplanation(model: IGroupExplanationsJoinRequest): Observable<BaseResponseModel> {
  //   return this.http.post<BaseResponseModel>(this.getJoinRequestGroupExplanationURL, model);
  // }


}



// POST​/api​/Calls​/get-all-users-to-add-into-group-explanation

// POST​/api​/Calls​/add-group-explanation
// POST​/api​/Calls​/add-group-member-into-group-explanation

// POST​/api​/Calls​/student-request-to-join-group-explanation --------

// POST​/api​/Calls​/accept-group-explanation-request

// POST​/api​/Calls​/reject-group-explanation-request

// GET​/api​/Calls​/student-cancel-explanation-request​/{​​​​​​id}​​​​​​ ----

// GET​/api​/Calls​/get-group-explanation-details-by-id​/{​​​​​​id}​​​​​​
// POST​/api​/Calls​/get-all-group-explanations-teacher-view

// POST​/api​/Calls​/get-all-group-explanations-student-view
// POST​/api​/Calls​/get-all-join-requests-explanations ------

