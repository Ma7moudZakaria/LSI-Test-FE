import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddTeacherToSharedProgramRequest } from '../../interfaces/teacher-program-tab-interfaces/add-teacher-to-shared-program-request-model';
import { IGetTeacherProgramBatchDetailsRequest } from '../../interfaces/teacher-program-tab-interfaces/get-teacher-program-batch-details-response-model';
import { ITeacherMyProgramsRequest } from '../../interfaces/teacher-program-tab-interfaces/teacher-my-programs-list-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class TeacherProgramTabService {
  getAllTeacherProgramsURL = environment.baseUrl + 'TeacherProgramSubscription/get-teacher-programs/';
  AddTeacherToSharedProgramURL = environment.baseUrl + 'TeacherManagement/add-teacher-to-shared-program/';
  getTeacherProgramDetailsURL = environment.baseUrl + 'TeacherManagement/get-teacher-program-batch-details/';

  constructor(private http: HttpClient) { }

  getAllTeacherPrograms(model: ITeacherMyProgramsRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getAllTeacherProgramsURL, model);
  }

  AddTeacherToSharedProgram(model?: IAddTeacherToSharedProgramRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.AddTeacherToSharedProgramURL, model);
  }

  getTeacherProgramDetails(model: IGetTeacherProgramBatchDetailsRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getTeacherProgramDetailsURL, model);
  }
}
