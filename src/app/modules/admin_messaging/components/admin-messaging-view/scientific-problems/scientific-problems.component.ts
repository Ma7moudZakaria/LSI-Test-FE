import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';

@Component({
  selector: 'app-scientific-problems',
  templateUrl: './scientific-problems.component.html',
  styleUrls: ['./scientific-problems.component.scss']
})
export class ScientificProblemsComponent implements OnInit {
  scientificProblemFilter: IScientificProblemFilter = {};
  constructor(public translate: TranslateService,scientificProblemService:ScientificProblemService) { }

  ngOnInit(): void {
  }

}
