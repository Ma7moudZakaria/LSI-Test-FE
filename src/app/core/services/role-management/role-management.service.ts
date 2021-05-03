import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateScientificProblem } from '../../interfaces/scientific-problrm/icreate-scientific-problem';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { Observable } from 'rxjs';
import { IScientificProblemFilter } from '../../interfaces/scientific-problrm/iscientific-problem-filter';
import { AssignRoleModel, CreateRoleModel, RoleManagementFilter } from '../../interfaces/role-management-interfaces/role-management';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {


    viewRolesURL = environment.baseUrl + 'Roles/view-roles';
    deleteRoleURL = environment.baseUrl + 'Roles/delete-role/';
    roleDetailsURL = environment.baseUrl + 'Roles/get-role-details-by-id/';
    createRoleURL = environment.baseUrl + 'Roles/add-role';
    PermissionsTreeViewURL=environment.baseUrl + 'Roles/get-permissions-tree-view';
    assignRolePermissionsURL=environment.baseUrl + 'Roles/assign-role-permissions';
  createScientificProblemURL = environment.baseUrl + 'ScientificProblem/create-scientific-problem';
  getScientificProblemDetailsURL = environment.baseUrl + 'ScientificProblem/get-scientific-problems-by-user-id/';
  getScientificProblemFilterURL = environment.baseUrl + 'ScientificProblem/get-scientific-problem-filter/';




  constructor(private http: HttpClient) { }

  getRolesList(model: RoleManagementFilter): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.viewRolesURL,model);
  }

  DeleteRole(id: any): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.deleteRoleURL + id);
  }

  getRoleDetails(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.roleDetailsURL + id)
  }

  getPermissionsTreeView(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.PermissionsTreeViewURL)
  }

  createRole(model: CreateRoleModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.createRoleURL, model);
  }

  assignRolePermissions(model:AssignRoleModel){
    return this.http.post<BaseResponseModel>(this.assignRolePermissionsURL, model);
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


}
