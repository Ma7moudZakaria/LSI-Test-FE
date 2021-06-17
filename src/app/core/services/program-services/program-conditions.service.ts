import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IassignConditionsToProgramModel } from '../../interfaces/programs-interfaces/iassign-conditions-to-program-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramConditionsService {
getProgramConditionsListURL = environment.baseUrl + 'ProgramPredefinedCustomConditions/get-all-program-predefined-custom-conditions';
addProgramPredefinedCustomConditionsURL=environment.baseUrl +'ProgramPredefinedCustomConditions/add-program-predefined-custom-conditions'

saveProgramConditionsListURL = environment.baseUrl + 'Programs/assign-conditions-to-program';
  constructor(
    private http: HttpClient
  ) { }

  getProgramConditionsList(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getProgramConditionsListURL);
  }

  saveProgramConditionsList(model:IassignConditionsToProgramModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.saveProgramConditionsListURL,model);
  }
  saveProgramConditions(model:IassignConditionsToProgramModel): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.saveProgramConditionsListURL,model);
  }

}
