import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProfileUser } from '../../interfaces/user-interfaces/iprofileuser';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  getAllLookupsUrl = environment.BaseURL + 'Lookups/get-all-lookups';
  getLookupByKeyUrl = environment.BaseURL + 'Lookups/get-lookups-by-keys/';

  constructor(private http:HttpClient) { }

  getLookupByKey(key: any) {
    return this.http.post<BaseResponseModel>(this.getLookupByKeyUrl , key);
  }

  getAllLookups(){
    return this.http.get<BaseResponseModel>(this.getAllLookupsUrl);
  }
}
