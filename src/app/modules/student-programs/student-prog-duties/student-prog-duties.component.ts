import { Component, OnInit, ViewChild } from '@angular/core';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import {  IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { StudentProgramDutyDaysTaskComponent } from './student-program-duty-days-task/student-program-duty-days-task.component';

@Component({
  selector: 'app-student-prog-duties',
  templateUrl: './student-prog-duties.component.html',
  styleUrls: ['./student-prog-duties.component.scss']
})
export class StudentProgDutiesComponent implements OnInit {

  @ViewChild(StudentProgramDutyDaysTaskComponent) progDayTaskChild: StudentProgramDutyDaysTaskComponent | undefined;
  programDutyDay: IProgramDutyDays | undefined
  taskDetails?:IProgramDayTasksModel;
  
  constructor() { }

  ngOnInit(): void {
 
  }

  progDutyDayEventCallBk(event?: IProgramDutyDays) {
    if (this.progDayTaskChild && event){
      this.progDayTaskChild.programDutyDay = event;
      this.progDayTaskChild?.getProgramDutyDays();
    } 
    this.programDutyDay = event; 
  }

  sendTaskIdToProgDayTaskDetails(item?:IProgramDayTasksModel){
    this.taskDetails=item;
  //  this.progamDetails=this.progDetails;
  }

}
