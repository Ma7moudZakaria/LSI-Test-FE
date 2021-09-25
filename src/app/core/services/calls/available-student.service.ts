import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAvailableTeacher } from '../../interfaces/calls/iavailable-teacher';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { IAvailableStudentRequest } from '../../interfaces/calls/iavailable-student-request';

@Injectable({
  providedIn: 'root'
})
export class AvailableStudentService {

  getAllAvailableStudentrUrl = environment.baseUrl + 'Calls/get-all-available-students';


  constructor(private http: HttpClient) {
  }

  getAllAvailableStudent(model: IAvailableStudentRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getAllAvailableStudentrUrl, model);
  }
}
