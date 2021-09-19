import { Component, OnInit } from '@angular/core';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '../../../core/services/alertify-services/alertify.service';
import { IProgramsForTeacherSubscriptionsModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teacher-subscriptions-model';
import { IProgramsForTeachersSubscriptionsFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprograms-for-teachers-subscriptions-filter-request-model';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramSubscriptionUsersEnum } from '../../../core/enums/program-subscription-users-enum.enum';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-teacher-programs-for-subscription',
  templateUrl: './teacher-programs-for-subscription.component.html',
  styleUrls: ['./teacher-programs-for-subscription.component.scss']
})
export class TeacherProgramsComponent implements OnInit {
  programsForTeacherSubscriptionsLst: IProgramsForTeacherSubscriptionsModel[] | undefined;

  filterRequest: IProgramsForTeachersSubscriptionsFilterRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  totalCount = 0;
  // errorMessage?: string;
  resultMessage: BaseMessageModel = {};

  langEnum = LanguageEnum;
  teacherCard: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.teacher;
  currentUser:IUser | undefined

  constructor(
    public translate: TranslateService, private alertify: AlertifyService,
    private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.filterRequest.sortField = 'progName';
    this.filterRequest.usrId = this.currentUser?.id;

    this.getProgramsForTeachersSubscriptions();
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });

  }

  emitHeaderTitle() {
    this.languageService.headerPageNameEvent.emit(this.translate.instant('SIDENAVBAR.PROG_FOR_SUBSCRIPTION'));
  }

  getProgramsForTeachersSubscriptions() {
    this.teacherProgramSubscriptionServicesService.getProgramsForTeachersSubscriptions(this.filterRequest || {}).subscribe(res => {
      if (res.isSuccess) {
        this.programsForTeacherSubscriptionsLst = res.data as IProgramsForTeacherSubscriptionsModel[];

        this.totalCount = res.count ? res.count : 0;

        if (this.filterRequest.skip > 0 && (!this.programsForTeacherSubscriptionsLst || this.programsForTeacherSubscriptionsLst.length === 0)) {
          this.filterRequest.page -= 1;
          this.filterRequest.skip = (this.filterRequest.page - 1) * this.filterRequest.take;
          this.getProgramsForTeachersSubscriptions();
        }

      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
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
