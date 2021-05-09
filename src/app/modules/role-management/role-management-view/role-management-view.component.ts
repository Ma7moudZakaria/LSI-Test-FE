import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AssignUserModel,
  Role,
  RoleManagementFilter,
  RolesTreeModel,
  RoleUsrs,
} from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';

@Component({
  selector: 'app-role-management-view',
  templateUrl: './role-management-view.component.html',
  styleUrls: ['./role-management-view.component.scss'],
})
export class RoleManagementViewComponent implements OnInit {
  showTap: string = 'USERS';

  listRoleUesrs: RoleUsrs[] = [];
  listRolesPermissions!: RolesTreeModel;
  UsersNotBelongToRole: [] = [];

  showAddGroupForm: boolean = false;
  selectedRoleId: string = '';
  selectedRoles: any;
  assignUser: AssignUserModel = {
    roleId: '',
    usrs: [],
  };

  constructor(
    public RoleManagement: RoleManagementService,
    public translate: TranslateService,
    private _alertify: AlertifyService
  ) {}

  roleList: Role[] = [];
  RoleManagementFilter: RoleManagementFilter = {};

  ngOnInit(): void {
    this.getRolesList();
    this.getPermissionsTreeView();
  }

  getRolesList() {
    this.RoleManagement.getRolesList(this.RoleManagementFilter).subscribe(
      (res) => {
        this.roleList = res.data;
        this.getRoleDetails(this.roleList[0].id);
      }
    );
  }

  deleteRole(roleId: string) {
    console.log(roleId);
    this.RoleManagement.DeleteRole(roleId).subscribe((res) => {
      // console.log(res);
      this._alertify.success(res.message || '');
      this.getRolesList();
    });
  }

  showAddGroup(event: boolean) {
    this.showAddGroupForm = event;
    if (event == false) {
      this.getRolesList();
    }
  }

  filterRole(event: string) {
    this.RoleManagementFilter.roleTextFilter = event;
    this.getRolesList();
  }

  getRoleDetails(roleId: string) {
    this.selectedRoleId = roleId;
    this.RoleManagement.getRoleDetails(roleId).subscribe((res) => {
      this.listRoleUesrs = res.data.roleUsrs;
      this.selectedRoles = res.data.rolePerms;
    });
    this.getUserNotBelongToRole(this.selectedRoleId);
  }

  getPermissionsTreeView() {
    this.RoleManagement.getPermissionsTreeView().subscribe((res) => {
      this.listRolesPermissions = res.data;
    });
  }

  getUserNotBelongToRole(RoleId: string) {
    this.RoleManagement.getUsersNotBelongToRole(RoleId).subscribe((res) => {
      this.UsersNotBelongToRole = res.data;
    });
  }

  addUserToRole(event: any) {
    event.usrNameAr = event.arUsrName;
    event.usrNameEn = event.enUsrName;
    this.listRoleUesrs.push(event);
  }

  deleteUser(userId: string) {
    let idx = 0;
    this.listRoleUesrs.forEach((element, index) => {
      if (element.usrId == userId) {
        idx = index;
      }
    });
    this.listRoleUesrs.splice(idx, 1);
  }

  saveUsersRole() {
    // map to git new Object
    this.assignUser.roleId = this.selectedRoleId;
    this.assignUser.usrs=[];
    this.listRoleUesrs.forEach((element, index) => {
      this.assignUser.usrs.push({usrId:element.usrId})
    });
    
    this.RoleManagement.assignUserRole(this.assignUser).subscribe((res) => {
      this._alertify.success(res.message || '');
    });
  }
}
