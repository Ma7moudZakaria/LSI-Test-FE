import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleEnum } from '../../enums/role-enum.enum';
import { IUser } from '../../interfaces/auth-interfaces/iuser-model';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  localUser:IUser;
  roles = RoleEnum;
  constructor(private http:HttpClient) {
    this.localUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
   }

   isStudent(){
    let res = this.localUser?.usrRoles?.usrRoles?.some(x => x.roleNo == this.roles.Student.toString()); 
    if (res) {return true}

    return false;
  }
  isAdmin(){
    let res = this.localUser?.usrRoles?.usrRoles?.some(x => x.roleNo == this.roles.Admin.toString() 
                                                    || x.roleNo == this.roles.SuperAdmin.toString()
                                                    || x.roleNo == this.roles.Supervisor.toString()
                                                    || x.roleNo == this.roles.TechnicalSupport.toString()); 
    if (res) {return true}
    return false;
  }
  
  isTeacher(){
    let res = this.localUser?.usrRoles?.usrRoles?.some(x => x.roleNo == this.roles.Teacher.toString()); 
    if (res) {return true}
    return false;
  }
  
}
