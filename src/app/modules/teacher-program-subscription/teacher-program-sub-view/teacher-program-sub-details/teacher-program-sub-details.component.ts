import { Iuser } from './../../../../core/interfaces/user-interfaces/iuser';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProgramSubscriptionDetails } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprogram-subscription-details';
import { IProgramsForTeacherSubscriptionsModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { ITeacherSubmitSubscriptinoModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-submit-subscriptino-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { IProgramSubscriptionDetailsRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-subscription-details-request';

@Component({
  selector: 'app-teacher-program-sub-details',
  templateUrl: './teacher-program-sub-details.component.html',
  styleUrls: ['./teacher-program-sub-details.component.scss']
})
export class TeacherProgramSubDetailsComponent implements OnInit {

  @Output() ShowSubscription = new EventEmitter<boolean>();
  programId: string = "";
  batchId:string ='';
  errorMessage?: string;
  resMessage: BaseMessageModel = {};
  programsForSubscriptionsDetails: IProgramSubscriptionDetails | undefined;
  submitSubscritionModel = {} as ITeacherSubmitSubscriptinoModel;
  disabledCheck: boolean = true;
  currentUser: Iuser | undefined;

  constructor(
    private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,
    private route: ActivatedRoute, private alertify: AlertifyService,
    private progService:ProgramService
  ) { }

  ngOnInit(): void {
    this.programId = this.route.snapshot.params.id;
    this.programId = this.route.snapshot.params.batch;
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}') as Iuser;
    this.getSubscriptionProgramDetails()
  }
  getSubscriptionProgramDetails() {
    let model : IProgramSubscriptionDetailsRequest  = {
      batchId:this.batchId,
      programId:this.programId
    }
    this.progService.getSubscriptionProgramDetails(model).subscribe(
      res => {
        if (res.isSuccess) {
          this.programsForSubscriptionsDetails = res.data as IProgramSubscriptionDetails;
          // console.log("programsForSubscriptionsDetails" + this.programsForSubscriptionsDetails)
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

  submetSubscriptionProgramDetails() {


    this.submitSubscritionModel.batId = this.programsForSubscriptionsDetails?.batId || '';
    this.submitSubscritionModel.usrId = this.currentUser?.id || '';


    this.teacherProgramSubscriptionServicesService.submitTeacherSubscription(this.submitSubscritionModel).subscribe(
      res => {
        if (res.isSuccess) {
          this.ShowSubscription.emit(true);

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

