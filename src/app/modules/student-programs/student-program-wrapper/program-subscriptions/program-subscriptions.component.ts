import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IProgramsForStudentSubscriptionsModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/iprograms-for-student-subscriptions-model';
import { IProgramsForStudentsSubscriptionsFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/iprograms-for-students-subscriptions-filter-request-model';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-program-subscriptions',
  templateUrl: './program-subscriptions.component.html',
  styleUrls: ['./program-subscriptions.component.scss']
})
export class ProgramSubscriptionsComponent implements OnInit {
  programsForStudentSubscriptionsFilterRequestModel: IProgramsForStudentsSubscriptionsFilterRequestModel | undefined;
  programsForStudentSubscriptionsList: IProgramsForStudentSubscriptionsModel[] | undefined;
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
    this.studentProgramSubscriptionServicesService.getProgramsForStudentsSubscriptions(this.programsForStudentSubscriptionsFilterRequestModel || {}).subscribe(res => {
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

}
