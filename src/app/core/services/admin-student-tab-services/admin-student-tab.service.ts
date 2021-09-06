import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { IAdminStudentTabFilterRequest } from './../../interfaces/student-interfaces/iadmin-student-tab-filter-request';
import { IStudentMyProgramsRequestModel } from '../../interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';

@Injectable({
  providedIn: 'root'
})
export class AdminStudentTabService {
  getStudentManagementUrl = environment.baseUrl + 'StudentManagement/get-all-students';
  // getStudentProgramsURL = environment.baseUrl + 'StudentProgramSubscription/get-student-programs/';

  constructor(private http: HttpClient) {
  }

  getStudentManagement(model: IAdminStudentTabFilterRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getStudentManagementUrl, model);
  }

  // getStudentPrograms(model: IStudentMyProgramsRequestModel): Observable<BaseResponseModel> {
  //   return this.http.post<BaseResponseModel>(this.getStudentProgramsURL, model);
  // }
  // get-student-programs-with-batches-filter => without programs dropedout Done  (URL => 
  //   /api/StudentProgramSubscription/get-student-programs

}

