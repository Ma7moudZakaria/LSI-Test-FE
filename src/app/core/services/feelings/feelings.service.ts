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


  AddFeelingsURL = environment.baseUrl + 'Feeling/create-feeling';
  GetAllFeelingsURL = environment.baseUrl + 'Feeling/get-all-feelings';
  GetAllFeelingsByFilterURL = environment.baseUrl + 'Feeling/get-all-feelings-by-filter/';
  approveCancelFeelingsURL = environment.baseUrl + 'Feeling/aprove-cancel-feeling/';
  DeleteFeelingsURL = environment.baseUrl + 'Feeling/delete-feeling/';




  addAllFeelings(model: IProgramNotificationModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.AddFeelingsURL, model);
  }
  getAllFeelings(id: RoleEnum): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.GetAllFeelingsURL + id)
  }

  getFeelingsByFilter(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.GetAllFeelingsByFilterURL + id)
  }

  approvecCancelFeelingS(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.approveCancelFeelingsURL + id);
  }

  deleteFeelings(id: string): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.DeleteFeelingsURL + id);
  }




}
