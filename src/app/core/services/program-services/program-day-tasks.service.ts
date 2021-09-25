import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateProgramDayTasksModel } from '../../interfaces/programs-interfaces/icreate-program-day-tasks-model';
import { IProgramDayTasksUpdateOrderByModel } from '../../interfaces/programs-interfaces/iprogram-day-tasks-update-order-by-model';
import { ISaveProgramDayTaskDetailsModel } from '../../interfaces/programs-interfaces/isave-program-day-task-Details-model';
import { IProgramLastFiveWorkToLinkAuto } from '../../interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-last-five-work-to-link-auto';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramDayTasksService {

  CreateProgramDayTasksURL=environment.baseUrl+'Programs/add-program-day-tasks/';
  SaveProgramDayTaskDetailsURL=environment.baseUrl+'Programs/save-program-day-tasks-details/';
  CopyProgramDayTasksURL=environment.baseUrl+'Programs/copy-program-day-task/';
  DeleteProgramDayTasksURL=environment.baseUrl+'Programs/delete-program-day-task/';
  GetProgramDayTasksURL=environment.baseUrl+'Programs/get-day-tasks-by-program-day/';
  UpdateOrderByProgramDayTasksURL=environment.baseUrl+'Programs/update-order-program-day-tasks/';
  getProgramLastFiveHomeWorkToLinkAutoURL=environment.baseUrl+'Programs/get-program-last-five-work-to-link-auto/';
  getProgramMemorizeAtDayURL=environment.baseUrl+'Programs/get-program-momrize-at-day/';
  
  constructor(private http:HttpClient) { }

  AddProgramDayTasks(model:Array<ICreateProgramDayTasksModel>):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.CreateProgramDayTasksURL,model);
  }

  SaveProgramDayTaskDetails(model:ISaveProgramDayTaskDetailsModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.SaveProgramDayTaskDetailsURL,model);
  }

  CopyProgramDayTasks(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.CopyProgramDayTasksURL+id);
  }

  DeleteProgramDayTasks(id:string):Observable<BaseResponseModel>{
    return this.http.delete<BaseResponseModel>(this.DeleteProgramDayTasksURL+id);
  }

  getProgramDayTasks(id:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.GetProgramDayTasksURL+id);
  }

  UpdateOrderByProgramDayTasks(model:IProgramDayTasksUpdateOrderByModel):Observable<BaseResponseModel>{
    return this.http.put<BaseResponseModel>(this.UpdateOrderByProgramDayTasksURL , model);
  }

  GetProgramLastFiveHomeWorkToLinkAuto(model:IProgramLastFiveWorkToLinkAuto):Observable<BaseResponseModel>{
    return this.http.post<BaseResponseModel>(this.getProgramLastFiveHomeWorkToLinkAutoURL , model);
  }

  getProgramMemorizeAtDay(dayId:string):Observable<BaseResponseModel>{
    return this.http.get<BaseResponseModel>(this.getProgramMemorizeAtDayURL+dayId);
  }

}
