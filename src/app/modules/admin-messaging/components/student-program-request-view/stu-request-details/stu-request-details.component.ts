import { Component, Input, OnInit } from '@angular/core';
import { StudentSubscriptionEmuns } from 'src/app/core/enums/programs/stu-subscription-enum/student-subscription-emuns.enum';

@Component({
  selector: 'app-stu-request-details',
  templateUrl: './stu-request-details.component.html',
  styleUrls: ['./stu-request-details.component.scss']
})
export class StuRequestDetailsComponent implements OnInit {
  @Input() selectedStuRequest: number | undefined;
  studentSubscriptionEmun = StudentSubscriptionEmuns;



  constructor() { }

  ngOnInit(): void {
  }

}
