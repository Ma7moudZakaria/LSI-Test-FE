import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { AssignRoleModel } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';

@Component({
  selector: 'app-group-roles',
  templateUrl: './group-roles.component.html',
  styleUrls: ['./group-roles.component.scss'],
})


export class GroupRolesComponent implements OnInit,OnChanges  {
  @Input() listRoles?: any;
  @Input() selectedRoles?: any;
  @Input() selectedRoleId?: any;
  assignRole:AssignRoleModel={
    perms:[],
    roleId:''
  }
  list:any=[]
  constructor(public RoleManagement:RoleManagementService, ){

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
   
    
  }
  getcheckedperms(arr:any){
   
    for(var i = 0; i < arr.length; i++){
      if (arr[i].checked==true) {
        this.list.push({'permId':arr[i].id})
      }
      if(arr[i].children instanceof Array){
        this.getcheckedperms(arr[i].children);
      }else{
          console.log(arr[i].children);
      }
  }
}
  saveData(){
     this.list=[]
    this.getcheckedperms(this.listRoles.children);
    this.assignRole.perms=this.list;
    debugger;
    console.log("this.assignRole.perms",this.assignRole.perms);
    
    this.assignRole.roleId=this.selectedRoleId;
    console.log ("this.assignRole",this.selectedRoleId)
   
    this.RoleManagement.assignRolePermissions(this.assignRole).subscribe(res=>{
      console.log(res);
    })
  }

  cancel(){

  }
}