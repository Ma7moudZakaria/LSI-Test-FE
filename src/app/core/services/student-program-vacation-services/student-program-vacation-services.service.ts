import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {IStudentCustomConditionAnswerModel} from '../../interfaces/student-program-subscription-interfaces/istudent-custom-condition-answer-model';
import {BaseResponseModel} from '../../ng-model/base-response-model';
import {IStudentProgramVacationFilterRequestModel} from '../../interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import {IStudentProgramVacationRequestModel} from '../../interfaces/student-program-vacation-interfaces/i-student-program-vacation-request-model';
import {IRejectStudentProgramVacationModel} from '../../interfaces/student-program-vacation-interfaces/ireject-student-program-vacation-model';

@Injectable({
  providedIn: 'root'
})
export class StudentProgramVacationServicesService {
  getStudentsProgramsVacationFilterAdminViewURL = environment.baseUrl + 'StudentProgramVacation/get-students-vacation-filter-Admin-View/';
  getStudentsProgramsVacationFilterStudentViewURL = environment.baseUrl + 'StudentProgramVacation/get-students-vacation-filter-Student-View/';
  rejectStudentProgramVacationURL = environment.baseUrl + 'StudentProgramVacation/reject-student-program-vacation/';
  studentProgramVacationAcceptanceURL = environment.baseUrl + 'StudentProgramVacation/accept-student-program-vacation/';
  cancelStudentProgramVacationURL = environment.baseUrl + 'StudentProgramVacation/cancel-student-program-vacation/';
  terminateStudentProgramVacationURL = environment.baseUrl + 'StudentProgramVacation/terminate-student-program-vacation/';
  addStudentProgramVacationURL = environment.baseUrl + 'StudentProgramVacation/add-student-program-vacation/';


  constructor(private http: HttpClient) {
  }

  getStudentsProgramsVacationFilterAdminView(model: IStudentProgramVacationFilterRequestModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getStudentsProgramsVacationFilterAdminViewURL, model);
  }

  getStudentsProgramsVacationFilterStudentView(model: IStudentProgramVacationRequestModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getStudentsProgramsVacationFilterStudentViewURL, model);
  }

  rejectStudentProgramVacation(model: IRejectStudentProgramVacationModel): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.rejectStudentProgramVacationURL, model);
  }

  studentProgramVacationAcceptance(model?: string[]): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.studentProgramVacationAcceptanceURL, model);
  }

  cancelStudentProgramVacation(id?: string): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.cancelStudentProgramVacationURL+ id , null);
  }

  terminateStudentProgramVacation(id: any): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.terminateStudentProgramVacationURL+ id , null);
  }

  addStudentProgramVacation(model: IStudentCustomConditionAnswerModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addStudentProgramVacationURL, model);
  }

}
