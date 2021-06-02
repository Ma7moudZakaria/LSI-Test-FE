import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProgramNotificationTypes } from '../../interfaces/lookup/iprogram-notification-types';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  getAllLookupsUrl = environment.baseUrl + 'Lookups/get-all-lookups';
  getLookupByKeyUrl = environment.baseUrl + 'Lookups/get-lookups-by-keys/';
  getCitiesByCountryIdUrl = environment.baseUrl + 'Lookups/get-cities-by-country-id/';
  getProgramNotificationTypesToProgramUrl = environment.baseUrl + 'Lookups/get-program-notification-types-to-program'

  constructor(private http: HttpClient) { }

  getLookupByKey(key: string[]): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getLookupByKeyUrl, key);
  }

  getAllLookups(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getAllLookupsUrl);
  }

  getCitiesByCountryId(key: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getCitiesByCountryIdUrl + key);
  }

  getProgramNotificationTypesToProgram(model: IProgramNotificationTypes): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.getProgramNotificationTypesToProgramUrl, model);
  }
}
