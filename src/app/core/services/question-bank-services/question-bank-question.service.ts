import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IquestionBankQuestionCreatModel } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-question-creat-model';
import { IquestionBankQuestionUpdateModel } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-question-update-model';
import { IquestionBankQuestionsFilterRequest } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-filter-request';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankQuestionService {
  AddQuestionBankQuestionURL=environment.BaseURL+'QuestionBankQuestions/add-question-bank-question/';
  UpdateQuestionBankQuestionURL=environment.BaseURL+'QuestionBankQuestions/update-question-bank-question/';
   GetQuestionBankQuestionDetailsURL=environment.BaseURL+'QuestionBankQuestions/get-question-bank-question/';
  GetQuestionBankQuestionsFilterURL=environment.BaseURL+'QuestionBankQuestions/get-question-bank-questions-filter/';
  DeleteQuestionBankQuestionURL=environment.BaseURL+'QuestionBankQuestions/delete-question-bank-question/';

  constructor(private http:HttpClient) { }
  addQuestionBankQuestion(model:IquestionBankQuestionCreatModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.AddQuestionBankQuestionURL,model);
  }
  UpdateQuestionBankQuestion(model:IquestionBankQuestionUpdateModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.UpdateQuestionBankQuestionURL,model);
  }
 
  getQuestionBankQuestionsFilter(filterRequest:IquestionBankQuestionsFilterRequest):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.GetQuestionBankQuestionsFilterURL,filterRequest)
  }
  getQuestionBankQuestionDetails(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetQuestionBankQuestionDetailsURL+id)
  }
  deleteQuestionBankQuestion(id:string):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.DeleteQuestionBankQuestionURL+id);
  }

}
