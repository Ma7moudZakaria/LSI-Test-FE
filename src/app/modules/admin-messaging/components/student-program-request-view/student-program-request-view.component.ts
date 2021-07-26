import { Component, OnInit } from '@angular/core';
import { StudentSubscriptionEmun } from 'src/app/core/enums/programs/stu-subscription-enum/student-subscription-emun.enum';

@Component({
  selector: 'app-student-program-request-view',
  templateUrl: './student-program-request-view.component.html',
  styleUrls: ['./student-program-request-view.component.scss']
})
export class StudentProgramRequestViewComponent implements OnInit {
  selectedStuRequest = StudentSubscriptionEmun.joinRequest;
  constructor() { }

  ngOnInit(): void {
  }
  studentRequestSelected(selectedNumber: StudentSubscriptionEmun) {
    this.selectedStuRequest = selectedNumber;
  }
}
