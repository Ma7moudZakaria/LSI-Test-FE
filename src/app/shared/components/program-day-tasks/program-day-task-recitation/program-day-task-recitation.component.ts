import { Component, Input, OnInit } from '@angular/core';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-program-day-task-recitation',
  templateUrl: './program-day-task-recitation.component.html',
  styleUrls: ['./program-day-task-recitation.component.scss']
})
export class ProgramDayTaskRecitationComponent implements OnInit {
  @Input() recitationDetailsModel: IProgramBasicInfoDetails = {}
  constructor() { }

  ngOnInit(): void {
  }

}
