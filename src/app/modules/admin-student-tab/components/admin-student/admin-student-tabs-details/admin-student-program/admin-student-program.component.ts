import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-student-program',
  templateUrl: './admin-student-program.component.html',
  styleUrls: ['./admin-student-program.component.scss']
})
export class AdminStudentProgramComponent implements OnInit {
  showAddProgram: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  showAddProgramOverlay($event: boolean) {
    this.showAddProgram = $event;
  }
  closeExamOverlay() {
    this.showAddProgram = false;
  }



}

