import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import {  IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { IProgramDayTaskTasmea } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-tasmea';
import { StudentProgramDutyDaysTaskComponent } from './student-program-duty-days-task/student-program-duty-days-task.component';
import { StudentProgramDutyDaysComponent } from './student-program-duty-days/student-program-duty-days.component';

@Component({
  selector: 'app-student-prog-duties',
  templateUrl: './student-prog-duties.component.html',
  styleUrls: ['./student-prog-duties.component.scss']
})
export class StudentProgDutiesComponent implements OnInit {
  @ViewChild(StudentProgramDutyDaysTaskComponent) progDayTaskChild: StudentProgramDutyDaysTaskComponent | undefined;
  @ViewChild(StudentProgramDutyDaysComponent) progDayChild: StudentProgramDutyDaysComponent | undefined;
  programDutyDay: IProgramDutyDays | undefined
  taskDetails?:IProgramDayTasksModel;
  openAddScientificProblem: boolean = false
  tasmeaModel :IProgramDayTaskTasmea ={};
  isShowCall:boolean=false;
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
  }

  loadTask(){
    this.progDayTaskChild?.onTaskChange();
  }

  loadDay(){
    this.progDayChild?.onDayChange()
  }

  teacherCallPhon(item :IProgramDayTaskTasmea ){
    this.tasmeaModel=item;
   this.isShowCall=true;
  }


  closeAddScientificProblem() {
    this.openAddScientificProblem = false;
  }

  openAddScientificProblemPopup() {
    this.openAddScientificProblem = true;
  }
}
