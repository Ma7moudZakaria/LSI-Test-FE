import { Component, OnInit } from '@angular/core';
import { BaseMessageModel } from '../../../../core/ng-model/base-message-model';
import { IProgramsForTeacherSubscriptionsModel } from '../../../../core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { TeacherProgramSubscriptionServicesService } from '../../../../core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { BaseConstantModel } from '../../../../core/ng-model/base-constant-model';

import { ActivatedRoute } from '@angular/router';
import { IProgramSubscriptionDetails } from '../../../../core/interfaces/teacher-program-subscription-interfaces/iprogram-subscription-details';
import { ITeacherSubmitSubscriptinoModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-submit-subscriptino-model';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
@Component({
  selector: 'app-student-program-sub-details',
  templateUrl: './student-program-sub-details.component.html',
  styleUrls: ['./student-program-sub-details.component.scss']
})
export class StudentProgramSubDetailsComponent implements OnInit {
  submitSubscritionModel = {} as ITeacherSubmitSubscriptinoModel;
  disabledCheck: boolean = true
  currentUser: Iuser | undefined;
  ProgramSubscriptionId: string = "";
  errorMessage?: string;
  resMessage: BaseMessageModel = {};
  programsForSubscriptionsDetails: IProgramSubscriptionDetails | undefined;


  constructor(
    private TeacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.ProgramSubscriptionId = params['id']);
    this.getSubscriptionProgramDetails();
  }
  getSubscriptionProgramDetails() {
    this.TeacherProgramSubscriptionServicesService.getSubscriptionProgramDetails(this.ProgramSubscriptionId).subscribe(
      res => {

        if (res.isSuccess) {
          this.programsForSubscriptionsDetails = res.data;
          console.log('this.programsForSubscriptionsDetails', this.programsForSubscriptionsDetails);
        }
        else {
          this.resMessage = {
            message: res.message,
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

  checkConditions(event: any) {

    if (event.checked) {
      this.disabledCheck = false
    }
    else {
      this.disabledCheck = true

    }


  }

}

