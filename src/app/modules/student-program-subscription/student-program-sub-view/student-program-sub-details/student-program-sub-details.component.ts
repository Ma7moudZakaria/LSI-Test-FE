import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseMessageModel } from '../../../../core/ng-model/base-message-model';
import { IProgramsForTeacherSubscriptionsModel } from '../../../../core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { TeacherProgramSubscriptionServicesService } from '../../../../core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { BaseConstantModel } from '../../../../core/ng-model/base-constant-model';

import { ActivatedRoute, Data } from '@angular/router';
import { IProgramSubscriptionDetails } from '../../../../core/interfaces/teacher-program-subscription-interfaces/iprogram-subscription-details';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
import { IPredefinedCondtionSubscriptionModel, IStudentSubscriptionPredefinedConditionResponse } from 'src/app/core/interfaces/student-program-subscription-interfaces/ipredefined-condtion-subscription-model';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
@Component({
  selector: 'app-student-program-sub-details',
  templateUrl: './student-program-sub-details.component.html',
  styleUrls: ['./student-program-sub-details.component.scss']
})
export class StudentProgramSubDetailsComponent implements OnInit {
  predefinedCondtionSubscriptionModel: IPredefinedCondtionSubscriptionModel | undefined//= {} as IPredefinedCondtionSubscriptionModel
  studSubsPredCondRes: IStudentSubscriptionPredefinedConditionResponse | undefined;
  @Output() ShowVerifyProgramPredefinedConditionOverlay = new EventEmitter<IStudentSubscriptionPredefinedConditionResponse>();
  @Output() ShowCustomConditionOverlay = new EventEmitter<IProgramSubscriptionDetails>();

  disabledCheck: boolean = true
  currentUser: Iuser | undefined;
  ProgramSubscriptionId: string = "";
  errorMessage?: string;
  resMessage: BaseMessageModel = {};
  programsForSubscriptionsDetails: IProgramSubscriptionDetails | undefined;
  langEnum = LanguageEnum;
  constructor(
    private studentProgramSubscriptionServicesService: StudentProgramSubscriptionServicesService,
    private ProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public translate: TranslateService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.ProgramSubscriptionId = params['id']);
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}') as Iuser;

    this.getSubscriptionProgramDetails();
  }
  getSubscriptionProgramDetails() {
    this.ProgramSubscriptionServicesService.getSubscriptionProgramDetails(this.ProgramSubscriptionId).subscribe(
      res => {

        if (res.isSuccess) {
          this.programsForSubscriptionsDetails = res.data;
          // console.log('this.programsForSubscriptionsDetails', this.programsForSubscriptionsDetails);
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
  verifyProgramPredefinedCondition() {
    this.predefinedCondtionSubscriptionModel = {
      usrId: this.currentUser?.id || '',
      progId: this.programsForSubscriptionsDetails?.id || '',
      batId: this.programsForSubscriptionsDetails?.batId || '',
    }

    this.studentProgramSubscriptionServicesService.verifyProgramPredefinedCondition(this.predefinedCondtionSubscriptionModel).subscribe(
      res => {
        if (res.isSuccess) {

          // console.log("res", res.data)
          // this.alertify.success(res.message || '');
          this.ShowCustomConditionOverlay.emit(this.programsForSubscriptionsDetails);
        }
        else {
          this.ShowVerifyProgramPredefinedConditionOverlay.emit(res.data as IStudentSubscriptionPredefinedConditionResponse);
          // this.resMessage = {
          //   message: res.message,
          //   type: BaseConstantModel.DANGER_TYPE
          // }

        }
      }, error => {

        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
        console.log("res", this.resMessage.message)

      })
  }

}

