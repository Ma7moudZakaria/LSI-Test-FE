import { Component, OnInit } from '@angular/core';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';

@Component({
  selector: 'app-attache-exam-template',
  templateUrl: './attache-exam-template.component.html',
  styleUrls: ['./attache-exam-template.component.scss']
})
export class AttacheExamTemplateComponent implements OnInit {
  exam : IExam = {questions: []};
  submitExam : boolean = false;
  examJson:string | undefined;
  voiceUrl:string | undefined;
  constructor() { }

  ngOnInit(): void {
  }
  //questin:IQuestion |undefined;
  addQuestion(){
    if (Object.keys(this.exam).length === 0){
      let id = BaseConstantModel.newGuid();
      this.exam = { examid: id, questions : []}
    }
    let qid = BaseConstantModel.newGuid();
    let ques : IQuestion  = {questionId : qid, questionNo : this.exam?.questions?.length + 1 ,answers:[]}
    this.exam.questions?.push(ques);
  }
 
  saveExam(){
    this.submitExam = true;
    this.examJson = JSON.stringify(this.exam);
  }

/////recording/////
saveVoiceUrl(event:any){
  this.voiceUrl = event;
}
/////end recording////
}
