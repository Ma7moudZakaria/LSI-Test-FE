import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramDetails, IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { AddProgramDayTasksComponent } from './add-program-day-tasks/add-program-day-tasks.component';
import { ProgramDayTasksDetailsComponent } from './program-day-tasks-details/program-day-tasks-details.component';
import { ProgramDayTasksComponent } from './program-day-tasks/program-day-tasks.component';

@Component({
  selector: 'app-program-days',
  templateUrl: './program-days.component.html',
  styleUrls: ['./program-days.component.scss']
})
export class ProgramDaysComponent implements OnInit {

  @Output() refreshProgDetails = new EventEmitter();

  @ViewChild(ProgramDayTasksComponent) progDayTaskChild: ProgramDayTasksComponent | undefined;
  @ViewChild(ProgramDayTasksDetailsComponent) progDayTaskDetailsChild: ProgramDayTasksDetailsComponent | undefined;
  // @ViewChild(AddProgramDayTasksComponent) addProgDayTaskCompChild:AddProgramDayTasksComponent | undefined;

  @Input() progDetails: IProgramDetails = {};

  programDutyDay: IProgramDutyDays | undefined
  taskDetails?:IProgramDayTasksModel;
  progamDetails: IProgramDetails = {};
  showAddDayTasksForm = false;

  dataOfProgDutyDay: IProgramDutyDays | undefined;

  progDutyDayModel: IProgramDutyDays | undefined;
  selectedProgDutyDays:IProgramDutyDays[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.progDetails);
    // this.DetailsOfProgram = this.getProgramDetails || this.DetailsOfProgram;

  }


  progDutyDayEventCallBk(event?: IProgramDutyDays) {
    if (this.progDayTaskChild && event){
      this.progDayTaskChild.programDutyDay = event;
      this.progDayTaskChild?.getProgramDutyDays();
    }
    this.programDutyDay = event;
    //this.selectedProgDutyDays = [];
  }

  progDutyDaysCheckBoxCallBK(event: IProgramDutyDays){

    if(this.selectedProgDutyDays.includes(event)){
      let it = this.selectedProgDutyDays.filter(i => i.id === event.id)[0];
      const ind = this.selectedProgDutyDays.indexOf(it);
      if (ind > -1) {
        this.selectedProgDutyDays.splice(ind, 1);
      }
    }
    else{
      this.selectedProgDutyDays.push(event);
    }
    console.log(this.selectedProgDutyDays)

    //update prog duty day object to undefined as we dealt with group
    this.programDutyDay = undefined;
  }

  openAddDayTasks(event: boolean) {
    this.showAddDayTasksForm = event;
  }

  closeDayTasks(event: boolean) {
    this.showAddDayTasksForm = event;
    this.showAddDayTasksForm = false;
    this.refreshProgDetails.emit();
    this.selectedProgDutyDays = [];
    // this.progDutyDayEventCallBk(this.programDutyDay);
    // this.userScientificProbChild?.getScientificProblemByUserId();
    console.log("nagy")
  }
  openAddDayTasksForm() {
    this.showAddDayTasksForm = true;

  }

  getProgramDutyDay() {
    this.dataOfProgDutyDay = this.programDutyDay;

  }
  sendTaskIdToProgDayTaskDetails(item?:IProgramDayTasksModel){
    this.taskDetails=item;
    this.progamDetails=this.progDetails;
  }
}
