import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAvailableTeacher } from '../../interfaces/calls/iavailable-teacher';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class AvailableTeachersService {

  getAllAvailableTeacherUrl = environment.baseUrl + 'Calls/get-all-available-teachers';


  constructor(private http: HttpClient) {
  }

  getAllAvailableTeacher(model: IAvailableTeacher): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getAllAvailableTeacherUrl, model);
  }

}
