import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '../../../core/services/alertify-services/alertify.service';
import { StudentProgramSubscriptionServicesService } from '../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import { IProgramsForTeacherSubscriptionsModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { Router } from '@angular/router';
import { IProgramsForStudentSubscriptionsModel } from '../../../core/interfaces/student-program-subscription-interfaces/iprograms-for-student-subscriptions-model';
import { ProgramSubscriptionUsersEnum } from '../../../core/enums/program-subscription-users-enum.enum';

@Component({
  selector: 'app-teacher-student-program-for-subscription',
  templateUrl: './teacher-student-program-for-subscription.component.html',
  styleUrls: ['./teacher-student-program-for-subscription.component.scss']
})
export class TeacherStudentProgramForSubscriptionComponent implements OnInit {

  @Output() teacher_subscription_id = new EventEmitter<string>();

  @Input() teachersubscriptionmodel: IProgramsForTeacherSubscriptionsModel = { totals: 0 }
  @Input() studentsubscriptionmodel: IProgramsForStudentSubscriptionsModel = { totals: 0 }
  @Input() userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;
  programSubscriptionUsers = ProgramSubscriptionUsersEnum;
  langEnum = LanguageEnum;


  // @Input() studentSubscripModel: IStudentSubscriptionModel = { totalRows: 0 }
  errorMessage?: string;

  constructor(
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {

  }
  gotoDetails(event?: string, batId?:string) {

    this.router.navigateByUrl('teacher-for-subscription/teacher_pro_sub_deatils/' + event + '/' + batId);
    this.teacher_subscription_id.emit(event)

  }
  gotoDetailsStudent(event?: string, batId?:string) {

    this.router.navigateByUrl('student-for-subscription/student_pro_sub_deatils/' + event + '/' + batId);


  }
}
