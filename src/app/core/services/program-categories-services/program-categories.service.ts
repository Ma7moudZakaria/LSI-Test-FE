import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { environment } from '../../../../environments/environment';
import { IAddEditProgramCategory } from '../../interfaces/program-categories-interfaces/iadd-edit-program-category';
import { IPrgoramCategrory } from '../../interfaces/program-categories-interfaces/iprgoram-categrory';

@Injectable({
  providedIn: 'root'
})
export class ProgramCategoriesService {

  getProgramCatiegoriesUrl = environment.baseUrl + 'ProgramCategories/get-program-category/';
  addProgramcategoryURL = environment.baseUrl + 'ProgramCategories/add-program-category';
  updateProgramCatiegoriesURL = environment.baseUrl + 'ProgramCategories/update-program-category';
    getProgramsCategoryURL = environment.baseUrl + 'ProgramCategories/get-category-programs/';

  daleteProgramCatiegoriesURL = environment.baseUrl + 'ProgramCategories/delete-program-category/';

  // /api/ProgramCategories/add-program-category
  constructor(private http: HttpClient) { }




  getProgramCatiegories(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getProgramCatiegoriesUrl);
  }

  addProgramCatiegories(model: IAddEditProgramCategory): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addProgramcategoryURL, model);
  }
  updateProgramCatiegories(model: IAddEditProgramCategory): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.updateProgramCatiegoriesURL, model);
  }

  deleteProgramCatiegories(id: string): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.daleteProgramCatiegoriesURL + id);
  }



  getProgramsCategoryByProgramId(id?: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getProgramsCategoryURL+ id);
  }
}

