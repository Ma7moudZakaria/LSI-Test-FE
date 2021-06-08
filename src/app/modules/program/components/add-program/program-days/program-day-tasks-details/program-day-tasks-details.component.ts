import { Component, Input, OnInit } from '@angular/core';
import { ProgramDayTasksDetails } from 'src/app/core/enums/programs/program-day-tasks-details.enum';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';

@Component({
  selector: 'app-program-day-tasks-details',
  templateUrl: './program-day-tasks-details.component.html',
  styleUrls: ['./program-day-tasks-details.component.scss']
})
export class ProgramDayTasksDetailsComponent implements OnInit {
  @Input()taskDetails:IProgramDayTasksModel | undefined;
  detailsTypeEnum = ProgramDayTasksDetails;

  hearingTaskDetailsModel :IProgramDayTaskHearing = {}




  constructor() { }

  ngOnInit(): void {
  }

  save(){
    // console.log('model'+ this.hearingTaskDetailsModel);
    // console.log('string'+ JSON.stringify(this.hearingTaskDetailsModel));
    let detailsStringfy

    switch (this.taskDetails?.huffazTask) {
      case this.detailsTypeEnum.taskHearing:
        detailsStringfy = JSON.stringify(this.hearingTaskDetailsModel);
        break;
      case this.detailsTypeEnum.TaskVideo:
        detailsStringfy = JSON.stringify(this.hearingTaskDetailsModel);
        break;
    
      default:
        break;
    }
  }
}
