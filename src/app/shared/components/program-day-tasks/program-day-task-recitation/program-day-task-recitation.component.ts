import { Component, Input, OnInit } from '@angular/core';
import { IProgramDayTaskRecitation } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-recitation';

@Component({
  selector: 'app-program-day-task-recitation',
  templateUrl: './program-day-task-recitation.component.html',
  styleUrls: ['./program-day-task-recitation.component.scss']
})
export class ProgramDayTaskRecitationComponent implements OnInit {
  @Input() recitationDetailsModel: IProgramDayTaskRecitation = {}
  constructor() { }

  ngOnInit(): void {
  }

}
