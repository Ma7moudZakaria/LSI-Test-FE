import { Data } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IscientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';

@Component({
  selector: 'app-card-student-scientific-problem',
  templateUrl: './card-student-scientific-problem.component.html',
  styleUrls: ['./card-student-scientific-problem.component.scss']
})
export class CardStudentScientificProblemComponent implements OnInit {

  constructor() { }
  @Input() scientificProblem: IscientificProblem = {};

  ngOnInit(): void {
  }

}
