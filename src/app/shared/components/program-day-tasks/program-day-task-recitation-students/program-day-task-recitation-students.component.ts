import { Component, Input, OnInit } from '@angular/core';
import { IProgramDayTaskRecitationStudents } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-recitation-students';

@Component({
  selector: 'app-program-day-task-recitation-students',
  templateUrl: './program-day-task-recitation-students.component.html',
  styleUrls: ['./program-day-task-recitation-students.component.scss']
})
export class ProgramDayTaskRecitationStudentsComponent implements OnInit {
  @Input() recitationStudentsModel :IProgramDayTaskRecitationStudents={}
  constructor() { }

  ngOnInit(): void {
  }

}
