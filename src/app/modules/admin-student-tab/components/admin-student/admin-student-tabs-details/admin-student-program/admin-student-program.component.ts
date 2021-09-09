import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AdminStudentProgramDailyTaskComponent } from './admin-student-program-daily-task/admin-student-program-daily-task.component';
import { AdminStudentProgramListComponent } from './admin-student-program-list/admin-student-program-list.component';
import { AdminStudentProgramTaskComponent } from './admin-student-program-task/admin-student-program-task.component';

@Component({
  selector: 'app-admin-student-program',
  templateUrl: './admin-student-program.component.html',
  styleUrls: ['./admin-student-program.component.scss']
})
export class AdminStudentProgramComponent implements OnInit {
  showAddProgram: boolean = false;
  @Input() studentIdOutput: ITeacherStudentViewModel | undefined;
  @Input() studentDayIdOutput: ITeacherStudentViewModel | undefined;

  @ViewChild(AdminStudentProgramListComponent) adminStudentProgramListChild: AdminStudentProgramListComponent | undefined;
  @ViewChild(AdminStudentProgramDailyTaskComponent) adminStudentProgramDailyTaskChild: AdminStudentProgramDailyTaskComponent | undefined;
  @ViewChild(AdminStudentProgramTaskComponent) AdminStudentProgramTaskChild: AdminStudentProgramTaskComponent | undefined;


  constructor() { }

  ngOnInit(): void {
  }


  showAddProgramOverlay($event: boolean) {
    this.showAddProgram = $event;
  }
  closeExamOverlay() {
    this.showAddProgram = false;
  }
  getUserId($event: ITeacherStudentViewModel) {
    this.studentIdOutput = $event;
    if (this.adminStudentProgramDailyTaskChild) {
      // set id in click 
      this.adminStudentProgramDailyTaskChild.studentIdOutput = this.studentIdOutput
      this.adminStudentProgramDailyTaskChild.getAllStudentProgramDays();
    }
  }
    getUserBatchTasks($event: ITeacherStudentViewModel) {
      this.studentDayIdOutput = $event;
      if (this.AdminStudentProgramTaskChild) {
        // set id in click 
        this.AdminStudentProgramTaskChild.studentDayIdOutput = this.studentDayIdOutput;
        this.AdminStudentProgramTaskChild.getAllStudentProgramDayTasks();
      }
    }

}

