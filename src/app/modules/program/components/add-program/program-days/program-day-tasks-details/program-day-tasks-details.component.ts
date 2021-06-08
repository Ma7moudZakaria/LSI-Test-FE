import { Component, Input, OnInit } from '@angular/core';
import { ProgramDayTasksDetails } from 'src/app/core/enums/programs/program-day-tasks-details.enum';
import { IAttacheExamTemplateModel } from 'src/app/core/interfaces/exam-form-interfaces/iattache-exam-template-model';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramDayTaskEncouragementLetter } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-encouragement-letter';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';
import { IProgramDayTaskLinking } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-linking';
import { IProgramDayTaskMemorize } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-memorize';
import { IProgramDayTaskReadExplanation } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-read-explanation';
import { IProgramDayTaskRecitation } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-recitation';
import { IProgramDayTaskRepetition } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-repetition';
import { IProgramDayTaskReview } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-review';
import { IProgramDayTaskVideo } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-video';

@Component({
  selector: 'app-program-day-tasks-details',
  templateUrl: './program-day-tasks-details.component.html',
  styleUrls: ['./program-day-tasks-details.component.scss']
})
export class ProgramDayTasksDetailsComponent implements OnInit {
  @Input() taskDetails: IProgramDayTasksModel | undefined;
  detailsTypeEnum = ProgramDayTasksDetails;

  hearingTaskDetailsModel: IProgramDayTaskHearing = {}
  readExplanationDetailsModel: IProgramDayTaskReadExplanation = {}
  encouragementLetterDetailsModel: IProgramDayTaskEncouragementLetter = {}
  linkingDetailsModel: IProgramDayTaskLinking = {}
  memorizeDetailsModel: IProgramDayTaskMemorize = {}
  recitationDetailsModel: IProgramDayTaskRecitation = {}
  repetitionDetailsModel: IProgramDayTaskRepetition = {}
  reviewDetailsModel: IProgramDayTaskReview = {}
  VideoDetailsModel: IProgramDayTaskVideo = {}
  testPhasedDetailsModel: IAttacheExamTemplateModel = {}
  dailyTestDetailsModel: IAttacheExamTemplateModel = {}



  constructor() { }

  ngOnInit(): void {
  }

  save() {
    // console.log('model'+ this.hearingTaskDetailsModel);
    // console.log('string'+ JSON.stringify(this.hearingTaskDetailsModel));
    let detailsStringfy

    switch (this.taskDetails?.huffazTask) {
      case this.detailsTypeEnum.taskHearing:
        detailsStringfy = JSON.stringify(this.hearingTaskDetailsModel);
        break;
      case this.detailsTypeEnum.TaskReadExplanation:
        detailsStringfy = JSON.stringify(this.readExplanationDetailsModel);
        break;

      default:
        break;
    }
  }
}
