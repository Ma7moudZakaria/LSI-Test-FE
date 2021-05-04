import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAnswer } from '../../interfaces/exam-builder-interfaces/ianswer';
import { IQuestion } from '../../interfaces/exam-builder-interfaces/iquestion';
import { IAttacheExamTemplateModel } from '../../interfaces/exam-form-interfaces/iattache-exam-template-model';

import { IExamFormCreatModel } from '../../interfaces/exam-form-interfaces/iexam-form-creat-model';
import { IExamFormFilter } from '../../interfaces/exam-form-interfaces/iexam-form-filter-request';

import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ExamFormService {
  AddExamFormURL=environment.baseUrl+'ExamForm/add-exam-form/';
   GetExamFormDetailsURL=environment.baseUrl+'ExamForm/get-exam-form-details/';
  GetExamFormFilterURL=environment.baseUrl+'ExamForm/get-exam-forms-filter/';
  DeleteExamFormURL=environment.baseUrl+'ExamForm/delete-exam-Form/';
  AttacheExamTemplateURL=environment.baseUrl+'ExamForm/attache-exam-template/';
  constructor(private http:HttpClient) { }
  addExamForm(model:IExamFormCreatModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.AddExamFormURL,model);
  }

  getExamFormFilter(filterRequest:IExamFormFilter):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.GetExamFormFilterURL,filterRequest)
  }
  getExamFormDetails(id?:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetExamFormDetailsURL+id)
  }
  deleteExamForm(id:string):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.DeleteExamFormURL+id);
  }
  attachmentsExamTemplate(model:IAttacheExamTemplateModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.AttacheExamTemplateURL,model);
  }
  validateQuestion(questionList:IQuestion[]):boolean{
    if(questionList.length>0){
    // if (!questionList.some(e => e.text)||questionList.some(e => e.voiceUrl)){return false}
    if (!questionList.every(e => e.questionType)){return false}
    if (!questionList.every(e => e.degree)){return false}
    if (!questionList.every(e => e.time)){return false}
    else return true;
    }
    else
    return true;
  }
  validateAnswer(answerList:IAnswer[]):boolean{
    if(answerList.length>0){
      // if (!questionList.some(e => e.text)||questionList.some(e => e.voiceUrl)){return false}
      if (!answerList.every(e => e.text)){return false}
      if (!answerList.every(e => e.correct)){return false}
      else return true;
      }
      else
      return true;
  }
  

}
