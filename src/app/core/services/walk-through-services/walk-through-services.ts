import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class WalkThroughService {

  getAllWalkThroughURL = environment.baseUrl + 'WalkThrough/get-all-walk-through/';
  createWalkThroughURL = environment.baseUrl + 'WalkThrough/create-walk-through/';
  updateWalkThroughURL = environment.baseUrl + 'WalkThrough/update-walk-through/';
  getWalkThroughByIdURL = environment.baseUrl + 'WalkThrough/get-walk-through-by-id/';
  getWalkThroughByPageIdURL = environment.baseUrl + 'WalkThrough/get-walk-through-by-page-id/';
  deleteWalkThroughURL = environment.baseUrl + 'WalkThrough/delete-walk-through/';
  canDecativate : boolean = false;

  constructor(private http: HttpClient) { }

  getAllWalkThrough() 
  {
    return this.http.get<BaseResponseModel>(this.getAllWalkThroughURL);
  }

  createWalkThrough(model : any):Observable<BaseResponseModel>
  {
    return this.http.post<BaseResponseModel>(this.createWalkThroughURL , model);
  }

  updateWalkThrough(model : any):Observable<BaseResponseModel>
  {
    return this.http.put<BaseResponseModel>(this.updateWalkThroughURL , model);
  }

  getWalkThroughById(id : string) 
  {
    return this.http.get<BaseResponseModel>(this.getWalkThroughByIdURL + id)
  }
  getWalkThroughByPageId(id : string) 
  {
    return this.http.get<BaseResponseModel>(this.getWalkThroughByPageIdURL + id)
  }
  deleteWalkThrough(id : string) 
  {
    return this.http.delete<BaseResponseModel>(this.deleteWalkThroughURL + id)
  }

  setCanDeActivate(value:boolean){
    this.canDecativate = value;
  }
}
