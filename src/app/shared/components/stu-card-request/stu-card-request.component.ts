import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { TeacheProgramSubscriptionStatusEnum } from 'src/app/core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-stu-card-request',
  templateUrl: './stu-card-request.component.html',
  styleUrls: ['./stu-card-request.component.scss']
})
export class StuCardRequestComponent implements OnInit {
  @Output() rejecteStuRequest = new EventEmitter<IStudentSubscriptionModel>();
  @Output() acceptStuRequest = new EventEmitter<IStudentSubscriptionModel>();
  @Output() studentProgSubOutput = new EventEmitter<ITeacherStudentViewModel>();
  @Output() updateAllItemsChecked = new EventEmitter<boolean>();

  @Input() typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;
  tabTypeSelected = StudentProgramSubscriptionStatusEnum;
  langEnum = LanguageEnum;
  // studentStatus = TeacherDropOutRequestStatusEnum;
  @Input() studentSubscripModel: IStudentSubscriptionModel = { totalRows: 0 }

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }
  studentJoinId(id?: string, JoinprogName?: string) {
    let UserModel: ITeacherStudentViewModel = { progName: JoinprogName, usrId: id };
    this.studentProgSubOutput.emit(UserModel);
  }

  rejectedStudentReq() {
    this.rejecteStuRequest.emit(this.studentSubscripModel)
  }
  acceptStudentReq() {
    this.acceptStuRequest.emit(this.studentSubscripModel);
  }
  updateAllItemsCheckedCall() {
    this.updateAllItemsChecked.emit();
  }
}
