import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { programPredefinedConditionsEnum } from 'src/app/core/enums/programs/program-predefined-conditions-enum.enum';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
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
  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    public programConditionsService:ProgramConditionsService
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
    //this.getProgramConditionsLisByProgId();
  }
  getProgramConditionsLisByProgId() {
    this.programConditionsService.getProgramConditionsByProgId(this.progId || '').subscribe(res => {
      this.programConditionsList = res.data as IProgramConditionsModel[];
    });
  }

}
