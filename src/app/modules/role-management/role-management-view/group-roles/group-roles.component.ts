import { Component, Input, OnInit } from '@angular/core';
import {
  AssignRoleModel,
  RolesTreeModel,
} from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';

@Component({
  selector: 'app-group-roles',
  templateUrl: './group-roles.component.html',
  styleUrls: ['./group-roles.component.scss'],
})
export class GroupRolesComponent implements OnInit {

  @Input() listRoles!: RolesTreeModel;
  @Input() selectedRoles: string = '';
  @Input() selectedRoleId: string = '';

  assignRole: AssignRoleModel = {
    perms: [],
    roleId: '',
  };

  list: any = [];

  constructor(
    public RoleManagement: RoleManagementService,
    private _alertify: AlertifyService
  ) { }

  ngOnInit(): void { }

  getCheckedPerms(arr: any) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].checked == true) {
        this.list.push({ permId: arr[i].id });
      }
      if (arr[i].children instanceof Array) {
        this.getCheckedPerms(arr[i].children);
      } else {
        console.log(arr[i].children);
      }
    }
  }

  saveData() {
    this.list = [];
    this.getCheckedPerms(this.listRoles.children);
    this.assignRole.perms = this.list;
    this.assignRole.roleId = this.selectedRoleId;

    this.RoleManagement.assignRolePermissions(this.assignRole).subscribe(
      (res) => {
        // console.log(res);
        this._alertify.success(res.message || '');
      }
    );
  }

  cancel() { }
}
