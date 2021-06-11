import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProgramNotificationModel } from '../../interfaces/programs-interfaces/iprogram-notification-model';
import { IProgramUpdateNotifacationModel } from '../../interfaces/programs-interfaces/iprogram-update-notification-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { IFeelingsDetailsModel } from '../../interfaces/feeling-interfaces/ifeelings-details-model';


@Injectable({
  providedIn: 'root'
})
export class FeelingsService {

  constructor(private http: HttpClient) { }


  addFeelingsURL = environment.baseUrl + 'Feeling/create-feeling';
  getNotPublishedFeelingsURL = environment.baseUrl + 'Feeling/get-not-published-feelings/';
  getPublishedFeelingsByFilterURL = environment.baseUrl + 'Feeling/get-published-feelings-by-filter/';
  approveCancelFeelingURL = environment.baseUrl + 'Feeling/approve-cancel-feeling/';
  deleteFeelingsURL = environment.baseUrl + 'Feeling/delete-feeling/';




  addAllFeelings(model: IProgramNotificationModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addFeelingsURL, model);
  }
  getNotPublishedFeelings(id: RoleEnum): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getNotPublishedFeelingsURL + id)
  }

  getPublishedFeelingsByFilter(id: RoleEnum): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getPublishedFeelingsByFilterURL + id)
  }

  approvecCancelFeeling(id: string): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.approveCancelFeelingURL + id, null);
  }

  deleteFeelings(id: string): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.deleteFeelingsURL + id);
  }
}
