import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramDutyDaysModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-program-day-tasks',
  templateUrl: './program-day-tasks.component.html',
  styleUrls: ['./program-day-tasks.component.scss']
})
export class ProgramDayTasksComponent implements OnInit {

  @Output() openAddDayTasks = new EventEmitter<boolean>();

  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  programDayTasksLists = {} as Array<IProgramDayTasksModel>;

  constructor(
    public languageService: LanguageService,
    private programDayTasksService: ProgramDayTasksService,
    public translate: TranslateService,
    private lookupService: LookupService) { }

  ngOnInit(): void {
  }

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle() {
    // this.languageService.headerPageNameEvent.emit(this.translate.instant('UPDATE_TEACHER_PG.TITLE'));
  }

  getProgramDutyDays(id: string) {
    this.programDayTasksService.getProgramDayTasks(id).subscribe(res => {
      if (res.isSuccess) {
        this.programDayTasksLists = res.data as Array<IProgramDayTasksModel>;

        console.log("programDayTasksLists ===========>", this.programDayTasksLists);
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

  newDayTasks() {
    this.openAddDayTasks.emit(true);

  }

}
