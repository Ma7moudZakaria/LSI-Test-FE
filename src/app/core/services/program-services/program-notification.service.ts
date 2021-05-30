import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProgramNotificationModel } from '../../interfaces/programs-interfaces/iprogram-notification-model';
import { IProgramUpdateNotifacationModel } from '../../interfaces/programs-interfaces/iprogram-update-notification-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';
@Injectable({
  providedIn: 'root'
})
export class ProgramNotificationService {


  AddNotificationURL = environment.baseUrl + '';
  UpdateNotificationURL = environment.baseUrl + '';
  DelaeteNotificationURL = environment.baseUrl + '';
  GetAllNotificationURL = environment.baseUrl + '';
  GetNotificationDetails = environment.baseUrl + '';
  DeleteNotificationURL = environment.baseUrl + '';


  constructor(private http: HttpClient) { }


  addNotification(model: IProgramNotificationModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.AddNotificationURL, model);
  }

  updateNotification(model: IProgramUpdateNotifacationModel): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.UpdateNotificationURL, model);
  }

  getAllNotifications(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.GetAllNotificationURL + id)
  }

  getNotificationDetails(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.GetNotificationDetails + id)
  }

  deleteNotification(id: string): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.DeleteNotificationURL + id);
  }



}
