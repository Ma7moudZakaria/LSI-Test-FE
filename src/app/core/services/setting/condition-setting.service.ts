import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IConditionModel } from '../../interfaces/setting/icondition-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ConditionSettingService {

  AddConditionURL = environment.baseUrl + '/ProgramPredefinedCustomConditions/add-program-predefined-custom-conditions';

  constructor(private http: HttpClient) { }


  addCondition(model: IConditionModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.AddConditionURL, model);
  }



}
