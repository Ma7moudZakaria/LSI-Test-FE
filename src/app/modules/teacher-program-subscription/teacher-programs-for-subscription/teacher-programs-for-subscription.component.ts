import { Component, OnInit } from '@angular/core';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '../../../core/services/alertify-services/alertify.service';
import { IProgramsForTeacherSubscriptionsModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { IProgramsForTeachersSubscriptionsFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teachers-subscriptions-filter-request-model';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramSubscriptionUsersEnum } from '../../../core/enums/program-subscription-users-enum.enum';

@Component({
  selector: 'app-teacher-programs-for-subscription',
  templateUrl: './teacher-programs-for-subscription.component.html',
  styleUrls: ['./teacher-programs-for-subscription.component.scss']
})
export class TeacherProgramsComponent implements OnInit {
  programsForTeacherSubscriptionsLst: IProgramsForTeacherSubscriptionsModel[] | undefined;

  filterRequest: IProgramsForTeachersSubscriptionsFilterRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  totalCount = 0;
  errorMessage?: string;
  langEnum = LanguageEnum;
  teacherCard: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.teacher;

  constructor(
    public translate: TranslateService, private alertify: AlertifyService,
    private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,
  ) { }

  ngOnInit(): void {
    this.filterRequest.sortField = 'progName';
    this.getProgramsForTeachersSubscriptions()

  }



  getProgramsForTeachersSubscriptions() {
    this.teacherProgramSubscriptionServicesService.getProgramsForTeachersSubscriptions(this.filterRequest || {}).subscribe(res => {
      // var response = <BaseResponseModel>res;
      if (res.isSuccess) {
        // console.log("res", res);
        this.programsForTeacherSubscriptionsLst = res.data as IProgramsForTeacherSubscriptionsModel[];

        this.totalCount = res.count ? res.count : 0;

        if (this.filterRequest.skip > 0 && (!this.programsForTeacherSubscriptionsLst || this.programsForTeacherSubscriptionsLst.length === 0)) {
          this.filterRequest.page -= 1;
          this.filterRequest.skip = (this.filterRequest.page - 1) * this.filterRequest.take;
          this.getProgramsForTeachersSubscriptions();
        }

      }
      else {
        this.errorMessage = res.message;
      }
    },
      error => {
        console.log(error);
      });
  }


  filterRequestTeacher(event: IProgramsForTeachersSubscriptionsFilterRequestModel) {
    this.filterRequest = event;
    this.getProgramsForTeachersSubscriptions();
  }
  filterByText(searchKey: string) {
    this.filterRequest.progName = searchKey;
    this.getProgramsForTeachersSubscriptions();
  }
}
