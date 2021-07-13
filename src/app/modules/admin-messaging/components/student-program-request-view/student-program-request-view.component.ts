import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-program-request-view',
  templateUrl: './student-program-request-view.component.html',
  styleUrls: ['./student-program-request-view.component.scss']
})
export class StudentProgramRequestViewComponent implements OnInit {
  selectedStuRequest: number = 1;
  constructor() { }

  ngOnInit(): void {
  }
  studentRequestSelected(selectedNumber: number) {
    this.selectedStuRequest = selectedNumber;
  }
}
