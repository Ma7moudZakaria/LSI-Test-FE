import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';

import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';

@Component({
  selector: 'app-scientific-problems',
  templateUrl: './scientific-problems.component.html',
  styleUrls: ['./scientific-problems.component.scss']
})
export class ScientificProblemsComponent implements OnInit {

  scientificProblemFilter: IScientificProblemFilter = {skip : 0, take : 12, sorField : '', ordType: 1};
  resultMessage:BaseMessageModel = {};
  scientificProblems: IScientificProblemGridItems[] | undefined; 
  adminCard : ScientificProblemUsersEnum = ScientificProblemUsersEnum.Admin;
  numberItemsPerRow = 4;
  totalCount = 0;

  constructor(public translate: TranslateService,private scientificProblemService:ScientificProblemService) { }

  ngOnInit(): void {
    this.getScientificProblems();
  }

  getScientificProblems(name?:string) {
    this.scientificProblemFilter.filterText=name || '';
    this.scientificProblemFilter.sorField = this.translate.currentLang === LanguageEnum.ar ? 'studfullnamear' : 'studfullnameen'
    
    this.resultMessage = {};

    this.scientificProblemService.getScientificMateriaFilter(this.scientificProblemFilter).subscribe(res => {
      if (res.isSuccess){
        this.scientificProblems = res.data;
        this.scientificProblems?.forEach(function(item) {
          item.scCreatedOn = item.scCreatedOn ? new Date(item.scCreatedOn).toDateString(): '';
        });   
        this.totalCount = res.count ? res.count : 0;
      }
      else{
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
    )
  }

  filterByText(searchKey:string){
    this.scientificProblemFilter.filterText = searchKey;
    this.getScientificProblems();
  }

  filterRequest(event:IScientificProblemFilter){
    this.scientificProblemFilter = event;
    this.getScientificProblems();
  }
}
