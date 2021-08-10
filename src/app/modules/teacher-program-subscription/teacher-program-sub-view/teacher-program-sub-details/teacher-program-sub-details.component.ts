import { Component, OnInit } from '@angular/core';
import { IProgramsForTeacherSubscriptionsModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';

@Component({
  selector: 'app-teacher-program-sub-details',
  templateUrl: './teacher-program-sub-details.component.html',
  styleUrls: ['./teacher-program-sub-details.component.scss']
})
export class TeacherProgramSubDetailsComponent implements OnInit {
  ProgramSubscriptionId: string = "";
  errorMessage?: string;
  resMessage: BaseMessageModel = {};
  programsForSubscriptionsDetails: IProgramsForTeacherSubscriptionsModel[] | undefined;

  constructor(
    private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,

  ) { }

  ngOnInit(): void {
  }
  getSubscriptionProgramDetails() {
    this.teacherProgramSubscriptionServicesService.getSubscriptionProgramDetails(this.ProgramSubscriptionId).subscribe(
      res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {
          this.programsForSubscriptionsDetails = response.data;
        }
        else {
          this.resMessage = {
            message: response.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      }, error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
  }
}

