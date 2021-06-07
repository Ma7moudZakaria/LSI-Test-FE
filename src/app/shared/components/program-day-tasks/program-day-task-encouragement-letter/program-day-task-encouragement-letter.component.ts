import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProgramDayTaskEncouragementLetterType } from 'src/app/core/enums/program-day-task-encouragement-letter-type.enum';
import { ISaveProgramDayTaskDetailsModel } from 'src/app/core/interfaces/programs-interfaces/isave-program-day-task-Details-model';
import { IProgramDayTaskEncouragementLetter } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-encouragement-letter';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-program-day-task-encouragement-letter',
  templateUrl: './program-day-task-encouragement-letter.component.html',
  styleUrls: ['./program-day-task-encouragement-letter.component.scss']
})
export class ProgramDayTaskEncouragementLetterComponent implements OnInit {
  @Input() viewMode: boolean = false;
  encouragementLetterObj: IProgramDayTaskEncouragementLetter={};
  programDayTaskDetails: ISaveProgramDayTaskDetailsModel={};
  resultMessage: BaseMessageModel = {};
  @Input() selectedTaskId:string|undefined;
  constructor(
    private programDayTasksService:ProgramDayTasksService, 
    private activeroute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    public translate: TranslateService, private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  onQuestionTextChange(){
    this.encouragementLetterObj.text ? this.encouragementLetterObj.letterType = ProgramDayTaskEncouragementLetterType.text : null;
  }
  saveVoiceUrl(event: any) {
    this.encouragementLetterObj.voiceUrl = event;
    this.encouragementLetterObj.voiceUrl ? this.encouragementLetterObj.letterType = ProgramDayTaskEncouragementLetterType.voice: null;
  }
  saveEncouragementLetterTaskToProgram() {
    this.programDayTaskDetails.programDayTask = this.selectedTaskId;
    this.programDayTaskDetails.detailsTask = JSON.stringify(this.encouragementLetterObj);
    this.resultMessage = {};
       this.programDayTasksService.SaveProgramDayTaskDetails(this.programDayTaskDetails).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.resultMessage = {
          message: res.message || "",
          type: BaseConstantModel.SUCCESS_TYPE
        }
      
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
 
  }
}
