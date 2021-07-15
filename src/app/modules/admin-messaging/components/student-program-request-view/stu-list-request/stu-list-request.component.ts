import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentSubscriptionEmuns } from 'src/app/core/enums/programs/stu-subscription-enum/student-subscription-emuns.enum';

@Component({
  selector: 'app-stu-list-request',
  templateUrl: './stu-list-request.component.html',
  styleUrls: ['./stu-list-request.component.scss']
})
export class StuListRequestComponent implements OnInit {
  @Output() selectedStuRequest = new EventEmitter<number>();
  studentSubscriptionEmun = StudentSubscriptionEmuns;
  selectedIndex: number = 1;


  constructor() { }

  ngOnInit(): void {
  }

  studentRequestSelected(requestNum: number) {
    this.selectedStuRequest.emit(requestNum);
  }
}
