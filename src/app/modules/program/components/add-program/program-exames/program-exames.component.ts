import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ExamFormsListComponent } from './exam-forms-list/exam-forms-list.component';

@Component({
  selector: 'app-program-exames',
  templateUrl: './program-exames.component.html',
  styleUrls: ['./program-exames.component.scss']
})
export class ProgramExamesComponent implements OnInit {
  selectedExamFormId={id:'',arabExamName:'',engExamName:''}; 
  @ViewChild(ExamFormsListComponent) examFormsListComponent:ExamFormsListComponent | undefined;
  constructor() { }

  ngOnInit(): void {
  }
  setSelectedExam(event:any){
    this.selectedExamFormId = {id:event.id,arabExamName:event.arabExamName,engExamName:event.engExamName}; 
 
  }

  assignExamFormToProgram() {

    this.examFormsListComponent?.assignExamFormToProgram();
  }
}
