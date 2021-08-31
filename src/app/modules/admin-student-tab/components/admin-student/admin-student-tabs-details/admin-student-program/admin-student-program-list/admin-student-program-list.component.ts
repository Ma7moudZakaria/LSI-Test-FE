import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-student-program-list',
  templateUrl: './admin-student-program-list.component.html',
  styleUrls: ['./admin-student-program-list.component.scss']
})
export class AdminStudentProgramListComponent implements OnInit {
  programs = [1, 2];
  selectedIndex = 0
  constructor() { }

  ngOnInit(): void {
  }

}
