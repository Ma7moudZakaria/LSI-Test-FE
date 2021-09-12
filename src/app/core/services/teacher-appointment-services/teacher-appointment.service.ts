import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponseModel} from '../../ng-model/base-response-model';
import {ITeacherAppointmentFilterRequestModel} from '../../interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-filter-request-model';
import {IRejectTeacherAppointmentModel} from '../../interfaces/teacher-appointment-requests-interfaces/ireject-teacher-appointment-model';
import {IAddTeacherAppointmentRequest} from '../../interfaces/teacher-appointment-requests-interfaces/iadd-teacher-appointment-request';

@Injectable({
  providedIn: 'root'
})
export class TeacherAppointmentService {
  getTeachersAppointmentRequestsFilterAdminViewWithAdvancedSearchURL = environment.baseUrl + 'TeacherAppointmentRequests/get-teacher-appointment-filter-admin-view/';
  getTeacherAvailableTimesTeacherViewURL = environment.baseUrl + 'TeacherAppointmentRequests/get-teacher-available-times/';
  rejectTeacherAvailableTimeRequestURL = environment.baseUrl + 'TeacherAppointmentRequests/reject-teacher-available-time-request/';
  teacherAvailableTimeRequestAcceptanceURL = environment.baseUrl + 'TeacherAppointmentRequests/accept-teacher-available-time-request/';
  cancelTheChangeTeacherAvailableTimeRequestURL = environment.baseUrl + 'TeacherAppointmentRequests/cancel-teacher-available-time-request/';
  AddChangeTeacherAvailableTimesRequestURL = environment.baseUrl + 'TeacherAppointmentRequests/add-teacher-available-times/';
  GetTeacherAppointmentRequestAppointmentsURL = environment.baseUrl + 'TeacherAppointmentRequests/get-teacher-appointment-request-appointments/'

  constructor(private http: HttpClient) {
  }

  getTeachersAppointmentRequestsFilterAdminViewWithAdvancedSearch(model: ITeacherAppointmentFilterRequestModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getTeachersAppointmentRequestsFilterAdminViewWithAdvancedSearchURL, model);
  }

  getTeacherAvailableTimesTeacherView(id?: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getTeacherAvailableTimesTeacherViewURL + id);
  }

  rejectTeacherAvailableTimeRequest(model: IRejectTeacherAppointmentModel): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.rejectTeacherAvailableTimeRequestURL, model);
  }

  teacherAvailableTimeRequestAcceptance(model?: string[]): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.teacherAvailableTimeRequestAcceptanceURL, model);
  }

  cancelTheChangeTeacherAvailableTimeRequest(id?: (string | undefined)[]): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.cancelTheChangeTeacherAvailableTimeRequestURL+ id , null);
  }
  AddChangeTeacherAvailableTimesRequest(model: IAddTeacherAppointmentRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.AddChangeTeacherAvailableTimesRequestURL, model);
  }

  GetTeacherAppointmentRequestAppointments(id? : string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.GetTeacherAppointmentRequestAppointmentsURL + id);
  }

}
