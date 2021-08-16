import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateProgBatch } from '../../interfaces/program-batches-interfaces/icreate-prog-batch';
import { IUpdateProgBatch } from '../../interfaces/program-batches-interfaces/iupdate-prog-batch';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramBatchesService {

  addProgBatchUrl = environment.baseUrl + 'ProgramBatches/add-program-batch/';
  updateProgBatchUrl = environment.baseUrl + 'ProgramBatches/update-program-batch/';
  deleteProgBatchUrl = environment.baseUrl + 'ProgramBatches/delete-program-batch/';
  getProgBatchesByProgIdUrl = environment.baseUrl + 'ProgramBatches/get-program-batches-by-prog-id/';

  constructor(private http: HttpClient) { }

  addProgBatch(model: ICreateProgBatch): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.addProgBatchUrl, model);
  }

  updateProgBatch(model: IUpdateProgBatch): Observable<BaseResponseModel> {
    return this.http.put<BaseResponseModel>(this.updateProgBatchUrl, model);
  }

  deleteProgBatch(id: string): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.deleteProgBatchUrl + id);
  }

  getProgBatchesByProgId(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getProgBatchesByProgIdUrl + id);
  }
}
