import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';

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

  scientificProblemFilter: IScientificProblemFilter = {};
  resultMessage:BaseMessageModel = {};
  scientificProblems: IScientificProblem[] | undefined; 
  numberItemsPerRow = 4;
  adminCard : ScientificProblemUsersEnum = ScientificProblemUsersEnum.Admin;

  constructor(public translate: TranslateService,private scientificProblemService:ScientificProblemService) { }

  ngOnInit(): void {
    this.getScientificProblems();
  }

  getScientificProblems(name?:string) {
    this.scientificProblemFilter.filterText=name || '';
    this.scientificProblemFilter.skip=0;
    this.scientificProblemFilter.take= 2147483647;
    this.resultMessage = {};

    this.scientificProblemService.getScientificMateriaFilter(this.scientificProblemFilter).subscribe(res => {
      if (res.isSuccess){
        this.scientificProblems = res.data;
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
}
