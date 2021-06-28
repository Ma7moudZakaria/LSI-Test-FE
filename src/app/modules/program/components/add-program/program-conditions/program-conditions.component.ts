import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { programPredefinedConditionsEnum } from 'src/app/core/enums/programs/program-predefined-conditions-enum.enum';
import { ConditionsForm, IassignConditionsToProgramModel } from 'src/app/core/interfaces/programs-interfaces/iassign-conditions-to-program-model';
import { IProgCondPredefinedList } from 'src/app/core/interfaces/programs-interfaces/iprog-cond-predefined-list';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
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
  //programConditionsList:IProgramConditionsModel[]=[];
  programConditionsPredefinedList:IProgramConditionsModel[]=[];
  programConditionsCustomList:IprogramPredefinedCustomConditionsModel[]=[];
  programConditionsEnum=programPredefinedConditionsEnum;
  conditionsFormModel:ConditionsForm[]=[];
  conIds:string[]=[];
  assignConditionsToProgramModel:IassignConditionsToProgramModel={};
  resultMessage: BaseMessageModel = {};
  ageModel: IProgramConditionsModel = {};
  partQuranModel: IProgramConditionsModel = {};
  maxmumSubscribeModel: IProgramConditionsModel = {};
  qualificationsModel: IProgCondPredefinedList = {};
  accepModel: IProgramConditionsModel = {};
 degreeLastProgramModel: IProgramConditionsModel = {};
 lastProgramModel: IProgramConditionsModel = {};
 
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
     let programConditionsList = res.data as IProgramConditionsModel[];
       this.programConditionsPredefinedList= programConditionsList .filter(x=>x.isCustom==false) ;
       this.programConditionsCustomList=programConditionsList .filter(x=>x.isCustom).map(m=>({
        id:m.id ,
        title:m.title ,
        no:m.no,
         conditionJson:m.progCondValue !="0"?m.progCondValue:m.conditionContain,
         isRequired:m.condRequired
       }));
      this.programConditionsPredefinedList.forEach(element => {
        if(this.programConditionsEnum.age===element.conditionNo){this.ageModel=element}
        if(this.programConditionsEnum.numberStudentSubscribtion===element.conditionNo){this.maxmumSubscribeModel=element}
        if(this.programConditionsEnum.memorizeQuran===element.conditionNo){this.partQuranModel=element}
        if(this.programConditionsEnum.dgreeaLastProgram===element.conditionNo){this.degreeLastProgramModel=element}
        if(this.programConditionsEnum.qualifications===element.conditionNo){this.qualificationsModel=element}
        if(this.programConditionsEnum.programFinished===element.conditionNo){this.lastProgramModel=element}
        if(this.programConditionsEnum.accept===element.conditionNo){this.accepModel=element}
      });

      this.programConditionsCustomList.forEach(element => {
        element.conditionModel = JSON.parse(element.conditionJson || "{}")
      });
    });
  }


}
