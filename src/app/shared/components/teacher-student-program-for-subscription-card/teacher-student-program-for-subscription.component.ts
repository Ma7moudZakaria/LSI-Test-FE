import { Component, OnInit } from '@angular/core';
import {IProgramsForStudentSubscriptionsModel} from '../../../core/interfaces/student-program-subscription-interfaces/iprograms-for-student-subscriptions-model';
import {IProgramsForStudentsSubscriptionsFilterRequestModel} from '../../../core/interfaces/student-program-subscription-interfaces/iprograms-for-students-subscriptions-filter-request-model';
import {LanguageEnum} from '../../../core/enums/language-enum.enum';
import {TranslateService} from '@ngx-translate/core';
import {AlertifyService} from '../../../core/services/alertify-services/alertify.service';
import {StudentProgramSubscriptionServicesService} from '../../../core/services/student-program-subscription-services/student-program-subscription-services.service';

@Component({
  selector: 'app-teacher-student-program-for-subscription',
  templateUrl: './teacher-student-program-for-subscription.component.html',
  styleUrls: ['./teacher-student-program-for-subscription.component.scss']
})
export class TeacherStudentProgramForSubscriptionComponent implements OnInit {

  programsForStudentSubscriptionsList: IProgramsForStudentSubscriptionsModel[] | undefined;
  filterRequest: IProgramsForStudentsSubscriptionsFilterRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1 }

  errorMessage?: string;
  langEnum = LanguageEnum;

  constructor(
    public translate: TranslateService, private alertify: AlertifyService,
    private studentProgramSubscriptionServicesService: StudentProgramSubscriptionServicesService,
  ) { }

  ngOnInit(): void {
    this.getProgramsForStudentssSubscriptions()
  }

  getProgramsForStudentssSubscriptions() {
    this.studentProgramSubscriptionServicesService.getProgramsForStudentsSubscriptions(this.filterRequest || {}).subscribe(res => {
        // var response = <BaseResponseModel>res;
        if (res.isSuccess) {
          this.programsForStudentSubscriptionsList = res.data;
          // this.programsForStudentSubscriptionsList = res.data as IProgramsForStudentSubscriptionsModel[];


        }
        else {
          this.alertify.error(res.message || '');

        }
      },
      error => {
        console.log(error);
      });
  }

  filterByText(searchKey: string) {
    this.filterRequest.progName = searchKey;
    this.getProgramsForStudentssSubscriptions();
  }

  sortStudentByNameOrderType() {
    this.filterRequest.sortField = 'progName';
    this.filterRequest.sortOrder = 1;
    this.getProgramsForStudentssSubscriptions();

  }

  sortByStudentRequestDateAsend() {
    this.filterRequest.sortField = 'progcreation';
    this.filterRequest.sortOrder = 1
    this.getProgramsForStudentssSubscriptions();


  }
  sortByStudentRequestDateDesend() {
    this.filterRequest.sortField = 'progcreation';
    this.filterRequest.sortOrder = -1
    this.getProgramsForStudentssSubscriptions();


  }
}
