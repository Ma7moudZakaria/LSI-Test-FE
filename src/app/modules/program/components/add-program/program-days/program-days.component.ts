import { EventEmitter, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IProgramDetails, IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { ProgramDayTasksDetailsComponent } from './program-day-tasks-details/program-day-tasks-details.component';
import { ProgramDayTasksComponent } from './program-day-tasks/program-day-tasks.component';

@Component({
  selector: 'app-program-days',
  templateUrl: './program-days.component.html',
  styleUrls: ['./program-days.component.scss']
})
export class ProgramDaysComponent implements OnInit {

  @ViewChild(ProgramDayTasksComponent) progDayTaskChild: ProgramDayTasksComponent | undefined;
  @ViewChild(ProgramDayTasksDetailsComponent) progDayTaskDetailsChild: ProgramDayTasksDetailsComponent | undefined;

  @Input() progDetails: IProgramDetails = {};
  programDutyDay: IProgramDutyDays = {}

  showAddDayTasksForm = false;

  dataOfProgDutyDay: IProgramDutyDays = {};

  progDutyDayModel: IProgramDutyDays | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log(this.progDetails);
    // this.DetailsOfProgram = this.getProgramDetails || this.DetailsOfProgram;

  }

  progDutyDayEventCallBk(event: IProgramDutyDays) {
    this.progDayTaskChild?.getProgramDutyDays(event.id || '');
    this.programDutyDay = event;    
  }

  openAddDayTasks(event: boolean) {
    this.showAddDayTasksForm = event;
  }

  closeDayTasks(event: boolean) {
    this.showAddDayTasksForm = event;
    this.showAddDayTasksForm = false;
this.progDutyDayEventCallBk(this.programDutyDay);
    // this.userScientificProbChild?.getScientificProblemByUserId();
  }
  openAddDayTasksForm() {
    this.showAddDayTasksForm = true;

  }

  getProgramDutyDay() {
    this.dataOfProgDutyDay = this.programDutyDay;

  }
  sendTaskIdToProgDayTaskDetails(huffazTask?:any){
    this.progDayTaskDetailsChild?.programDayTaskId!=huffazTask.programDayTaskId;
    this.progDayTaskDetailsChild?.huffazTaskType!=huffazTask.huffazTaskType;
    this.progDayTaskDetailsChild?.getProgramDayTaskDetails(huffazTask.programDayTaskId,huffazTask.huffazTaskType);
  }
}
