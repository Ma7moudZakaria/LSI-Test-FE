import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQuestionBankQuestionCreatModel } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-question-creat-model';
import { IQuestionBankQuestionUpdateModel } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-question-update-model';
import { IQuestionBankQuestionUpdateOrderBy } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-question-update-order-by';
import { IQuestionBankQuestionsFilterRequest } from '../../interfaces/questionBankQuestions-interfaces/iquestion-bank-questions-filter-request';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankQuestionService {
  addQuestionBankQuestionURL=environment.baseUrl+'QuestionBankQuestions/add-question-bank-question/';
  updateQuestionBankQuestionURL=environment.baseUrl+'QuestionBankQuestions/update-question-bank-question/';
   getQuestionBankQuestionDetailsURL=environment.baseUrl+'QuestionBankQuestions/get-question-bank-question/';
  getQuestionBankQuestionsFilterURL=environment.baseUrl+'QuestionBankQuestions/get-question-bank-questions-filter/';
  deleteQuestionBankQuestionURL=environment.baseUrl+'QuestionBankQuestions/delete-question-bank-question/';
  updateOrderQuestionBankQuestionURL=environment.baseUrl+'QuestionBankQuestions/update-order-question-bank-question/';
  constructor(private http:HttpClient) { }
  addQuestionBankQuestion(model:IQuestionBankQuestionCreatModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.addQuestionBankQuestionURL,model);
  }
  updateQuestionBankQuestion(model:IQuestionBankQuestionUpdateModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.updateQuestionBankQuestionURL,model);
  }
 
  getQuestionBankQuestionsFilter(filterRequest:IQuestionBankQuestionsFilterRequest):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.getQuestionBankQuestionsFilterURL,filterRequest)
  }
  getQuestionBankQuestionDetails(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.getQuestionBankQuestionDetailsURL+id)
  }
  deleteQuestionBankQuestion(id:string):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.deleteQuestionBankQuestionURL+id);
  }
  updateOrderQuestionBankQuestion(model:IQuestionBankQuestionUpdateOrderBy):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.updateOrderQuestionBankQuestionURL,model);
  }

}
