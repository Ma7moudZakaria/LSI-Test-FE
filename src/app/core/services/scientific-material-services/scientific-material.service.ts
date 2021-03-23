import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddScientificMaterial } from '../../interfaces/scientific-material/iadd-scientifimaterial';
import { IScientificMaterialFilter } from '../../interfaces/scientific-material/iscientific-matrial-filter';
import { IUpdateScientificMaterial } from '../../interfaces/scientific-material/iupdate-scientific-material';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ScientificMaterialService {


  addScientificMatrialURL = environment.baseUrl + 'ScientificMatrial/add-scientific-matrial/';
  updateScientificMatrialURL = environment.baseUrl + 'ScientificMatrial/update-scientific-matrial/';
  getScientificMatrialDetailsURL = environment.baseUrl + 'ScientificMatrial/get-scientific-matrial-by-id/';
  getScientificMatrialFilterURL = environment.baseUrl + 'ScientificMatrial/get-scientific-matrial-filter/';
  deleteScientificMatrialURL = environment.baseUrl + 'ScientificMatrial/delete-scientific-matrial/';
  getProgramsLookupUrl = environment.baseUrl + 'Programs/get-programs-lookup/';
  getScientificMatrialCategoriesURL = environment.baseUrl + 'ScientificMatrial/get-scientific-matrial-categories';

  constructor(private http: HttpClient) { }

  addScientificMaterial(model: IAddScientificMaterial): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addScientificMatrialURL, model);
  }
  getScientificMaterial(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getScientificMatrialDetailsURL + id)
  }
  UpdateScientificMaterial(model: IUpdateScientificMaterial): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.updateScientificMatrialURL, model);
  }

  DeleteScientificMatrial(id: any): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.deleteScientificMatrialURL + id);
  }
  getScientificMateriaFilter(filterRequest: IScientificMaterialFilter): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getScientificMatrialFilterURL, filterRequest)
  }
  getProgramsLookup(programName?:string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(programName ?this.getProgramsLookupUrl +programName:this.getProgramsLookupUrl 
      )
  }
  GetScientificMatrialCategoriesLookup():Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.getScientificMatrialCategoriesURL);

  }
}
