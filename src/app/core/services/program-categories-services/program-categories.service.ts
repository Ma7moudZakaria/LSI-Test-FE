import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { environment } from '../../../../environments/environment';
import { IAddProgramCategory } from '../../interfaces/program-categories-interfaces/iadd-program-category';
import { IEditProgramCategory } from '../../interfaces/program-categories-interfaces/iedit-program-category';
import { IPrgoramCategrory } from '../../interfaces/program-categories-interfaces/iprgoram-categrory';

@Injectable({
  providedIn: 'root'
})
export class ProgramCategoriesService {

  getProgramCatiegoriesUrl = environment.baseUrl + 'ProgramCategories/get-program-category/';
  addProgramcategoryURL = environment.baseUrl + 'ProgramCategories/add-program-category';
  updateProgramCatiegoriesURL = environment.baseUrl + 'ProgramCategories/update-program-category';
  daleteProgramCatiegoriesURL = environment.baseUrl + 'ProgramCategories/delete-program-category/';

  // /api/ProgramCategories/add-program-category
  constructor(private http: HttpClient) { }




  getProgramCatiegories(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getProgramCatiegoriesUrl);
  }

  addProgramCatiegories(model: IAddProgramCategory): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addProgramcategoryURL, model);
  }
  updateProgramCatiegories(model: IEditProgramCategory): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.updateProgramCatiegoriesURL, model);
  }

  deleteProgramCatiegories(id: string): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.daleteProgramCatiegoriesURL + id);
  }


}

