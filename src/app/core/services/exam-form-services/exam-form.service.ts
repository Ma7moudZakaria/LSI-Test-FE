import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAttachmentsExamTemplateModel } from '../../interfaces/exam-form-interfaces/iattachments-exam-template-model';
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
  AttachmentsExamTemplateURL=environment.baseUrl+'ExamForm/attachments-exam-template/';
  constructor(private http:HttpClient) { }
  addExamForm(model:IExamFormCreatModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.AddExamFormURL,model);
  }

  getExamFormFilter(filterRequest:IExamFormFilter):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.GetExamFormFilterURL,filterRequest)
  }
  getExamFormDetails(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetExamFormDetailsURL+id)
  }
  deleteExamForm(id:string):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.DeleteExamFormURL+id);
  }
  attachmentsExamTemplate(model:IAttachmentsExamTemplateModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.AttachmentsExamTemplateURL,model);
  }
}
