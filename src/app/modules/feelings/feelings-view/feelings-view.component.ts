import { Role } from './../../../core/interfaces/role-management-interfaces/role-management';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feelings-view',
  templateUrl: './feelings-view.component.html',
  styleUrls: ['./feelings-view.component.scss']
})
export class FeelingsViewComponent implements OnInit {
  showTap: string = 'student';
  roleEnum: RoleEnum = RoleEnum.Student;
  constructor() { }

  ngOnInit(): void {
  }

  // getTabType() {
  //   return this.showTap === 'student' ? RoleEnum.Student : RoleEnum.Teacher;
  // }

  studentTab() {
    this.showTap = 'student';
    this.roleEnum = RoleEnum.Student;
  }

  teacherTab() {
    this.showTap = 'teacher';
    this.roleEnum = RoleEnum.Teacher;
  }

}
