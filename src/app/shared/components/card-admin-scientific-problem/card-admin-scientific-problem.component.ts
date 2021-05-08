import { Component, Input, OnInit } from '@angular/core';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';

@Component({
  selector: 'app-card-admin-scientific-problem',
  templateUrl: './card-admin-scientific-problem.component.html',
  styleUrls: ['./card-admin-scientific-problem.component.scss']
})
export class CardAdminScientificProblemComponent implements OnInit {

  constructor() { }
  @Input() scientificProblem: IScientificProblem = {};

  ngOnInit(): void {
  }

}
