import { Component, OnInit, ViewChild } from '@angular/core';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AdminStudentTabsDetailsComponent } from './admin-student-tabs-details/admin-student-tabs-details.component';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.scss']
})
export class AdminStudentComponent implements OnInit {
  @ViewChild(AdminStudentTabsDetailsComponent) adminStuTabDetailsChild: AdminStudentTabsDetailsComponent | undefined;
  studentIdOutput: ITeacherStudentViewModel | undefined;
  constructor() { }

  ngOnInit(): void {
  }
  getUserId($event: ITeacherStudentViewModel) {
    this.studentIdOutput = $event;
    console.log("studentIdOutput", this.studentIdOutput.usrId)
    if (this.adminStuTabDetailsChild) {
      // set id in click 
      this.adminStuTabDetailsChild.studentIdOutput = this.studentIdOutput
      this.adminStuTabDetailsChild.viewSwitching();
    }
  }
}
