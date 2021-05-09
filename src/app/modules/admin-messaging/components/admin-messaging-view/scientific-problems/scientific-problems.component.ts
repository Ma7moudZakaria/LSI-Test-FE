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

  scientificProblemFilter: IScientificProblemFilter = {skip : 0, take : 1, sortField : 'Name', ordType: 1};
  resultMessage:BaseMessageModel = {};
  scientificProblems: IScientificProblem[] | undefined; 
  adminCard : ScientificProblemUsersEnum = ScientificProblemUsersEnum.Admin;
  numberItemsPerRow = 4;
  totalCount = 0;

  constructor(public translate: TranslateService,private scientificProblemService:ScientificProblemService) { }

  ngOnInit(): void {
    this.getScientificProblems();
  }

  getScientificProblems(name?:string) {
    this.scientificProblemFilter.filterText=name || '';
    
    this.resultMessage = {};

    this.scientificProblemService.getScientificMateriaFilter(this.scientificProblemFilter).subscribe(res => {
      if (res.isSuccess){
        this.scientificProblems = res.data;
        this.totalCount = 2;
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

  filterRequest(event:IScientificProblemFilter){
    this.scientificProblemFilter = event;
    console.log(this.scientificProblemFilter);
    this.getScientificProblems();
  }
}
