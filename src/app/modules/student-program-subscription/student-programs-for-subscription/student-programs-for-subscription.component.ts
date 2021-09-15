import { Component, OnInit } from '@angular/core';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { BaseResponseModel } from '../../../core/ng-model/base-response-model';
import { IProgramsForStudentsSubscriptionsFilterRequestModel } from '../../../core/interfaces/student-program-subscription-interfaces/iprograms-for-students-subscriptions-filter-request-model';
import { IProgramsForStudentSubscriptionsModel } from '../../../core/interfaces/student-program-subscription-interfaces/iprograms-for-student-subscriptions-model';
import { StudentProgramSubscriptionServicesService } from '../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import { AlertifyService } from '../../../core/services/alertify-services/alertify.service';
import { ProgramSubscriptionUsersEnum } from '../../../core/enums/program-subscription-users-enum.enum';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-student-programs-for-subscription',
  templateUrl: './student-programs-for-subscription.component.html',
  styleUrls: ['./student-programs-for-subscription.component.scss']
})
export class StudentProgramsForSubscriptionComponent implements OnInit {

  programsForStudentSubscriptionsLst: IProgramsForStudentSubscriptionsModel[] | undefined;

  filterRequest: IProgramsForStudentsSubscriptionsFilterRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  totalCount = 0;
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;
  studentCard: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;
  currentUser:Iuser | undefined;

  constructor(
    public translate: TranslateService, private alertify: AlertifyService,
    private StudentProgramSubscriptionServicesService: StudentProgramSubscriptionServicesService,
    private languageService: LanguageService) { }

  ngOnInit(): void {
   
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    // console.log("student_studentCard")
    this.filterRequest.sortField = 'progName';
    this.filterRequest.usrId = this.currentUser?.id;
    this.getProgramsForStudentsSubscriptions();
    this.setCurrentLang();
    

    

  }
 
    




  getProgramsForStudentsSubscriptions() {
    this.StudentProgramSubscriptionServicesService.getProgramsForStudentsSubscriptions(this.filterRequest || {}).subscribe(res => {
      if (res.isSuccess) {
        this.programsForStudentSubscriptionsLst = res.data as IProgramsForStudentSubscriptionsModel[];
        this.totalCount = res.count ? res.count : 0;

        if (this.filterRequest.skip > 0 && (!this.programsForStudentSubscriptionsLst || this.programsForStudentSubscriptionsLst.length === 0)) {
          this.filterRequest.page -= 1;
          this.filterRequest.skip = (this.filterRequest.page - 1) * this.filterRequest.take;
          // @ts-ignore
          this.programsForStudentSubscriptionsLst();
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
  filterRequestTeacher(event: IProgramsForStudentsSubscriptionsFilterRequestModel) {
    this.filterRequest = event;
    this.getProgramsForStudentsSubscriptions();
  }
  
  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('SIDENAVBAR.PROG_FOR_SUBSCRIPTION'));
  }

}
