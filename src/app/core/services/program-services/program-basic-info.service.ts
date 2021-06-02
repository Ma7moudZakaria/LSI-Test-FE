import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProgramBasicInfoModel } from '../../interfaces/programs-interfaces/iprogram-basic-info-model';
import { IProgramBasicInfoUpdateModel } from '../../interfaces/programs-interfaces/iprogram-basic-info-update-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramBasicInfoService {

  AddBasicInfoURL = environment.baseUrl + 'programs/add-program-basic-info';
  UpdateBasicInfoURL = environment.baseUrl + '';

  constructor(private http: HttpClient) { }


  addBasicIfoProgram(model: IProgramBasicInfoModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.AddBasicInfoURL, model);
  }
  updateBasicIfoProgram(model: IProgramBasicInfoUpdateModel): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.UpdateBasicInfoURL, model);
  }

}
