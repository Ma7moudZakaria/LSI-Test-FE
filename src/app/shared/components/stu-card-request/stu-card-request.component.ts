import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';

@Component({
  selector: 'app-stu-card-request',
  templateUrl: './stu-card-request.component.html',
  styleUrls: ['./stu-card-request.component.scss']
})
export class StuCardRequestComponent implements OnInit {
  @Output() rejecteStuRequest = new EventEmitter<IStudentSubscriptionModel>();
  @Output() acceptStuRequest = new EventEmitter<IStudentSubscriptionModel>();

  @Input() typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;
  tabTypeSelected = StudentProgramSubscriptionStatusEnum;
  langEnum = LanguageEnum;

  @Input() studentSubscripModel: IStudentSubscriptionModel = { totalRows: 0 }

  constructor(public translate : TranslateService) { }

  ngOnInit(): void {
  }


  rejectedStudentReq() {
    this.rejecteStuRequest.emit(this.studentSubscripModel)
  }
  acceptStudentReq() {
    this.acceptStuRequest.emit(this.studentSubscripModel);
  }
}
