import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AdminTeacherProgramDetailsComponent } from './admin-teacher-program-details/admin-teacher-program-details.component';
import { AdminTeacherProgramListComponent } from './admin-teacher-program-list/admin-teacher-program-list.component';

@Component({
  selector: 'app-admin-teacher-program',
  templateUrl: './admin-teacher-program.component.html',
  styleUrls: ['./admin-teacher-program.component.scss']
})
export class AdminTeacherProgramComponent implements OnInit {
  @ViewChild(AdminTeacherProgramDetailsComponent) adminTeacherProgramDetailsComponent: AdminTeacherProgramDetailsComponent | undefined;
  @ViewChild(AdminTeacherProgramListComponent) adminTeacherProgramListComponent: AdminTeacherProgramListComponent | undefined;

  
  @Input()  teacherIdOutput:ITeacherStudentViewModel | undefined;
  showAddProgram: boolean =false;
  
  constructor() { }

  ngOnInit(): void {
  }
  showAddProgramOverlay($event:boolean){
    this.showAddProgram = $event;
  }
  closeExamOverlay() {
    this.adminTeacherProgramListComponent?.getTeacherPrograms();
    this.showAddProgram = false;

  }

  getBatchIdEvent(event?: ITeacherStudentViewModel) {
    if (this.adminTeacherProgramDetailsComponent){
      this.adminTeacherProgramDetailsComponent.teacherInfoDetails = event;
      this.adminTeacherProgramDetailsComponent.getTeacherProgramBatchDetails();
    }
  }
}
