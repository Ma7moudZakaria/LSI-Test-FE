import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { RoleUsrs } from 'src/app/core/interfaces/role-management-interfaces/role-management';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.scss']
})
export class GroupUsersComponent implements OnInit {
  @Input() listUsers?: RoleUsrs[];
  @Input() UsersNotBelongToRole: []=[];
  @Input() selectedRoleId: string=''
  @Output() addUserToRole = new EventEmitter<{}>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.listUsers);
    
  }
  addUserNotBelongToRole(event:any){
    this.addUserToRole.emit(event)
  }
}
