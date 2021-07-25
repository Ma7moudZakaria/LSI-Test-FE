import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProgramConditionViewMoodEnum } from 'src/app/core/enums/programs/program-condition-view-mood-enum.enum';
import { programPredefinedConditionsEnum } from 'src/app/core/enums/programs/program-predefined-conditions-enum.enum';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
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
  programConditionsPredefinedList:IProgramConditionsModel[]=[];
  programConditionsCustomList:IprogramPredefinedCustomConditionsModel[]=[];
  programConditionsEnum=programPredefinedConditionsEnum;
 errorMessage?: string;
 programConditionViewMoodEnum=ProgramConditionViewMoodEnum;

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
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        let programConditionsList = res.data as IProgramConditionsModel[];
        this.programConditionsPredefinedList= programConditionsList .filter(x=>x.isCustom==false) ;
        this.programConditionsCustomList=programConditionsList .filter(x=>x.isCustom).map(m=>({
         id:m.id ,
         title:m.title ,
         no:m.no,
          conditionJson:m.progCondValue !="0"?m.progCondValue:m.conditionContain,
          isRequired:m.condRequired,
          conditionModel:  JSON.parse(m.conditionContain || "{}")
        }));
      }
      else {
        this.errorMessage = response.message;
      }
    } ,
      error => {
        console.log(error);
      });
  }


}
