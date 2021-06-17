import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';

@Component({
  selector: 'app-program-condition-list',
  templateUrl: './program-condition-list.component.html',
  styleUrls: ['./program-condition-list.component.scss']
})
export class ProgramConditionListComponent implements OnInit {
  programConditionsList:IprogramPredefinedCustomConditionsModel[]=[];
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

  saveProgramConditions() {
    this.programConditionsService.getProgramConditionsList().subscribe(res => {
      this.programConditionsList = res.data as IprogramPredefinedCustomConditionsModel[];
    });
  }

}
