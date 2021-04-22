import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';

@Component({
  selector: 'app-question-template',
  templateUrl: './question-template.component.html',
  styleUrls: ['./question-template.component.scss']
})
export class QuestionTemplateComponent implements OnInit {
  @Input() questionTemplat:IQuestion = {};

  constructor() { }

  ngOnInit(): void {
  }

}
