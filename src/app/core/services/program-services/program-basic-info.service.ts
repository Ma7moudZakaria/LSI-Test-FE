import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProgramBasicInfoModel } from '../../interfaces/programs-interfaces/iprogram-basic-info-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramBasicInfoService {

  AddNotificationURL = environment.baseUrl + '';

  constructor(private http: HttpClient) { }


  addBasicIfoProgram(model: IProgramBasicInfoModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.AddNotificationURL, model);
  }

}
