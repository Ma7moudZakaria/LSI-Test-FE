import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponseModel} from '../../ng-model/base-response-model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramCategoriesService {

  getProgramCatiegoriesUrl = environment.baseUrl + 'ProgramCategories/get-program-category/';
  constructor(private http: HttpClient) { }
  getProgramCatiegories(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getProgramCatiegoriesUrl);
  }
}

