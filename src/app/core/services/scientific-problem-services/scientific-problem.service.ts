import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateScientificProblem } from '../../interfaces/scientific-problrm/icreate-scientific-problem';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { Observable } from 'rxjs';
import { IScientificProblemFilter } from '../../interfaces/scientific-problrm/iscientific-problem-filter';
import { IUserScientificProblemFilter } from '../../interfaces/scientific-problrm/iuser-scientific-problem-filter';
import { IAddScProbReply } from '../../interfaces/scientific-problrm/iadd-sc-prob-reply';

@Injectable({
  providedIn: 'root'
})
export class ScientificProblemService {


  addScientificProblemReplyURL = environment.baseUrl + 'ScientificProblem/add-scientific-reply/';
  createScientificProblemURL = environment.baseUrl + 'ScientificProblem/create-scientific-problem';
  getScientificProblemDetailsURL = environment.baseUrl + 'ScientificProblem/get-scientific-problems-by-user-id/';
  getScientificProblemFilterURL = environment.baseUrl + 'ScientificProblem/get-scientific-problem-filter/';
  deleteScientificProblemUrl = environment.baseUrl + 'ScientificProblem/delete-scientific-problem/';
  deleteListOfScientificProblemsUrl = environment.baseUrl + 'ScientificProblem/delete-list-of-scientific-problems/'

  constructor(private http: HttpClient) { }

  addScientificProblemReply(model: IAddScProbReply): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addScientificProblemReplyURL, model);
  }

  createScientificProblem(model: ICreateScientificProblem): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.createScientificProblemURL, model);
  }

  getScientificProblem(model: IUserScientificProblemFilter): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getScientificProblemDetailsURL , model)
  }
  getScientificMateriaFilter(filterRequest: IScientificProblemFilter): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getScientificProblemFilterURL, filterRequest)
  }
  DeleteScientificProblem(id: any): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.deleteScientificProblemUrl + id);
  }

  deleteListOfScientificProblems(ids:(string | undefined)[] | undefined):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.deleteListOfScientificProblemsUrl, ids);
  }

}
