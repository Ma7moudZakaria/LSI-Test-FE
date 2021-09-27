import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAssignExamFormsToProgram } from '../../interfaces/programs-interfaces/iassign-exam-forms-to-program';
import { ICopyProgram } from '../../interfaces/programs-interfaces/iprogram-copy-model';
import { IprogramCreatModel } from '../../interfaces/programs-interfaces/iprogram-creat-model';
import { IProgramFilterAdvancedRequest, IProgramFilterByNameRequest } from '../../interfaces/programs-interfaces/iprogram-filter-requests';
import { IProgramSubscriptionDetailsRequest } from '../../interfaces/programs-interfaces/iprogram-subscription-details-request';
import { IprogramUpdateModel } from '../../interfaces/programs-interfaces/iprogram-update-model';
import { ISharedProgramsResponseModel } from '../../interfaces/programs-interfaces/ishared-programs-response-model';
import { IProgramSubscriptionDetails } from '../../interfaces/teacher-program-subscription-interfaces/iprogram-subscription-details';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  // AddProgramURL=environment.baseUrl+'QuestionBankQuestions/add-question-bank-question/';
  // UpdateProgramnURL=environment.baseUrl+'QuestionBankQuestions/update-question-bank-question/';
  getProgramURL=environment.baseUrl+'Programs/get-program-details-by-id/';
  getAllSharedProgramsURL=environment.baseUrl+'Programs/get-all-shared-programs/';

  // GetProgramsFilterURL=environment.baseUrl+'QuestionBankQuestions/get-question-bank-questions-filter/';
  deleteProgramURL=environment.baseUrl+'Programs/delete-program/';
  // GetAllProgramsURL=environment.baseUrl+'Programs/get-programs-lookup/';
  GetAllProgramsURL=environment.baseUrl+'Programs/get-program-filter-by-name/';

  assignExamFormToProgramURL=environment.baseUrl+'Programs/assign-exam-form-to-program/';
  updateProgramExamToggleURL=environment.baseUrl+'Programs/update-program-exam-form-toggle/';
  programPauseURL = environment.baseUrl + 'Programs/program-pause/';
  programAdvancedFilterURL = environment.baseUrl + 'Programs/get-program-advanced-filter';

  programPublishPauseURL = environment.baseUrl + 'Programs/program-publish-pause/';
  CopyProgramURL=environment.baseUrl+'Programs/copy-program/';
  getSubscriptionProgramDetailsURL = environment.baseUrl + 'Programs/get-subscription-program-details/';

  getSharedProgramsURL = environment.baseUrl + 'Programs/get-all-shared-programs/';
  getProgramDaysByProgramIdURL= environment.baseUrl + 'Programs/get-program-days-by-program-id/';


  constructor(private http: HttpClient) { }

  // addProgram(model:IprogramCreatModel):Observable<BaseResponseModel>{
  //   return this.http.post<BaseResponseModel>(this.AddProgramURL,model);
  // }

  // UpdateProgram(model: IprogramUpdateModel): Observable<BaseResponseModel>{
  //   return this.http.put<BaseResponseModel>(this.UpdateProgramnURL,model);
  // }

  // getProgramsFilter(filterRequest:IProgramFilterAdvancedRequest):Observable<BaseResponseModel>{
  //   return this.http.post<BaseResponseModel>(this.GetProgramsFilterURL,filterRequest)
  // }

  getAllSharedPrograms():Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.getAllSharedProgramsURL)
  }

  getAllPrograms(model:IProgramFilterByNameRequest):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.GetAllProgramsURL, model)
  }

  getProgramDetails(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.getProgramURL+id)
  }

  // getProgramDutyDays(id:string):Observable<BaseResponseModel>{
  //   return this.http.get<BaseResponseModel>(this.DeleteProgramURL+id);
  // }

  copyProgram(model:ICopyProgram):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.CopyProgramURL,model);
  }

  deleteProgram(id:string):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.deleteProgramURL+id);
  }

  assignExamFormToProgram(model:IAssignExamFormsToProgram):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.assignExamFormToProgramURL,model);
  }

  updateProgramExamToggle(programId:string):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.updateProgramExamToggleURL+programId, null);
  }

  programPause(programId:string):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.programPauseURL,programId);
  }

  getProgramAdvancedFilter(filterRequest: IProgramFilterAdvancedRequest): Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.programAdvancedFilterURL,filterRequest)
  }

  ProgramPublishPause(id: string): Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.programPublishPauseURL+id , null);
  }

  getSubscriptionProgramDetails(model : IProgramSubscriptionDetailsRequest): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getSubscriptionProgramDetailsURL, model)
  }

  getSharedPrograms(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getSharedProgramsURL)
  }

  getProgramDaysByProgramId(id: string): Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.getProgramDaysByProgramIdURL+id);
  }
}
