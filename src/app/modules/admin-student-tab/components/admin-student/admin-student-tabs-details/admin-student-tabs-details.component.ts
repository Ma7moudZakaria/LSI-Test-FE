import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-student-tabs-details',
  templateUrl: './admin-student-tabs-details.component.html',
  styleUrls: ['./admin-student-tabs-details.component.scss']
})
export class AdminStudentTabsDetailsComponent implements OnInit {
  showTap: string = 'PROGRAM';

  constructor() { }

  ngOnInit(): void {
  }

}
