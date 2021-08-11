import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProgramSubscriptionDetails } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprogram-subscription-details';
import { IProgramsForTeacherSubscriptionsModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';

@Component({
  selector: 'app-teacher-program-sub-details',
  templateUrl: './teacher-program-sub-details.component.html',
  styleUrls: ['./teacher-program-sub-details.component.scss']
})
export class TeacherProgramSubDetailsComponent implements OnInit {
  programSubscriptionId: string = "";
  errorMessage?: string;
  resMessage: BaseMessageModel = {};
  programsForSubscriptionsDetails: IProgramSubscriptionDetails | undefined;
  // test
  constructor(
    private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.programSubscriptionId = this.route.snapshot.params.id
    this.getSubscriptionProgramDetails()
  }
  getSubscriptionProgramDetails() {
    this.teacherProgramSubscriptionServicesService.getSubscriptionProgramDetails(this.programSubscriptionId).subscribe(
      res => {
        if (res.isSuccess) {
          this.programsForSubscriptionsDetails = res.data as IProgramSubscriptionDetails;
          console.log("programsForSubscriptionsDetails" + this.programsForSubscriptionsDetails)
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
}

