import { Component, Input, OnInit } from '@angular/core';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '../../../core/services/alertify-services/alertify.service';
import { StudentProgramSubscriptionServicesService } from '../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import { IProgramsForTeacherSubscriptionsModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-student-program-for-subscription',
  templateUrl: './teacher-student-program-for-subscription.component.html',
  styleUrls: ['./teacher-student-program-for-subscription.component.scss']
})
export class TeacherStudentProgramForSubscriptionComponent implements OnInit {


  @Input() teachersubscriptionmodel: IProgramsForTeacherSubscriptionsModel = { totals: 0 }
  // @Input() studentSubscripModel: IStudentSubscriptionModel = { totalRows: 0 }
  errorMessage?: string;
  langEnum = LanguageEnum;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  gotoDetails(event?: string) {

    this.router.navigateByUrl('teacher-for-subscription/teacher_pro_sub_deatils/' + event);


  }
}
