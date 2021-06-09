import { Component, Input, OnInit } from '@angular/core';
import { IProgramDayTaskRepetition } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-repetition';

@Component({
  selector: 'app-program-day-task-repetition',
  templateUrl: './program-day-task-repetition.component.html',
  styleUrls: ['./program-day-task-repetition.component.scss']
})
export class ProgramDayTaskRepetitionComponent implements OnInit {
  @Input() repetitionDetailsModel: IProgramDayTaskRepetition = {};
  constructor() { }

  ngOnInit(): void {
  }

}
