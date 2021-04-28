import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { IAttacheExamTemplateModel } from 'src/app/core/interfaces/exam-form-interfaces/iattache-exam-template-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';

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
  isView=true;
  sttacheExamTemplate: IAttacheExamTemplateModel = {};
  constructor( private examFormService: ExamFormService,private activeroute: ActivatedRoute, 
    private router: Router, 
    public translate: TranslateService,private fb: FormBuilder) { }

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
    this.isView=true;
    this.examJson = JSON.stringify(this.exam);
    console.log(this.examJson);
  }

/////recording/////
saveVoiceUrl(event:any){
  this.voiceUrl = event;
}
/////end recording////

editQuestionTemplate(){
  this.isView=false;
}
}
