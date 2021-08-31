import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-teacher-program-details',
  templateUrl: './admin-teacher-program-details.component.html',
  styleUrls: ['./admin-teacher-program-details.component.scss']
})
export class AdminTeacherProgramDetailsComponent implements OnInit {
  starsSelected=3.5;
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedIndex = 0;
  loadProgramMaterial() { }
  constructor() { }

  ngOnInit(): void {
  }

}
