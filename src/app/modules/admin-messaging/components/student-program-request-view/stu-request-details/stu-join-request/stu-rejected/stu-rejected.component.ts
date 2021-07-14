import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';

@Component({
  selector: 'app-stu-rejected',
  templateUrl: './stu-rejected.component.html',
  styleUrls: ['./stu-rejected.component.scss']
})
export class StuRejectedComponent implements OnInit {
  @Output() closeRejectedRequest = new EventEmitter<IStudentSubscriptionModel>();

  @Input() itemStuReq: IStudentSubscriptionModel = {}
  constructor() { }

  ngOnInit(): void {
  }
  saveRejectRequest() { }


  closeRejectRequest() {
    this.closeRejectedRequest.emit();

  }
}
