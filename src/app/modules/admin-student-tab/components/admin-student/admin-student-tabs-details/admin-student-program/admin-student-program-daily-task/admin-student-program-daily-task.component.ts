import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-student-program-daily-task',
  templateUrl: './admin-student-program-daily-task.component.html',
  styleUrls: ['./admin-student-program-daily-task.component.scss']
})
export class AdminStudentProgramDailyTaskComponent implements OnInit {
  programs = [1, 2];
  selectedIndex = 0
  constructor() { }

  ngOnInit(): void {
  }

}
