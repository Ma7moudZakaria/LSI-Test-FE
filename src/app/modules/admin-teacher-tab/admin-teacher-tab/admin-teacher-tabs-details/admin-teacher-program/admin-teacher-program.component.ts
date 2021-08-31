import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-teacher-program',
  templateUrl: './admin-teacher-program.component.html',
  styleUrls: ['./admin-teacher-program.component.scss']
})
export class AdminTeacherProgramComponent implements OnInit {


  showAddProgram: boolean =false;
  constructor() { }

  ngOnInit(): void {
  }

}
