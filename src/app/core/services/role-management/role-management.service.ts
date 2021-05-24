import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateScientificProblem } from '../../interfaces/scientific-problrm/icreate-scientific-problem';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { Observable } from 'rxjs';
import { AssignRoleModel, AssignUserModel, CreateRoleModel, RoleManagementFilter } from '../../interfaces/role-management-interfaces/role-management';
import { IUser } from '../../interfaces/auth-interfaces/iuser-model';
import { RoleEnum } from '../../enums/role-enum.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

  localUser:IUser;
  roles = RoleEnum;

  viewRolesURL = environment.baseUrl + 'Roles/view-roles';
  deleteRoleURL = environment.baseUrl + 'Roles/delete-role/';
  roleDetailsURL = environment.baseUrl + 'Roles/get-role-details-by-id/';
  createRoleURL = environment.baseUrl + 'Roles/add-role';
  editRoleURL = environment.baseUrl + 'Roles/edit-role';
  permissionsTreeViewURL = environment.baseUrl + 'Roles/get-permissions-tree-view';
  assignRolePermissionsURL = environment.baseUrl + 'Roles/assign-role-permissions';
  usersNotBelongToRoleURL = environment.baseUrl + 'Roles/get-users-not-belong-to-role/';
  assignUserRoleURL = environment.baseUrl + 'Roles/assign-role-users';
  getUsersExceptStudentsURL = environment.baseUrl + 'Roles/get-users-except-students';


  constructor(private http: HttpClient) { 
    this.localUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
  }

  getRolesList(model: RoleManagementFilter): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.viewRolesURL, model);
  }

  DeleteRole(id: any): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.deleteRoleURL + id);
  }

  getRoleDetails(id: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.roleDetailsURL + id)
  }

  getPermissionsTreeView(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.permissionsTreeViewURL)
  }

  createRole(model: CreateRoleModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.createRoleURL, model);
  }
  editRole(model: CreateRoleModel): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.editRoleURL, model);
  }

  assignRolePermissions(model: AssignRoleModel) {
    return this.http.post<BaseResponseModel>(this.assignRolePermissionsURL, model);
  }

  getUsersNotBelongToRole(id: string) {
    return this.http.get<BaseResponseModel>(this.usersNotBelongToRoleURL + id)
  }
  
  getUsersExceptStudents() {
    return this.http.get<BaseResponseModel>(this.getUsersExceptStudentsURL)
  }

  assignUserRole(model: AssignUserModel) {
    return this.http.post<BaseResponseModel>(this.assignUserRoleURL, model);
  }

   isStudent(){
     
    //fixing issue when logout then back
    this.localUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    
    return this.localUser?.usrRoles?.usrRoles?.some(x => x.roleNo == this.roles.Student.toString());
  }
  isAdmin(){
    //fixing issue when logout then back
    this.localUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    
    return this.localUser?.usrRoles?.usrRoles?.some(x => x.roleNo == this.roles.Admin.toString() 
                                                    || x.roleNo == this.roles.SuperAdmin.toString()
                                                    || x.roleNo == this.roles.Supervisor.toString()
                                                    || x.roleNo == this.roles.TechnicalSupport.toString());
  }
  
  isTeacher(){
    //fixing issue when logout then back
    this.localUser = JSON.parse(localStorage.getItem("user") as string) as IUser;

    return this.localUser?.usrRoles?.usrRoles?.some(x => x.roleNo == this.roles.Teacher.toString());
  }

}
