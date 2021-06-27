import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddProgramPredefinedCustomConditionsModel } from '../../interfaces/programs-interfaces/iadd-program-predefined-custom-conditions-model';
import { IassignConditionsToProgramModel } from '../../interfaces/programs-interfaces/iassign-conditions-to-program-model';
import { IUpdateProgramConditionDetailsModel } from '../../interfaces/programs-interfaces/iupdate-program-condition-details-model';
import { IUpdateProgramPredefinedCustomConditionsModel } from '../../interfaces/programs-interfaces/iupdate-program-predefined-custom-conditions-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramConditionsService {
getProgramConditionsListURL = environment.baseUrl + 'ProgramPredefinedCustomConditions/get-all-program-predefined-custom-conditions';
addProgramPredefinedCustomConditionsURL=environment.baseUrl +'ProgramPredefinedCustomConditions/add-program-predefined-custom-conditions';
updateProgramPredefinedCustomConditionsURL=environment.baseUrl +'ProgramPredefinedCustomConditions/update-program-predefined-custom-conditions';
deleteProgramPredefinedCustomConditionsURL=environment.baseUrl +'ProgramPredefinedCustomConditions/delete-program-predefined-custom-conditions';
saveProgramConditionsListURL = environment.baseUrl + 'Programs/assign-conditions-to-program';
getProgramConditionsByProgIdURL=environment.baseUrl + 'Programs/get-program-condition-by-program-id/';
getConditionsNotAssignedToProgramURL=environment.baseUrl + 'Programs/get-conditions-not-assigned-to-program/';
deleteProgramConditionURL=environment.baseUrl +'Programs/delete-prog-cond/';
updateProgramConditionDetailsURL=environment.baseUrl +'Programs/update-program-condition-details';

  constructor(
    private http: HttpClient
  ) { }

  getProgramConditionsList(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getProgramConditionsListURL);
  }

  getProgramConditionsByProgId(id:string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getProgramConditionsByProgIdURL+id);
  }

  saveProgramPredefinedCustomConditions(model:IAddProgramPredefinedCustomConditionsModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addProgramPredefinedCustomConditionsURL,model);
  }

  putProgramPredefinedCustomConditions(model:IUpdateProgramPredefinedCustomConditionsModel): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.updateProgramPredefinedCustomConditionsURL,model);
  }

  deleteProgramPredefinedCustomConditions(id:string): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.deleteProgramPredefinedCustomConditionsURL+id);
  }

  saveProgramConditions(model:IassignConditionsToProgramModel): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.saveProgramConditionsListURL,model);
  }

  getConditionsNotAssignedToProgram(id:string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getConditionsNotAssignedToProgramURL+id);
  }

  deleteProgramCondition(id:string): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.deleteProgramConditionURL+id);
  }
  updateProgramConditionDetails(model:IUpdateProgramConditionDetailsModel): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.updateProgramConditionDetailsURL,model);
  }

}
