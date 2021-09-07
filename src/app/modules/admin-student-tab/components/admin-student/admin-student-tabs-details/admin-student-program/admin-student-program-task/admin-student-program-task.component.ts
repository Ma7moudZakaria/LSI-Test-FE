import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-student-program-task',
  templateUrl: './admin-student-program-task.component.html',
  styleUrls: ['./admin-student-program-task.component.scss']
})
export class AdminStudentProgramTaskComponent implements OnInit {
  programs = [1, 2];
  selectedIndex = 0
  constructor() { }

  ngOnInit(): void {
  }

}
