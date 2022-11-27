import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../../ng-model/base-response-model';
@Injectable({
  providedIn: 'root'
})
export class ReportService {


  reportUrl = environment.baseUrl + 'Reports/GetReports';

  constructor(private http: HttpClient) { }

  getReports() :Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.reportUrl)
  }
}
