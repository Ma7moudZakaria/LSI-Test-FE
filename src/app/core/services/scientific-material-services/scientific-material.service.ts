import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddScientificMaterialResult } from '../../interfaces/scientific-material/add-scientific-material-result';
import { AddScientificMaterial } from '../../interfaces/scientific-material/add-scientifimaterial';
import { ScientificMaterialDetails } from '../../interfaces/scientific-material/scientific-material-details';
import { ScientificMaterialFilter } from '../../interfaces/scientific-material/scientific-matrial-filter';
import { ScientificMaterialGrid } from '../../interfaces/scientific-material/scientific-matrial-grid';
import { UpdateScientificMaterial } from '../../interfaces/scientific-material/update-scientific-material';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ScientificMaterialService {


  AddScientificMatrialURL = environment.BaseURL + 'ScientificMatrial/add-scientific-matrial/';
  UpdateScientificMatrialURL = environment.BaseURL + 'ScientificMatrial/update-scientific-matrial/';
  GetScientificMatrialDetailsURL = environment.BaseURL + 'ScientificMatrial/get-scientific-matrial-by-id/';
  GetScientificMatrialFilterURL = environment.BaseURL + 'ScientificMatrial/get-scientific-matrial-filter/';
  DeleteScientificMatrialURL = environment.BaseURL + 'ScientificMatrial/delete-scientific-matrial/';
  GetProgramsLookupUrl = environment.BaseURL + 'Programs/get-programs-lookup';
  GetScientificMatrialCategoriesURL = environment.BaseURL + 'ScientificMatrial/get-scientific-matrial-categories';
  constructor(private http: HttpClient) { }

  addScientificMaterial(model: AddScientificMaterial): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.AddScientificMatrialURL, model);
  }
  getScientificMaterial(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.GetScientificMatrialDetailsURL + id)
  }
  UpdateScientificMaterial(model: UpdateScientificMaterial): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.UpdateScientificMatrialURL, model);
  }

  DeleteScientificMatrial(id: any): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.DeleteScientificMatrialURL + id);
  }
  getScientificMateriaFilter(filterRequest: ScientificMaterialFilter): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.GetScientificMatrialFilterURL, filterRequest)
  }
  getProgramsLookup(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.GetProgramsLookupUrl)
  }
  GetScientificMatrialCategoriesLookup():Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetScientificMatrialCategoriesURL);

  }
}
