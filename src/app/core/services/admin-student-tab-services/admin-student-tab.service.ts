import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { IAdminStudentTabFilterRequest } from './../../interfaces/student-interfaces/iadmin-student-tab-filter-request';

@Injectable({
  providedIn: 'root'
})
export class AdminStudentTabService {
  getStudentManagementUrl = environment.baseUrl + 'StudentManagement/get-all-students';

  constructor(private http: HttpClient) {
  }



  getStudenrManagement(model: IAdminStudentTabFilterRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getStudentManagementUrl, model);
  }



}

