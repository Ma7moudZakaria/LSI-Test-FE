import { Component, OnInit } from '@angular/core';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';

@Component({
  selector: 'app-teacher-join-program-tab-request',
  templateUrl: './teacher-join-program-tab-request.component.html',
  styleUrls: ['./teacher-join-program-tab-request.component.scss']
})
export class TeacherJionProgramTabRequestComponent implements OnInit {

  teacherProgramSubscriptionList: ITeacherProgramSubscriptionModel[] | undefined;
  teacherProgramSubscriptionFilterRequestModel: ITeacherProgramSubscriptionFilterRequestModel = { skip: 0, take: 12, sortField: '', sortOrder: 1, statusNum: 1 };
  errorMessage?: string;
  totalCount = 0;
  adminCard: ScientificProblemUsersEnum = ScientificProblemUsersEnum.Admin;
  numberItemsPerRow = 4;
  scientificProblemFilter: IScientificProblemFilter = { skip: 0, take: 12, sorField: '', ordType: 1, page: 1 };

  constructor(private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService) { }

  ngOnInit(): void {
    this.getTeachersProgramsSubscriptions();
  }
  searchByText(searchKey: string) {
    this.teacherProgramSubscriptionFilterRequestModel.usrName = searchKey;
    this.getTeachersProgramsSubscriptions();
  }

  getTeachersProgramsSubscriptions() {
    this.teacherProgramSubscriptionServicesService.getTeachersProgramsSubscriptionsFilter(this.teacherProgramSubscriptionFilterRequestModel || {}).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.teacherProgramSubscriptionList = res.data as ITeacherProgramSubscriptionFilterRequestModel[];
        this.totalCount = this.teacherProgramSubscriptionList[0].totalRows || 0;
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
