import { Component, Input, OnInit } from '@angular/core';
import { StudentSubscriptionEmun } from 'src/app/core/enums/programs/stu-subscription-enum/student-subscription-emun.enum';

@Component({
  selector: 'app-stu-request-details',
  templateUrl: './stu-request-details.component.html',
  styleUrls: ['./stu-request-details.component.scss']
})
export class StuRequestDetailsComponent implements OnInit {
  @Input() selectedStuRequest: StudentSubscriptionEmun | undefined;
  studentSubscriptionEmun = StudentSubscriptionEmun;



  constructor() { }

  ngOnInit(): void {
  }

}
