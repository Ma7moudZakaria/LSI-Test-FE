import { Component, OnInit } from '@angular/core';
import { RoleManagementService } from '../../services/role-management/role-management.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public roleService:RoleManagementService) { }

  ngOnInit(): void {
  }

}
