import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPredefinedCondtionSubscriptionModel } from '../../interfaces/student-program-subscription-interfaces/ipredefined-condtion-subscription-model';
import { IRejectProgramSubscriptionModel } from '../../interfaces/student-program-subscription-interfaces/ireject-program-subscription-model';
import { IStudentCustomConditionAnswerModel } from '../../interfaces/student-program-subscription-interfaces/istudent-custom-condition-answer-model';
import { IstudentJoiningExamAnswerModel } from '../../interfaces/student-program-subscription-interfaces/istudent-joining-exam-answer-model';
import { IStudentMyProgramsRequestModel } from '../../interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import { IStudentSubscriptionFilterRequestModel } from '../../interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class StudentProgramSubscriptionServicesService {
  getStudentsSubscriptionsFilterURL = environment.baseUrl + 'StudentProgramSubscription/get-students-subscriptions-filter/';
  studentProgramSubscriptionsAcceptanceURL = environment.baseUrl + 'StudentProgramSubscription/accept-student-program-subscription/';
  rejectStudentProgramSubscriptionURL = environment.baseUrl + 'StudentProgramSubscription/reject-student-program-subscription/';
  getStudentCustomConditionURL = environment.baseUrl + 'StudentProgramSubscription/get-student-custom-condition/';
  submitStudentCustomConditionAnswerURL = environment.baseUrl + 'StudentProgramSubscription/submit-student-custom-condition-answer/';
  getRandomExamURL = environment.baseUrl + 'StudentProgramSubscription/submit-student-custom-condition-answer/';
  submitStudentJoiningExamAnswerURL = environment.baseUrl + 'StudentProgramSubscription/submit-student-joining-exam-answer/';
  studentProgramSubscriptionsCompletedURL = environment.baseUrl + 'StudentProgramSubscription/student-program-subscription-completed/';
  getProgramsForStudentsSubscriptionsURL= environment.baseUrl + 'StudentProgramSubscription/get-programs-for-students-subscriptions/';
  verifyProgramPredefinedConditionURL= environment.baseUrl + 'StudentProgramSubscription/verify-program-predefined-condition/';
  getStudentProgramsURL= environment.baseUrl + 'StudentProgramSubscription/get-student-programs/';

  constructor(private http: HttpClient) { }

  getStudentsSubscriptionsFilter(model : IStudentSubscriptionFilterRequestModel):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.getStudentsSubscriptionsFilterURL , model);
  }

  studentProgramSubscriptionsAcceptance(model : string[]):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.studentProgramSubscriptionsAcceptanceURL , model);
  }

  rejectStudentProgramSubscription(model : IRejectProgramSubscriptionModel):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.rejectStudentProgramSubscriptionURL ,model);
  }

  getStudentCustomCondition(id: string):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.getStudentCustomConditionURL ,id);
  }

  submitStudentCustomConditionAnswer(model: IStudentCustomConditionAnswerModel):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.submitStudentCustomConditionAnswerURL ,model);
  }

  getRandomExam(id: string):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.getRandomExamURL ,id);
  }

  submitStudentJoiningExamAnswer(model:IstudentJoiningExamAnswerModel ):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.submitStudentJoiningExamAnswerURL ,model);
  }

  studentProgramSubscriptionsCompleted(model:string[] ):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.studentProgramSubscriptionsCompletedURL ,model);
  }

  getProgramsForStudentsSubscriptions(model:string[] ):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.getProgramsForStudentsSubscriptionsURL ,model);
  }

  verifyProgramPredefinedCondition(model:IPredefinedCondtionSubscriptionModel ):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.verifyProgramPredefinedConditionURL ,model);
  }

  getStudentPrograms(model:IStudentMyProgramsRequestModel ):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.getStudentProgramsURL ,model);
  }

}
