import { Component, OnInit } from '@angular/core';
import { IProgramDayTaskRepetition } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-repetition';

@Component({
  selector: 'app-program-day-task-repetition',
  templateUrl: './program-day-task-repetition.component.html',
  styleUrls: ['./program-day-task-repetition.component.scss']
})
export class ProgramDayTaskRepetitionComponent implements OnInit {
  dayRepetitionModel: IProgramDayTaskRepetition = {};
  constructor() { }

  ngOnInit(): void {
  }

  saveUpload() {
    let hearingModel = JSON.stringify(this.dayRepetitionModel);
  }

}
