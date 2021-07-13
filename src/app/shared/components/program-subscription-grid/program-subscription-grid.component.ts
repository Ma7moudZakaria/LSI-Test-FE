import { Component, Input, OnInit } from '@angular/core';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { IStudentSubscriptionFilterModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-model';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { ITeacherProgramSubscriptionFilterModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';

@Component({
  selector: 'app-program-subscription-grid',
  templateUrl: './program-subscription-grid.component.html',
  styleUrls: ['./program-subscription-grid.component.scss']
})
export class ProgramSubscriptionGridComponent implements OnInit {

  @Input() userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;
  @Input() studentFilterRequestModel: IStudentSubscriptionFilterRequestModel = {skip : 0, take : 12, sortField : '', sortOrder: 1, statusNum : 1};
  @Input() teacherFilterRequestModel: ITeacherProgramSubscriptionFilterRequestModel = {skip : 0, take : 12, sortField : '', sortOrder: 1, statusNum : 1};
  @Input() numberPerRow: number = 3;
  @Input() teacherItems: ITeacherProgramSubscriptionFilterModel[] = []
  @Input() studentItems: IStudentSubscriptionFilterModel[] = []
  @Input() totalCount: number = 0;

  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  allSelected: boolean = false;
  programSubscriptionUsers = ProgramSubscriptionUsersEnum
   page = 1

  constructor() { }

  ngOnInit(): void {
  }

}
