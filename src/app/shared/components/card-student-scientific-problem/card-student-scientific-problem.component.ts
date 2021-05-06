import { Data } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-student-scientific-problem',
  templateUrl: './card-student-scientific-problem.component.html',
  styleUrls: ['./card-student-scientific-problem.component.scss']
})
export class CardStudentScientificProblemComponent implements OnInit {

  constructor() { }
  @Input() question: string | undefined;
  @Input() replay: string | undefined;
  @Input() question_number: number | undefined;
  @Input() time: string | undefined;

  ngOnInit(): void {
  }

}
