import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-student-program-duty-days-task',
  templateUrl: './student-program-duty-days-task.component.html',
  styleUrls: ['./student-program-duty-days-task.component.scss']
})
export class StudentProgramDutyDaysTaskComponent implements OnInit {

  @Output() taskDetailsEvent = new EventEmitter<IProgramDayTasksModel>();
  @Input() programDutyDay: IProgramDutyDays | undefined;
  programDayTasksLists = [] as Array<IProgramDayTasksModel>;
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  defaultSelectedDay:number = 0;

  constructor(
    public languageService: LanguageService,
    private programDayTasksService: ProgramDayTasksService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getProgramDutyDays();
  }

  getProgramDutyDays() {
    this.programDayTasksService.getProgramDayTasks(this.programDutyDay?.id || '').subscribe(res => {
      if (res.isSuccess) {
        this.programDayTasksLists = res.data as Array<IProgramDayTasksModel>;
        this.setProgrmeDayTask(this.programDayTasksLists[0])
      }
      else {
        this.resMessage =
        {
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

  setProgrmeDayTask(item: IProgramDayTasksModel) {
    this.taskDetailsEvent.emit(item);
  }

}
