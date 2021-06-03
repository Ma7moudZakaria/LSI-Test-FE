import { EventEmitter, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IProgramDetailsModel, IProgramDutyDaysModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-details-model';
import { ProgramDayTasksComponent } from './program-day-tasks/program-day-tasks.component';

@Component({
  selector: 'app-program-days',
  templateUrl: './program-days.component.html',
  styleUrls: ['./program-days.component.scss']
})
export class ProgramDaysComponent implements OnInit {

  @ViewChild(ProgramDayTasksComponent) progDayTaskChild: ProgramDayTasksComponent | undefined;

  @Input() programDetails: IProgramDetailsModel = {}
  showAddDayTasksForm = false;

  progDutyDayModel: IProgramDutyDaysModel | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log(this.programDetails);
    // this.DetailsOfProgram = this.getProgramDetails || this.DetailsOfProgram;

  }

  progDutyDayEventCallBk(event: IProgramDutyDaysModel) {
    this.progDayTaskChild?.getProgramDutyDays(event.id || '');
  }

  openAddDayTasks(event: boolean) {
    this.showAddDayTasksForm = event;
  }

  closeDayTasks(event: boolean) {
    this.showAddDayTasksForm = event;
    this.showAddDayTasksForm = false;

    // this.userScientificProbChild?.getScientificProblemByUserId();
  }
  openAddDayTasksForm() {
    this.showAddDayTasksForm = true;

  }
}
