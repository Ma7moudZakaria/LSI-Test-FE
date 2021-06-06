import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IProgramBasicInfoDetails, IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ExamFormsListComponent } from './exam-forms-list/exam-forms-list.component';
import { ProgramAttacheExamTemplatsComponent } from './program-attache-exam-templats/program-attache-exam-templats.component';

@Component({
  selector: 'app-program-exames',
  templateUrl: './program-exames.component.html',
  styleUrls: ['./program-exames.component.scss']
})
export class ProgramExamesComponent implements OnInit {

  @ViewChild(ExamFormsListComponent) examFormsListComponent:ExamFormsListComponent | undefined;
  @ViewChild(ProgramAttacheExamTemplatsComponent) examDetailsComponent:ProgramAttacheExamTemplatsComponent | undefined;

  @Output() progDetailsEvent = new EventEmitter<string>();
  @Input() progDetails : IProgramDetails | undefined;

  selectedExamFormId={id:'',arabExamName:'',engExamName:''}; 
  constructor() { }

  ngOnInit(): void {
  }
  setSelectedExam(event:any){
    // this.selectedExamFormId = {id:event.id,arabExamName:event.arabExamName,engExamName:event.engExamName}; 

    this.examDetailsComponent?.getAttacheExamTemplate(event);
  }

  async assignExamFormToProgram() {

    await this.examFormsListComponent?.assignExamFormToProgram();
    this.progDetailsEvent.emit();
  }
}
