import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentSubscriptionEmun } from 'src/app/core/enums/programs/stu-subscription-enum/student-subscription-emun.enum';

@Component({
  selector: 'app-stu-list-request',
  templateUrl: './stu-list-request.component.html',
  styleUrls: ['./stu-list-request.component.scss']
})
export class StuListRequestComponent implements OnInit {
  @Output() selectedStuRequest = new EventEmitter<number>();
  studentSubscriptionEmun = StudentSubscriptionEmun;
  selectedIndex: StudentSubscriptionEmun = StudentSubscriptionEmun.joinRequest;


  constructor() { }

  ngOnInit(): void {
  }

  studentRequestSelected(requestNum: StudentSubscriptionEmun) {
    this.selectedStuRequest.emit(requestNum);
  }
}
