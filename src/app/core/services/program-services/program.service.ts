import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IprogramCreatModel } from '../../interfaces/programs-interfaces/iprogram-creat-model';
import { IprogramFilterRequest } from '../../interfaces/programs-interfaces/iprogram-filter-request';
import { IprogramUpdateModel } from '../../interfaces/programs-interfaces/iprogram-update-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  AddProgramURL=environment.baseUrl+'QuestionBankQuestions/add-question-bank-question/';
  UpdateProgramnURL=environment.baseUrl+'QuestionBankQuestions/update-question-bank-question/';
   GetProgramURL=environment.baseUrl+'QuestionBankQuestions/get-question-bank-question/';
  GetProgramsFilterURL=environment.baseUrl+'QuestionBankQuestions/get-question-bank-questions-filter/';
  DeleteProgramURL=environment.baseUrl+'QuestionBankQuestions/delete-question-bank-question/';
  GetAllProgramsURL=environment.baseUrl+'Programs/get-programs-lookup/';
  
  constructor(private http:HttpClient) { }

  addProgram(model:IprogramCreatModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.AddProgramURL,model);
  }
  UpdateProgram(model:IprogramUpdateModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.UpdateProgramnURL,model);
  }
 
  getProgramsFilter(filterRequest:IprogramFilterRequest):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.GetProgramsFilterURL,filterRequest)
  }

  getAllPrograms():Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetAllProgramsURL)
  }

  getProgramDetails(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetProgramURL+id)
  }
  deleteProgram(id:number):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.DeleteProgramURL+id);
  }  
}
