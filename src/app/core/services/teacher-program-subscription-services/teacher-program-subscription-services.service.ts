import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProgramsForTeachersSubscriptionsModel } from '../../interfaces/teacher-program-subscription-interfaces/iprograms-for-teachers-subscriptions-model';
import { IRejectTeacherProgramSubscriptionModel } from '../../interfaces/teacher-program-subscription-interfaces/ireject-teacher-program-subscription-model';
import { ITeacherMyProgramsRequestModel } from '../../interfaces/teacher-program-subscription-interfaces/iteacher-my-programs-request-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from '../../interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { ITeacherSubmitSubscriptinoModel } from '../../interfaces/teacher-program-subscription-interfaces/iteacher-submit-subscriptino-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class TeacherProgramSubscriptionServicesService {

  getTeachersProgramsSubscriptionsFilterURL=environment.baseUrl + 'TeacherProgramSubscription/get-teacher-program-subscriptions-filter/';
  teacherProgramSubscriptionsAcceptanceURL=environment.baseUrl + 'TeacherProgramSubscription/accept-teacher-program-subscription/';
  rejectTeachersProgramSubscriptionURL=environment.baseUrl + 'TeacherProgramSubscription/reject-teacher-program-subscription/';
  submitTeacherSubscriptionURL=environment.baseUrl + 'TeacherProgramSubscription/submit-teacher-subscription/';
  getProgramsForTeacherssSubscriptionsURL=environment.baseUrl + 'TeacherProgramSubscription/get-programs-for-teachers-subscriptions/';
  getTeacherProgramsURL=environment.baseUrl + 'TeacherProgramSubscription/get-teacher-programs/';

  constructor(private http: HttpClient) { }

  getTeachersProgramsSubscriptionsFilter(model:ITeacherProgramSubscriptionFilterRequestModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.getTeachersProgramsSubscriptionsFilterURL , model);
  }

  teacherProgramSubscriptionsAcceptance(model : string[]):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.teacherProgramSubscriptionsAcceptanceURL , model);
  }

  rejectTeachersProgramSubscription(model : IRejectTeacherProgramSubscriptionModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.rejectTeachersProgramSubscriptionURL , model);
  }

  submitTeacherSubscription(model : ITeacherSubmitSubscriptinoModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.submitTeacherSubscriptionURL , model);
  }

  getProgramsForTeacherssSubscriptions(model:IProgramsForTeachersSubscriptionsModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.getProgramsForTeacherssSubscriptionsURL , model);
  }

  getTeacherPrograms(model:ITeacherMyProgramsRequestModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.getTeacherProgramsURL , model);
  }

}
