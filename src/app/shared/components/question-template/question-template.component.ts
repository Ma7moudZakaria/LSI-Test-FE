import { Component, Input, OnInit } from '@angular/core';
import { IAnswer } from 'src/app/core/interfaces/exam-builder-interfaces/ianswer';
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
  addAnswer(){
    if (Object.keys(this.questionTemplat).length === 0){
      this.questionTemplat = { questionId: '1', answers : []}
    }
     let answer : IAnswer  = {answerId : '1'}
    this.questionTemplat.answers?.push(answer)
  }
}
