import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ContentManagementService {

  GetAllContentManagementSystemURL = environment.BaseURL + 'ContentManagementSystem/get-all-content-management-system/';
  CreateContentManagementSystemURL = environment.BaseURL + 'ContentManagementSystem/create-content-management-system/';
  UpdateContentManagementSystemURL = environment.BaseURL + 'ContentManagementSystem/update-content-management-system/';
  GetContentManagementSystemByTypeURL = environment.BaseURL + 'ContentManagementSystem/get-content-management-system-by-type/';
  GetContentManagementSystemByIdURL = environment.BaseURL + 'ContentManagementSystem/get-content-management-system-by-id/';
  DeleteContentManagementSystemURL = environment.BaseURL + 'ContentManagementSystem/delete-content-management-system/';
  

  constructor(private http: HttpClient) { }

  getAllContentManagementSystem() 
  {
    return this.http.get<BaseResponseModel>(this.GetAllContentManagementSystemURL);
  }

  createContentManagementSystem(model : any):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.CreateContentManagementSystemURL , model);
  }

  updateContentManagementSystem(model : any):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.UpdateContentManagementSystemURL , model);
  }

  getContentManagementSystemByType(model : any) 
  {
    return this.http.post<BaseResponseModel>(this.GetContentManagementSystemByTypeURL , model)
  }

  getContentManagementSystemById(id : string) 
  {
    return this.http.get<BaseResponseModel>(this.GetContentManagementSystemByIdURL + id)
  }

  deleteContentManagementSystem(id : string) 
  {
    return this.http.delete<BaseResponseModel>(this.DeleteContentManagementSystemURL + id)
  }
}
