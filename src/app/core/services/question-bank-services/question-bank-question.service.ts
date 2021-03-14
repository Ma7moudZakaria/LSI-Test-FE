import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQuestionBankQuestionCreatModel } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-question-creat-model';
import { IQuestionBankQuestionUpdateModel } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-question-update-model';
import { IQuestionBankQuestionsFilterRequest } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-filter-request';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankQuestionService {
  AddQuestionBankQuestionURL=environment.baseUrl+'QuestionBankQuestions/add-question-bank-question/';
  UpdateQuestionBankQuestionURL=environment.baseUrl+'QuestionBankQuestions/update-question-bank-question/';
   GetQuestionBankQuestionDetailsURL=environment.baseUrl+'QuestionBankQuestions/get-question-bank-question/';
  GetQuestionBankQuestionsFilterURL=environment.baseUrl+'QuestionBankQuestions/get-question-bank-questions-filter/';
  DeleteQuestionBankQuestionURL=environment.baseUrl+'QuestionBankQuestions/delete-question-bank-question/';

  constructor(private http:HttpClient) { }
  addQuestionBankQuestion(model:IQuestionBankQuestionCreatModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.AddQuestionBankQuestionURL,model);
  }
  UpdateQuestionBankQuestion(model:IQuestionBankQuestionUpdateModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.UpdateQuestionBankQuestionURL,model);
  }
 
  getQuestionBankQuestionsFilter(filterRequest:IQuestionBankQuestionsFilterRequest):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.GetQuestionBankQuestionsFilterURL,filterRequest)
  }
  getQuestionBankQuestionDetails(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetQuestionBankQuestionDetailsURL+id)
  }
  deleteQuestionBankQuestion(id:string):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.DeleteQuestionBankQuestionURL+id);
  }

}
