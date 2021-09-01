import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProgramSubscriptionUsersEnum} from '../../../core/enums/program-subscription-users-enum.enum';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-admin-drop-out-request-for-teacher-tab-and-student-tab-grid',
  templateUrl: './admin-drop-out-request-for-teacher-tab-and-student-tab-grid.component.html',
  styleUrls: ['./admin-drop-out-request-for-teacher-tab-and-student-tab-grid.component.scss']
})
export class AdminDropOutRequestForTeacherTabAndStudentTabGridComponent implements OnInit {







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
