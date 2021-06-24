import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { programPredefinedConditionsEnum } from 'src/app/core/enums/programs/program-predefined-conditions-enum.enum';
import { ConditionsForm, IassignConditionsToProgramModel } from 'src/app/core/interfaces/programs-interfaces/iassign-conditions-to-program-model';
import { IProgCondPredefinedList } from 'src/app/core/interfaces/programs-interfaces/iprog-cond-predefined-list';
import { IProgCondPredefinedMultiList } from 'src/app/core/interfaces/programs-interfaces/iprog-cond-predefined-multi-list';
import { IProgCondPredefinedNumerical } from 'src/app/core/interfaces/programs-interfaces/iprog-cond-predefined-numerical';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';

@Component({
  selector: 'app-program-conditions',
  templateUrl: './program-conditions.component.html',
  styleUrls: ['./program-conditions.component.scss']
})
export class ProgramConditionsComponent implements OnInit {
  @Input() progId?: string = '';
  showAddConditionListForm = false;
  programConditionsList:IProgramConditionsModel[]=[];
  programConditionsEnum=programPredefinedConditionsEnum;
  conditionsFormModel:ConditionsForm[]=[];
  conIds:string[]=[];
  assignConditionsToProgramModel:IassignConditionsToProgramModel={};
  resultMessage: BaseMessageModel = {};
  ageModel: IProgCondPredefinedNumerical = {};
  partQuranModel: IProgCondPredefinedNumerical = {};
  maxmumSubscribeModel: IProgCondPredefinedNumerical = {};
  qualificationsModel: IProgCondPredefinedList = {};
  accepModel: IProgCondPredefinedList = {};
 degreeLastProgramModel: IProgCondPredefinedMultiList = {};
 lastProgramModel: IProgCondPredefinedMultiList = {};
 
  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    public programConditionsService:ProgramConditionsService,
  ) { }

  ngOnInit(): void {
    this.getProgramConditionsLisByProgId()
  }
  closeConditionList(event: boolean) {
    this.showAddConditionListForm = false;
    this.getProgramConditionsLisByProgId();
  }
  addConditions() {
    this.showAddConditionListForm = true;
  }
  getProgramConditionsLisByProgId() {
    this.programConditionsService.getProgramConditionsByProgId(this.progId || '').subscribe(res => {
      this.programConditionsList = res.data as IProgramConditionsModel[];
      this.programConditionsList.forEach(element => {
        if(this.programConditionsEnum.age===element.conditionNo){this.ageModel=JSON.parse(element.progCondValue ||'{}')}
        if(this.programConditionsEnum.dgreeaLastProgram===element.conditionNo){this.degreeLastProgramModel=JSON.parse(element.progCondValue ||'{}')}
      });
    });
  }

  saveProgramConditions() {
    this.assignConditionsToProgramModel = {};
    
      this.programConditionsList.filter(x=>x.conditionNo=this.programConditionsEnum.age).forEach((elm: IProgramConditionsModel) => {
        this.conditionsFormModel.push({
          condId: elm.condId,
         condValue:JSON.stringify(this.ageModel),
          required:true
        });
      });
      this.programConditionsList.filter(x=>x.conditionNo=this.programConditionsEnum.dgreeaLastProgram).forEach((elm: IProgramConditionsModel) => {
        this.conditionsFormModel.push({
          condId: '429c689b-0abb-4f07-8206-d4f236b68694',
         condValue:JSON.stringify(this.degreeLastProgramModel),
          required:true
        });
      });
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
