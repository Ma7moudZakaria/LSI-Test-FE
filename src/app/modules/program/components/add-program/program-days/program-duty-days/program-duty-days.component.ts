import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ICreateProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/icreate-program-day-tasks-model';
import { IProgramDetailsModel, IProgramDutyDaysModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';
import { isTemplateSpan } from 'typescript';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter || !filter.dayOrder) {
      return items;
    }

    return items.filter(item => item.dayOrder === filter.dayOrder);
  }
}

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
  filterargs = { dayOrder: undefined };

  @Input() progDaysList: IProgramDutyDaysModel[] | undefined;
  @Output() progDutyDayEvent = new EventEmitter<IProgramDutyDaysModel>();

  constructor(
    public languageService: LanguageService,
    private programDayTasksService: ProgramDayTasksService,
    public translate: TranslateService,
    private fb: FormBuilder,
    private lookupService: LookupService
  ) { }

  ngOnInit(): void {
    this.setCurrentLang();
    this.progDaysList = [];
    this.progDaysList?.push({ id: '11', dayOrder: 11 }, { id: '1', dayOrder: 1 }, { id: '2', dayOrder: 2 }, { id: '3', dayOrder: 3 })
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

  getProgramDetails(id: string) {
    this.programDayTasksService.getProgramDayTasks(id).subscribe(res => {
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

  onDayClick(event: IProgramDutyDaysModel) {
    this.progDutyDayEvent.emit(event);
  }


}
