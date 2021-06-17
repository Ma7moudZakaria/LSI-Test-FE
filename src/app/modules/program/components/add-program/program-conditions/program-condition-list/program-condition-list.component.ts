import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConditionsForm, IassignConditionsToProgramModel } from 'src/app/core/interfaces/programs-interfaces/iassign-conditions-to-program-model';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';

@Component({
  selector: 'app-program-condition-list',
  templateUrl: './program-condition-list.component.html',
  styleUrls: ['./program-condition-list.component.scss']
})
export class ProgramConditionListComponent implements OnInit {
  programConditionsList:IprogramPredefinedCustomConditionsModel[]=[];
  conditionsFormModel:ConditionsForm[]=[];
  conIds:string[]=[];
  assignConditionsToProgramModel:IassignConditionsToProgramModel={};
  @Input() progId?: string = '';
  resultMessage: BaseMessageModel = {};
  
  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    public programConditionsService:ProgramConditionsService

  ) { }

  ngOnInit(): void {
    this.getProgramConditionsLis();

  }

  getProgramConditionsLis() {
    this.programConditionsService.getProgramConditionsList().subscribe(res => {
      this.programConditionsList = res.data as IprogramPredefinedCustomConditionsModel[];
    });
  }

  onTaskChange(item : any, event : any){
    if (event.checked){
      this.conIds?.push(item.id);
    }
  }

  saveProgramConditions() {
    this.assignConditionsToProgramModel = {};
    if (this.conIds.length) {
      this.conIds.forEach((elm: any) => {
        this.conditionsFormModel.push({
          condId: elm
         
        });
      });}
    this.assignConditionsToProgramModel.conditions=this.conditionsFormModel;
    this.assignConditionsToProgramModel.progId=this.progId;
    this.programConditionsService.saveProgramConditions(this.assignConditionsToProgramModel).subscribe(res => {
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
    
    );
  }

}
