import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleManagementViewComponent } from './role-management-view/role-management-view.component';
import { RoleManagementRoutingModule } from './role-management-routing.module';
import { GroupListComponent } from './role-management-view/group-list/group-list.component';
import { GroupUsersComponent } from './role-management-view/group-users/group-users.component';
import { GroupRolesComponent } from './role-management-view/group-roles/group-roles.component';
import { GroupUsersCardComponent } from './role-management-view/group-users-card/group-users-card.component';
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { AddGroupComponent } from './role-management-view/add-group/add-group.component';
import { RoleComponent } from './role-management-view/role/role.component';
import { InputSreachListComponent } from './role-management-view/input-sreach-list/input-sreach-list.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  declarations: [RoleManagementViewComponent, GroupListComponent, GroupUsersComponent, GroupRolesComponent, GroupUsersCardComponent, AddGroupComponent, RoleComponent, InputSreachListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTreeModule,
    MatIconModule,
    MatAutocompleteModule,
    SharedModule,
    RoleManagementRoutingModule
  ]
})
export class RoleManagementModule { }
