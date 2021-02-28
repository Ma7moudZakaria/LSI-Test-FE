import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class WalkThroughService {

  GetAllWalkThroughURL = environment.BaseURL + 'WalkThrough/get-all-walk-through/';
  CreateWalkThroughURL = environment.BaseURL + 'WalkThrough/create-walk-through/';
  UpdateWalkThroughURL = environment.BaseURL + 'WalkThrough/update-walk-through/';
  GetWalkThroughByIdURL = environment.BaseURL + 'WalkThrough/get-walk-through-by-id/';
  DeleteWalkThroughURL = environment.BaseURL + 'WalkThrough/delete-walk-through/';
  

  constructor(private http: HttpClient) { }

  getAllWalkThrough() 
  {
    return this.http.get<BaseResponseModel>(this.GetAllWalkThroughURL);
  }

  createWalkThrough(model : any):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.CreateWalkThroughURL , model);
  }

  updateWalkThrough(model : any):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.UpdateWalkThroughURL , model);
  }

  getWalkThroughById(id : string) 
  {
    return this.http.get<BaseResponseModel>(this.GetWalkThroughByIdURL + id)
  }

  deleteWalkThrough(id : string) 
  {
    return this.http.delete<BaseResponseModel>(this.DeleteWalkThroughURL + id)
  }
}
