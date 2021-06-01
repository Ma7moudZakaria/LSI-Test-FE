import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ICreateProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/icreate-program-day-tasks-model';
import { IProgramDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-program-duty-days',
  templateUrl: './program-duty-days.component.html',
  styleUrls: ['./program-duty-days.component.scss']
})
export class ProgramDutyDaysComponent implements OnInit {
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  selectedProgramDayTasksList = Array<ICreateProgramDayTasksModel>();
  programDutyDaysDetails = {} as IProgramDetailsModel;

  constructor(
    public languageService: LanguageService,
    private ProgramService: ProgramService,
    public translate: TranslateService,
    private fb: FormBuilder,
    private lookupService: LookupService
  ) { }

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

  getProgramDutyDays(id?: string) {
    this.ProgramService.getProgramDetails(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.programDutyDaysDetails = res.data as IProgramDetailsModel;

        console.log("programDutyDaysDetails ===========>", this.programDutyDaysDetails);
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
}
