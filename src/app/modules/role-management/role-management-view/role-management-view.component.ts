import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AssignUserModel, Role, RoleManagementFilter, RoleUsrs } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';

@Component({
  selector: 'app-role-management-view',
  templateUrl: './role-management-view.component.html',
  styleUrls: ['./role-management-view.component.scss']
})
export class RoleManagementViewComponent implements OnInit {
  showtap:string='ROLES';
  listRoleUesrs:RoleUsrs[]=[]
  listRolesPermissions:[]=[];
  UsersNotBelongToRole:[]=[]
  showAddGroupform:boolean=false
  selectedRoleId:string="";
  selectedRoles:any
  assignUser:AssignUserModel={
    roleId:'',
    usrs:[]
  }

  constructor(
    public RoleManagement:RoleManagementService,
    public translate: TranslateService) { }

  roleList:Role[]=[]
  RoleManagementFilter:RoleManagementFilter={}

  ngOnInit(): void {
    this.getRolesList();
    this.getPermissionsTreeView()
  }

  getRolesList(){
    this.RoleManagement.getRolesList(this.RoleManagementFilter).subscribe(res=>{
      this.roleList=res.data
    })
  }

  deleteRole(roleId:string){
    console.log(roleId);
    this.RoleManagement.DeleteRole(roleId).subscribe(res=>{
      console.log(res);
      this.getRolesList()
    })
  }
  showAddGroup(event:boolean){
    this.showAddGroupform=event
    if (event==false) {
      this.getRolesList()
    }
  }
  filterRole(event:string){
    this.RoleManagementFilter.roleTextFilter=event;
    this.getRolesList();
  }

  getRoleDetails(roleId:string){
    this.selectedRoleId=roleId
    this.RoleManagement.getRoleDetails(roleId).subscribe(res=>{
      this.listRoleUesrs=res.data.roleUsrs;
      this.selectedRoles=res.data.rolePerms
    })
    this.getUserNotBelongToRole(this.selectedRoleId)
  }
  getPermissionsTreeView(){
    this.RoleManagement.getPermissionsTreeView().subscribe(res=>{
      this.listRolesPermissions=res.data
    })
  }

  getUserNotBelongToRole(RoleId:string){
    this.RoleManagement.getUsersNotBelongToRole(RoleId).subscribe(res=>{
      this.UsersNotBelongToRole=res.data
    })
  }

  addUserToRole(event:any){
    this.assignUser.roleId=this.selectedRoleId;
    debugger
  this.assignUser.usrs.push({usrId:event.usrId});
    this.RoleManagement.assignUserRole(this.assignUser).subscribe(res=>{
      console.log(res);
      
    })

  }


  SaveChange(){
    console.log(this.listRolesPermissions);
    
  }
}
