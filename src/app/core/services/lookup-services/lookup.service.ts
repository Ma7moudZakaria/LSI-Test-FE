import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  getAllLookupsUrl = environment.baseUrl + 'Lookups/get-all-lookups';
  getLookupByKeyUrl = environment.baseUrl + 'Lookups/get-lookups-by-keys/';

  constructor(private http:HttpClient) { }

  getLookupByKey(key: string[]):Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getLookupByKeyUrl , key);
  }

  getAllLookups():Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.getAllLookupsUrl);
  }
}
