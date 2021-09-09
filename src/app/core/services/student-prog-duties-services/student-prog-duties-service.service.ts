import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDayTasksProgramDutyDayRequestModel } from '../../interfaces/student-program-duties-interfaces/iday-tasks-program-duty-day-request-model';
import { IStartStudentBatchRequestModel } from '../../interfaces/student-program-duties-interfaces/istart-student-batch-request-model';
import { IStudentProgramDutiesRequest } from '../../interfaces/student-program-duties-interfaces/istudent-program-duties-request';
import { ISubmitStudentDutyDayTaskModel } from '../../interfaces/student-program-duties-interfaces/isubmit-student-duty-day-task-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class StudentProgDutiesServiceService {

  getStudentProgDutiesURL = environment.baseUrl + 'StudentDutyWorkFlow/get-student-program-duty-days/';
  getDayTasksProgramToStudentURL=environment.baseUrl+'StudentDutyWorkFlow/get-day-tasks-by-student-program-day/';
  submitStudentTaskAnswerURL=environment.baseUrl+'StudentDutyWorkFlow/submit-student-task-answer/';
  startStudentBatchURL=environment.baseUrl+'StudentDutyWorkFlow/start-student-batch/';


  constructor(private http: HttpClient) { }

  getStudentProgDuties(model : IStudentProgramDutiesRequest):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.getStudentProgDutiesURL , model);
  }

  getDayTasksProgramToStudent(model:IDayTasksProgramDutyDayRequestModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.getDayTasksProgramToStudentURL,model);
  }

 submitStudentTaskAnswer(model:ISubmitStudentDutyDayTaskModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.submitStudentTaskAnswerURL,model);
  }

  startStudentBatch(model: IStartStudentBatchRequestModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.startStudentBatchURL, model);
  }

}
