import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnswerTypeEnum } from '../../enums/exam-builder-enums/answer-type-enum.enum';
import { QuestionTypeEnum } from '../../enums/exam-builder-enums/question-type-enum.enum';
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
    if (questionList.length > 0) {
    
      let res1 = questionList.every(ques => {
        let res = this.validateAnswer(ques.answers,true, ques.answerType);
        if (!res){
          return false;
        }
        return true;
      });
    
      if (!res1) {return false}
    if (questionList.some(e => !e.text && !e.voiceUrl)){return false}
    if (!questionList.every(e => e.degree)){return false}
    if (!questionList.every(e => e.time)){return false}
    if (questionList.some(e => e.degree && e.degree < 1)){return false}
    if (questionList.some(e => e.time && e.time < 1)){return false}
  if(this.getDuplicateQuestion(questionList).length>0){return false}
    else return true;
    }
    else
    return true;
  }

  validateAnswer(answerList:IAnswer[], quesValid:boolean = false, ansType:AnswerTypeEnum = AnswerTypeEnum.multiSelect):boolean{
    if (quesValid){
      if (answerList.length <= 1) {return false}
    }

    if(answerList.length>=1){
      if (answerList.some(e => !e.text)){return false}
      if(this.getDuplicateAnswer(answerList).length>0){return false}
      if(ansType == AnswerTypeEnum.multiSelect && answerList.filter(x=>x.correct==true).length<1){return false}
      else return true;
      }
      else
      return true;
  }
   getDuplicateQuestion(arr:IQuestion[]){
    var sorted_arr = arr.slice().sort((a, b) => a.text! > b.text! && 1 || -1);
    sorted_arr=sorted_arr.filter(x=>x.text!="");
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1].text === sorted_arr[i].text) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
}

getDuplicateAnswer(arr:IAnswer[]){
  var sorted_arr = arr.slice().sort((a, b) => a.text! > b.text! && 1 || -1);
  sorted_arr=sorted_arr.filter(x=>x.text!="");
  var results = [];
  for (var i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1].text === sorted_arr[i].text) {
          results.push(sorted_arr[i]);
      }
  }
  return results;
}

}
