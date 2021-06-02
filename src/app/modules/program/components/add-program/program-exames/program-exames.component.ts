import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-exames',
  templateUrl: './program-exames.component.html',
  styleUrls: ['./program-exames.component.scss']
})
export class ProgramExamesComponent implements OnInit {
  selectedExamFormId={id:'',arabExamName:'',engExamName:''}; 
  constructor() { }

  ngOnInit(): void {
  }
  setSelectedExam(event:any){
    this.selectedExamFormId = {id:event.id,arabExamName:event.arabExamName,engExamName:event.engExamName}; 
 
  }
}
