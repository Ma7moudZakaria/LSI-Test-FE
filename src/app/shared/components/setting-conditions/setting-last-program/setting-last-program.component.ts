import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramFilterByNameRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-setting-last-program',
  templateUrl: './setting-last-program.component.html',
  styleUrls: ['./setting-last-program.component.scss']
})
export class SettingLastProgramComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}
  ProgramsList: IprogramsModel[] = [];
  programFilterByNameFilterRequest = {} as IProgramFilterByNameRequest;
  langEnum = LanguageEnum;
  constructor(
    private ProgramService: ProgramService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getPrograms();
  }
  getPrograms() {
    this.programFilterByNameFilterRequest = { 
      name: ""
    }

    this.ProgramService.getAllPrograms(this.programFilterByNameFilterRequest).subscribe(res => {
      let response = <BaseResponseModel>res;
        this.ProgramsList = response.data;
    },
      error => {
        console.log(error);
      }
    )
  }

}
