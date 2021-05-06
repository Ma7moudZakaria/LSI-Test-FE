import { Component, Input, OnInit } from '@angular/core';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';

@Component({
  selector: 'app-scientific-problems-grid',
  templateUrl: './scientific-problems-grid.component.html',
  styleUrls: ['./scientific-problems-grid.component.scss']
})
export class ScientificProblemsGridComponent implements OnInit {

  @Input() items: IScientificProblem[] = []
  @Input() numberPerRow: number = 3; //default is 3
  @Input() selectComponent: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
