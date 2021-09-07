import {Component, Input, OnInit} from '@angular/core';
import {ProgramSubscriptionUsersEnum} from '../../../core/enums/program-subscription-users-enum.enum';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-admin-join-request-for-teacher-tab-and-student-tab-grid',
  templateUrl: './admin-join-request-for-teacher-tab-and-student-tab-grid.component.html',
  styleUrls: ['./admin-join-request-for-teacher-tab-and-student-tab-grid.component.scss']
})
export class AdminJoinRequestForTeacherTabAndStudentTabGridComponent implements OnInit {








  @Input() userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.teacher;
  @Input() numberPerRow: number = 3;
  @Input() totalCount: number = 0;

  programSubscriptionUsers = ProgramSubscriptionUsersEnum;
  page = 1;
  studentItems= [0,1,2,3,4,5,6,7,8,9];
  teacherItems= [0,1,2,3,4,5,6,7,8,9];
  constructor(
    public translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
  }

  onTeacherPageChange() {

  }
  onStudentPageChange() {


  }

}
