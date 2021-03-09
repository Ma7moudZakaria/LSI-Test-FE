import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ContentManagementService {

  getAllContentManagementSystemURL = environment.baseUrl + 'ContentManagementSystem/get-all-content-management-system/';
  createContentManagementSystemURL = environment.baseUrl + 'ContentManagementSystem/create-content-management-system/';
  updateContentManagementSystemURL = environment.baseUrl + 'ContentManagementSystem/update-content-management-system/';
  getContentManagementSystemByTypeURL = environment.baseUrl + 'ContentManagementSystem/get-content-management-system-by-type/';
  getContentManagementSystemByIdURL = environment.baseUrl + 'ContentManagementSystem/get-content-management-system-by-id/';
  deleteContentManagementSystemURL = environment.baseUrl + 'ContentManagementSystem/delete-content-management-system/';
  

  constructor(private http: HttpClient) { }

  getAllContentManagementSystem() 
  {
    return this.http.get<BaseResponseModel>(this.getAllContentManagementSystemURL);
  }

  createContentManagementSystem(model : any):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.createContentManagementSystemURL , model);
  }

  updateContentManagementSystem(model : any):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.updateContentManagementSystemURL , model);
  }

  getContentManagementSystemByType(model : any) 
  {
    return this.http.post<BaseResponseModel>(this.getContentManagementSystemByTypeURL , model)
  }

  getContentManagementSystemById(id : string) 
  {
    return this.http.get<BaseResponseModel>(this.getContentManagementSystemByIdURL + id)
  }

  deleteContentManagementSystem(id : string) 
  {
    return this.http.delete<BaseResponseModel>(this.deleteContentManagementSystemURL + id)
  }
}
