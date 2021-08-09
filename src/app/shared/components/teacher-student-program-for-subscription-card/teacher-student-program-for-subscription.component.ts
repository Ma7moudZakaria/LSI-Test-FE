import { Component, Input, OnInit } from '@angular/core';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '../../../core/services/alertify-services/alertify.service';
import { StudentProgramSubscriptionServicesService } from '../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import { IProgramsForTeacherSubscriptionsModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';

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
  ) { }

  ngOnInit(): void {

  }

  // getProgramsForStudentssSubscriptions() {
  //   this.studentProgramSubscriptionServicesService.getProgramsForStudentsSubscriptions(this.filterRequest || {}).subscribe(res => {
  //       if (res.isSuccess) {
  //         this.programsForStudentSubscriptionsList = res.data;


  //       }
  //       else {
  //         this.alertify.error(res.message || '');

  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }

  // filterByText(searchKey: string) {
  //   this.filterRequest.progName = searchKey;
  //   this.getProgramsForStudentssSubscriptions();
  // }

  // sortStudentByNameOrderType() {
  //   this.filterRequest.sortField = 'progName';
  //   this.filterRequest.sortOrder = 1;
  //   this.getProgramsForStudentssSubscriptions();

  // }

  // sortByStudentRequestDateAsend() {
  //   this.filterRequest.sortField = 'progcreation';
  //   this.filterRequest.sortOrder = 1
  //   this.getProgramsForStudentssSubscriptions();


  // }
  // sortByStudentRequestDateDesend() {
  //   this.filterRequest.sortField = 'progcreation';
  //   this.filterRequest.sortOrder = -1
  //   this.getProgramsForStudentssSubscriptions();


  // }
}
