import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
// import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';

@Component({
  selector: 'app-admin-join-request-for-teacher-tab-and-student-tab-card',
  templateUrl: './admin-join-request-for-teacher-tab-and-student-tab-card.component.html',
  styleUrls: ['./admin-join-request-for-teacher-tab-and-student-tab-card.component.scss']
})
export class AdminJoinRequestForTeacherTabAndStudentTabCardComponent implements OnInit {

  @Output() rejecteStuRequest = new EventEmitter<IStudentSubscriptionModel>();
  @Output() acceptStuRequest = new EventEmitter<IStudentSubscriptionModel>();
  @Output() studentProgSubOutput = new EventEmitter<ITeacherStudentViewModel>();
  @Output() updateAllItemsChecked = new EventEmitter<boolean>();
  @Input() userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;
  userRoleMode = ProgramSubscriptionUsersEnum
  @Input() typeEnum: StudentProgramSubscriptionStatusEnum = StudentProgramSubscriptionStatusEnum.Pending;
  tabTypeSelected = StudentProgramSubscriptionStatusEnum;
  langEnum = LanguageEnum;

  @Input() studentSubscripModel: IStudentSubscriptionModel = { totalRows: 0 }

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    console.log("studentSubscripModel", this.studentSubscripModel)
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
