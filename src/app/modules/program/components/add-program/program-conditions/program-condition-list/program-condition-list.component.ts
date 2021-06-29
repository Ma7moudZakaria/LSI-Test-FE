import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConditionsForm, IAssignConditionsToProgramModel } from 'src/app/core/interfaces/programs-interfaces/iassign-conditions-to-program-model';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';

@Component({
  selector: 'app-program-condition-list',
  templateUrl: './program-condition-list.component.html',
  styleUrls: ['./program-condition-list.component.scss']
})
export class ProgramConditionListComponent implements OnInit {
  @Output() closeConditionList = new EventEmitter<boolean>();
  @Input() progId?: string = '';
  programConditionsList: IprogramPredefinedCustomConditionsModel[] = [];
  conditionsFormModel: ConditionsForm[] = [];
  conIds: string[] = [];
  assignConditionsToProgramModel: IAssignConditionsToProgramModel = {};
  resultMessage: BaseMessageModel = {};
  errorMessage?: string;
  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    public programConditionsService: ProgramConditionsService,
    private alert: AlertifyService,

  ) { }

  ngOnInit(): void {
    this.getProgramConditionsLis();
  }

  getProgramConditionsLis() {
    this.programConditionsService.getConditionsNotAssignedToProgram(this.progId || '').subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.programConditionsList = res.data as IprogramPredefinedCustomConditionsModel[];
      }
      else {
        this.errorMessage = response.message;
      }
    }
      , error => {
        console.log(error);
      }
    );
  }

  onTaskChange(item: any, event: any) {
    if (event.checked) {
      this.conIds?.push(item.id);
    }
    else{
      let it = this.conIds.filter(i => i === item.id)[0];
      const ind = this.conIds?.indexOf(it);
      if (ind > -1) {
        this.conIds?.splice(ind, 1);
      }
    }
  }

  saveProgramConditions() {
    this.assignConditionsToProgramModel = {};
    if (this.conIds.length) {
      this.conIds.forEach((elm: any) => {
        this.conditionsFormModel.push({
          condId: elm

        });
      });
    }
    this.assignConditionsToProgramModel.conditions = this.conditionsFormModel;
    this.assignConditionsToProgramModel.progId = this.progId;
    this.programConditionsService.saveProgramConditions(this.assignConditionsToProgramModel).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.alert.success(res.message || '');
        this.closeEvent();
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

    );
  }

  closeEvent() {
    this.closeConditionList.emit(true)
  }

}
