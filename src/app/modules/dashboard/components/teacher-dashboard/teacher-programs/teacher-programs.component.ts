import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramsForTeacherSubscriptionsModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { IProgramsForTeachersSubscriptionsFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teachers-subscriptions-filter-request-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';

@Component({
  selector: 'app-teacher-programs',
  templateUrl: './teacher-programs.component.html',
  styleUrls: ['./teacher-programs.component.scss']
})
export class TeacherProgramsComponent implements OnInit {

  programsForTeachersSubscriptionsFilterRequestModel: IProgramsForTeachersSubscriptionsFilterRequestModel | undefined;
  programsForTeacherSubscriptionsLst: IProgramsForTeacherSubscriptionsModel[] | undefined;
  errorMessage?: string;
  langEnum = LanguageEnum;
  constructor(
    public translate: TranslateService,
    private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,
  ) { }

  ngOnInit(): void {
    this.getProgramsForTeacherssSubscriptions();
  }

  getProgramsForTeacherssSubscriptions() {
    this.teacherProgramSubscriptionServicesService.getProgramsForTeacherssSubscriptions(this.programsForTeachersSubscriptionsFilterRequestModel || {}).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.programsForTeacherSubscriptionsLst = res.data as IProgramsForTeacherSubscriptionsModel[];
      }
      else {
        this.errorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      });
  }

}
