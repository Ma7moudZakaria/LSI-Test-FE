import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
// import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';

@Component({
  selector: 'app-admin-join-request-for-teacher-tab-and-student-tab-card',
  templateUrl: './admin-join-request-for-teacher-tab-and-student-tab-card.component.html',
  styleUrls: ['./admin-join-request-for-teacher-tab-and-student-tab-card.component.scss']
})
export class AdminJoinRequestForTeacherTabAndStudentTabCardComponent implements OnInit {


  @Input() userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;
  @Input() teacherSubscripModel: ITeacherProgramSubscriptionModel = { totalRows: 0 }
  @Input() studentSubscripModel: IStudentSubscriptionModel = { totalRows: 0 }

  userRoleMode = ProgramSubscriptionUsersEnum
  tabTypeSelected = StudentProgramSubscriptionStatusEnum;
  langEnum = LanguageEnum;


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    // console.log("studentSubscripModel", this.studentSubscripModel)
  }

}
