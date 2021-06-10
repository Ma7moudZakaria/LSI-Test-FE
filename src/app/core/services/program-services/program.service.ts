import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAssignExamFormsToProgram } from '../../interfaces/programs-interfaces/iassign-exam-forms-to-program';
import { IprogramCreatModel } from '../../interfaces/programs-interfaces/iprogram-creat-model';
import { IProgramFilterByNameFilterRequest } from '../../interfaces/programs-interfaces/iprogram-filter-by-name-filter-request';
import { IprogramFilterRequest } from '../../interfaces/programs-interfaces/iprogram-filter-request';
import { IProgramFilterAdvancedRequest } from '../../interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramUpdateModel } from '../../interfaces/programs-interfaces/iprogram-update-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  AddProgramURL=environment.baseUrl+'QuestionBankQuestions/add-question-bank-question/';
  UpdateProgramnURL=environment.baseUrl+'QuestionBankQuestions/update-question-bank-question/';
  GetProgramURL=environment.baseUrl+'Programs/get-program-details-by-id/';
  
  GetProgramsFilterURL=environment.baseUrl+'QuestionBankQuestions/get-question-bank-questions-filter/';
  DeleteProgramURL=environment.baseUrl+'QuestionBankQuestions/delete-question-bank-question/';
  // GetAllProgramsURL=environment.baseUrl+'Programs/get-programs-lookup/';
  GetAllProgramsURL=environment.baseUrl+'Programs/get-program-filter-by-name/';

  assignExamFormToProgramURL=environment.baseUrl+'Programs/assign-exam-form-to-program/';
  updateProgramExamToggleURL=environment.baseUrl+'Programs/update-program-exam-form-toggle/';
  programPauseURL = environment.baseUrl + 'Programs/program-pause/';
  programAdvancedFilterURL = environment.baseUrl + 'Programs/get-program-advanced-filter';

  constructor(private http: HttpClient) { }

  addProgram(model:IprogramCreatModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.AddProgramURL,model);
  }

  UpdateProgram(model: IprogramUpdateModel): Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.UpdateProgramnURL,model);
  }
 
  getProgramsFilter(filterRequest:IprogramFilterRequest):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.GetProgramsFilterURL,filterRequest)
  }

  getAllPrograms(model:IProgramFilterByNameFilterRequest):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.GetAllProgramsURL, model)
  }

  getProgramDetails(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetProgramURL+id)
  }

  getProgramDutyDays(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.DeleteProgramURL+id);
  }  

  deleteProgram(id:number):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.DeleteProgramURL+id);
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

}
