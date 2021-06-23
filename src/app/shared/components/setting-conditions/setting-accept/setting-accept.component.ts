import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramConditionAcceptEnum } from 'src/app/core/enums/programs/program-condition-accept-enum.enum';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';

@Component({
  selector: 'app-setting-accept',
  templateUrl: './setting-accept.component.html',
  styleUrls: ['./setting-accept.component.scss']
})
export class SettingAcceptComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}
  programConditionAcceptEnum = ProgramConditionAcceptEnum;
  langEnum = LanguageEnum;
  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

}
