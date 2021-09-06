import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStudentProgramDutiesRequest } from '../../interfaces/student-program-duties-interfaces/istudent-program-duties-request';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class StudentProgDutiesServiceService {

  getStudentProgDutiesURL = environment.baseUrl + 'StudentDutyWorkFlow/get-student-program-duty-days/';
  getDayTasksProgramToStudentURL=environment.baseUrl+'Programs/get-day-tasks-by-student-program-day/';
  constructor(private http: HttpClient) { }

  getStudentProgDuties(model : IStudentProgramDutiesRequest):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.getStudentProgDutiesURL , model);
  }

  getDayTasksProgramToStudent(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.getDayTasksProgramToStudentURL+id);
  }

}
