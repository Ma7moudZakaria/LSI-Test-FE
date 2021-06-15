import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramDetails, IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {

  @Input() progDays:Array<IProgramDutyDays> | undefined;
  programDayTasksDetails : Array<IProgramDayTasksModel> | undefined;
  resMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;

  constructor(private programDayTasksService:ProgramDayTasksService , public translate: TranslateService) { }

  ngOnInit(): void {
    console.log("progDays ===========>", this.progDays);

    var DayTasksData = this.progDays == null ? [] : this.progDays;
    
    this.getDayTasks(DayTasksData[0].id || '');
  }

  selectedIndex = 0; 
  getDayTasks(progDutyDaysId?: string){
    this.programDayTasksService.getProgramDayTasks(progDutyDaysId || '').subscribe(res => {
      if (res.isSuccess) {
        this.programDayTasksDetails = res.data as Array<IProgramDayTasksModel>;

        console.log("programDayTasksDetails ===========>", this.programDayTasksDetails);
      }
      else {
        this.resMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }
}
