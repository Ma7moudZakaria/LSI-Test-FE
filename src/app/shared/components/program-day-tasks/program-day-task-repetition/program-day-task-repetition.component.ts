import { Component, Input, OnInit } from '@angular/core';
import { ProgramDutyDaysTaskViewMoodEnum } from 'src/app/core/enums/programs/program-duty-days-task-view-mood-enum.enum';
import { IProgramDayTaskRepetition } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-repetition';

@Component({
  selector: 'app-program-day-task-repetition',
  templateUrl: './program-day-task-repetition.component.html',
  styleUrls: ['./program-day-task-repetition.component.scss']
})
export class ProgramDayTaskRepetitionComponent implements OnInit {
  @Input() repetitionDetailsModel: IProgramDayTaskRepetition = {};
  @Input() isView: boolean = false;
  @Input() dutyDaysTaskViewMood: number = ProgramDutyDaysTaskViewMoodEnum.admin;
  programDutyDaysTaskViewMoodEnum=ProgramDutyDaysTaskViewMoodEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
