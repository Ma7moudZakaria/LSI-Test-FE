import { Component, OnInit } from '@angular/core';
import {LanguageEnum} from '../../../core/enums/language-enum.enum';
import {TranslateService} from '@ngx-translate/core';
import {BaseResponseModel} from '../../../core/ng-model/base-response-model';
import {IProgramsForStudentsSubscriptionsFilterRequestModel} from '../../../core/interfaces/student-program-subscription-interfaces/iprograms-for-students-subscriptions-filter-request-model';
import {IProgramsForStudentSubscriptionsModel} from '../../../core/interfaces/student-program-subscription-interfaces/iprograms-for-student-subscriptions-model';
import {StudentProgramSubscriptionServicesService} from '../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import {AlertifyService} from '../../../core/services/alertify-services/alertify.service';
import {ProgramSubscriptionUsersEnum} from '../../../core/enums/program-subscription-users-enum.enum';

@Component({
  selector: 'app-student-programs',
  templateUrl: './student-programs.component.html',
  styleUrls: ['./student-programs.component.scss']
})
export class StudentProgramsComponent implements OnInit {

  programsForStudentSubscriptionsLst: IProgramsForStudentSubscriptionsModel[] | undefined;

  // @ts-ignore
  filterRequest: IProgramsForStudentsSubscriptionsFilterRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  totalCount = 0;
  errorMessage?: string;
  langEnum = LanguageEnum;
  studentCard: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;

  constructor(
    public translate: TranslateService, private alertify: AlertifyService,
    private StudentProgramSubscriptionServicesService: StudentProgramSubscriptionServicesService,
  ) { }

  ngOnInit(): void {
    console.log("student_studentCard")
    this.filterRequest.sortField = 'progName';
    this.getProgramsForStudentsSubscriptions()

  }



  getProgramsForStudentsSubscriptions() {
    this.StudentProgramSubscriptionServicesService.getProgramsForStudentsSubscriptions(this.filterRequest || {}).subscribe(res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {
          this.programsForStudentSubscriptionsLst = response.data as IProgramsForStudentSubscriptionsModel[];
          console.log("programsForStudentSubscriptionsLst ", this.programsForStudentSubscriptionsLst)

        }
        else {
          this.errorMessage = res.message;
        }
      },
      error => {
        console.log(error);
      });
  }

}
