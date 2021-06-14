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


  AddNotificationURL = environment.baseUrl + 'Programs/add-program-notification';
  UpdateNotificationURL = environment.baseUrl + 'Programs/update-program-notification';
  DeleteNotificationURL = environment.baseUrl + 'Programs/delete-program-notification/';
  GetAllNotificationURL = environment.baseUrl + 'Programs/get-program-notifications-by-program-id/';
  GetNotificationDetailsURL = environment.baseUrl + 'Programs/get-program-notification-types-to-program';


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
    return this.http.get<BaseResponseModel>(this.GetNotificationDetailsURL + id)
  }

  deleteNotification(id: string): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.DeleteNotificationURL + id);
  }



}
