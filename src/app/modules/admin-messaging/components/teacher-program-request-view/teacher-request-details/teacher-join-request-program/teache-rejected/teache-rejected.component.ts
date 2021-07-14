import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';

@Component({
  selector: 'app-teache-rejected',
  templateUrl: './teache-rejected.component.html',
  styleUrls: ['./teache-rejected.component.scss']
})
export class TeacheRejectedComponent implements OnInit {

  @Output() closeRejectedRequest = new EventEmitter<ITeacherProgramSubscriptionModel>();
  @Input() itemTeacheReq: ITeacherProgramSubscriptionModel= {totalRows:0}

  constructor() { }

  ngOnInit(): void {
  }
  saveRejectRequest() { }


  closeRejectRequest() {
    this.closeRejectedRequest.emit();

  }

}
