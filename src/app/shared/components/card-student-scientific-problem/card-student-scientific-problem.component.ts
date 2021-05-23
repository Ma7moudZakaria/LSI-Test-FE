import { Data } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';

@Component({
  selector: 'app-card-student-scientific-problem',
  templateUrl: './card-student-scientific-problem.component.html',
  styleUrls: ['./card-student-scientific-problem.component.scss']
})
export class CardStudentScientificProblemComponent implements OnInit {

  constructor() { }
  @Input() scientificProblem: IScientificProblem = {};
  @Output() deleteScientificProblem = new EventEmitter<string>();

  ngOnInit(): void {
  }

  deleteScientificProblemEve(){
    this.deleteScientificProblem.emit(this.scientificProblem.id);
  }

}
