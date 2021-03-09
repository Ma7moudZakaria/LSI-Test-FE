import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IquestionBankCategoriesFilter } from '../../interfaces/questionBankCategories-interfaces/iquestion-bank-categories-filter-.request';
import { IquestionBankCategoryCreatModel } from '../../interfaces/questionBankCategories-interfaces/iquestion-bank-category-creat-model';
import { IquestionBankCategoryUpdateModel } from '../../interfaces/questionBankCategories-interfaces/iquestion-bank-category-update-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankCategoryService {
  AddQuestionBankCategoryURL=environment.baseUrl+'QuestionBankCategories/add-question-bank-category/';
  UpdateQuestionBankCategoryURL=environment.baseUrl+'QuestionBankCategories/update-question-bank-categories/';
   GetQuestionBankCategoryDetailsURL=environment.baseUrl+'QuestionBankCategories/get-question-bank-category/';
  GetQuestionBankCategoryFilterURL=environment.baseUrl+'QuestionBankCategories/get-question-bank-category-filter/';
  DeleteQuestionBankCategoryURL=environment.baseUrl+'QuestionBankCategories/delete-question-bank-category/';

  constructor(private http:HttpClient) { }
  addQuestionBankCategory(model:IquestionBankCategoryCreatModel):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.AddQuestionBankCategoryURL,model);
  }
  UpdateQuestionBankCategory(model:IquestionBankCategoryUpdateModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.UpdateQuestionBankCategoryURL,model);
  }
 
  getQuestionBankCategoriesFilter(filterRequest:IquestionBankCategoriesFilter):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.GetQuestionBankCategoryFilterURL,filterRequest)
  }
  getQuestionBankCategoryDetails(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetQuestionBankCategoryDetailsURL+id)
  }
  deleteQuestionBankCategory(id:string):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.DeleteQuestionBankCategoryURL+id);
  }

}
