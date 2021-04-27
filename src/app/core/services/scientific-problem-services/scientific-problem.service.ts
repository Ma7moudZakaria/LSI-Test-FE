import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateScientificProblem } from '../../interfaces/scientific-problrm/icreate-scientific-problem';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { Observable } from 'rxjs';
import { IScientificProblemFilter } from '../../interfaces/scientific-problrm/iscientific-problem-filter';

@Injectable({
  providedIn: 'root'
})
export class ScientificProblemService {


  addScientificProblemReplayURL = environment.baseUrl + 'ScientificProblem/add-scientific-reply/';
  createScientificProblemURL = environment.baseUrl + 'ScientificProblem​/create-scientific-problem/';
  getScientificProblemDetailsURL = environment.baseUrl + 'ScientificProblem/get-scientific-problems-by-user-id/';
  getScientificProblemFilterURL = environment.baseUrl + 'ScientificProblem/get-scientific-problem-filter/';
  deleteScientificFilterURL = environment.baseUrl + '/api/ScientificProblem/delete-scientific-problem/';




  constructor(private http: HttpClient) { }

  addScientificProblemReplay(model: ICreateScientificProblem): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addScientificProblemReplayURL, model);
  }

  createScientificProblem(model: ICreateScientificProblem): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.createScientificProblemURL, model);
  }

  getScientificProblem(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getScientificProblemDetailsURL + id)
  }
  getScientificMateriaFilter(filterRequest: IScientificProblemFilter): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getScientificProblemFilterURL, filterRequest)
  }
  DeleteScientificMatrial(id: any): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.deleteScientificFilterURL + id);
  }

}
