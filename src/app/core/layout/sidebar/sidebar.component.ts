import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../services/user-role-service/user-role.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public roleService:UserRoleService) { }

  ngOnInit(): void {
  }

}
