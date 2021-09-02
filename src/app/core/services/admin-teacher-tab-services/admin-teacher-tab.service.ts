import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponseModel} from '../../ng-model/base-response-model';
import {AdminTeacherTabFilterModel} from '../../interfaces/teacher-interfaces/admin-teacher-tab-filter-model';

@Injectable({
  providedIn: 'root'
})
export class AdminTeacherTabService {
  getTeacherManagementUrl = environment.baseUrl + 'TeacherManagement/get-all-teachers/';

  constructor(private http: HttpClient) {
  }

  getTeacherManagement(model: AdminTeacherTabFilterModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getTeacherManagementUrl,model);
  }


}


