import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';
import { IScientificProblems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problems';
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
  card_scientificProblem: IScientificProblems[]=[]; 
  constructor(public translate: TranslateService,private scientificProblemService:ScientificProblemService) { }
  ngOnInit(): void {
  }
  getScientificProblemS(name?:string) {
    this.scientificProblemFilter.filterText=name || '';
    this.scientificProblemFilter.skip=0;
    this.scientificProblemFilter.take= 2147483647;
    this.resultMessage = {};
    this.scientificProblemService.getScientificMateriaFilter(this.scientificProblemFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
        this.card_scientificProblem = response.data;
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
