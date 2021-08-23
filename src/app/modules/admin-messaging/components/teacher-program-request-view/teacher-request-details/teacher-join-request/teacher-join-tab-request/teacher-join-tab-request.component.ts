import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { TeacherSystemSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum';
import { ITeacherSystemSubscriptionFilterRequest } from 'src/app/core/interfaces/teacher-interfaces/iteacher-system-subscription-filter-request';
import { ITeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/iteacher-systems-subscription';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { TeacherProfileService } from 'src/app/core/services/teacher-profile/teacher-profile.service';

@Component({
  selector: 'app-teacher-join-tab-request',
  templateUrl: './teacher-join-tab-request.component.html',
  styleUrls: ['./teacher-join-tab-request.component.scss']
})
export class TeacherJionTabRequestComponent implements OnInit {
 
  @Output() itemTeacherSystemSubscriptionReq = new EventEmitter<ITeacherSystemSubscription>();
  @Input() teacherSystemSubscriptionFilterRequestModel: ITeacherSystemSubscriptionFilterRequest = { statusNum: TeacherSystemSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }


  sendTeacherJoinId: string | undefined;
  typeEnum: TeacherSystemSubscriptionStatusEnum = TeacherSystemSubscriptionStatusEnum.Pending;
  showTap: TeacherSystemSubscriptionStatusEnum = TeacherSystemSubscriptionStatusEnum.Pending
  statusEnum = TeacherSystemSubscriptionStatusEnum;
  teacherSystemSubscription: ITeacherSystemSubscription[] = [];
  totalCount = 0;
  resMessage: BaseMessageModel = {};
  listOfIds: string[] | undefined;
   showUserDetailsView: boolean = false;

  constructor(
    private teacherService: TeacherProfileService,
    public languageService: LanguageService,
    public translate: TranslateService,
    private alertify: AlertifyService) { }

    ngOnInit(): void {
      this.teacherSystemSubscriptionFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';    
  
      this.setCurrentLang();
      this.onPendingChange()
    }
  sendTeacherJoinIDEvent(event:string){
    this.sendTeacherJoinId =event;
    this.showUserDetailsView = true;
  }
  hideUserDetailsView(event: boolean){
    this.showUserDetailsView = event;
  }
    setCurrentLang() {
      this.emitHeaderTitle();
      this.languageService.currentLanguageEvent.subscribe(res => {
        this.emitHeaderTitle();
      });
    }

    emitHeaderTitle() {
      this.languageService.headerPageNameEvent.emit(this.translate.instant('UPDATE_TEACHER_PG.TITLE'));
    }

    getTeacherSystemSubscription() {
      this.teacherService.getTeacherSystemSubscriptionAdvancedFilter(this.teacherSystemSubscriptionFilterRequestModel).subscribe(res => {
        if (res.isSuccess) {
          this.teacherSystemSubscription = res.data as Array<ITeacherSystemSubscription>; 

          this.totalCount = res.count ? res.count : 0;
          if (this.teacherSystemSubscriptionFilterRequestModel.skip > 0 && (!this.teacherSystemSubscription || this.teacherSystemSubscription.length === 0)) {
            this.teacherSystemSubscriptionFilterRequestModel.page -= 1;
            this.teacherSystemSubscriptionFilterRequestModel.skip = (this.teacherSystemSubscriptionFilterRequestModel.page - 1) * this.teacherSystemSubscriptionFilterRequestModel.take;
            this.getTeacherSystemSubscription();
          }
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
      });
    }

    rejecteTeacherSystemSubscriptionRequestMethod(event: ITeacherSystemSubscription) {
      this.itemTeacherSystemSubscriptionReq.emit(event)
      this.getTeacherSystemSubscription();
    }

    onPendingChange() {
      this.showTap = TeacherSystemSubscriptionStatusEnum.Pending
      this.teacherSystemSubscriptionFilterRequestModel.statusNum = TeacherSystemSubscriptionStatusEnum.Pending;
      this.getTeacherSystemSubscription();
    }

    onAcceptChange() {
      this.showTap = TeacherSystemSubscriptionStatusEnum.Accept
      this.teacherSystemSubscriptionFilterRequestModel.statusNum = TeacherSystemSubscriptionStatusEnum.Accept;
      this.getTeacherSystemSubscription();
    }

    onRejectedChange() {
      this.showTap = TeacherSystemSubscriptionStatusEnum.Rejected
      this.teacherSystemSubscriptionFilterRequestModel.statusNum = TeacherSystemSubscriptionStatusEnum.Rejected;
      this.getTeacherSystemSubscription();
    }

    rejecteTeacherSystemSubscription(event: ITeacherSystemSubscription) {
      this.itemTeacherSystemSubscriptionReq.emit(event)
      this.getTeacherSystemSubscription();
    }

    ids?: string[] = [];
    acceptTeacherSystemSubscription(teacherSystemModel: ITeacherSystemSubscription) {
      this.ids?.push(teacherSystemModel.id || '');
      this.teacherService.teacherSubscriptionsAcceptance(this.ids || []).subscribe(res => {
        if (res.isSuccess) {
          this.alertify.success(res.message || '');
          this.getTeacherSystemSubscription();

        }
        else {
          this.alertify.error(res.message || '');
        }
      },
        error => {
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        });
    }

    acceptAllTeacherSystemSubscriptionCheched() {
      this.ids = this.teacherSystemSubscription?.filter(i => i.checked).map(a => a.id || '')
      this.teacherService.teacherSubscriptionsAcceptance(this.ids).subscribe(res => {
        if (res.isSuccess) {
          this.alertify.success(res.message || '');
          this.getTeacherSystemSubscription();
        }
        else {
          this.alertify.error(res.message || '');
        }
      },
        error => {
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        });
    }

    teacherSystemSubscriptionPendingChangePage(event: ITeacherSystemSubscriptionFilterRequest) {
      this.teacherSystemSubscriptionFilterRequestModel.statusNum = TeacherSystemSubscriptionStatusEnum.Pending;
      this.teacherSystemSubscriptionFilterRequestModel = event;
      this.getTeacherSystemSubscription();
    }

    teacherSystemSubscriptionAcceptChangePage(event: ITeacherSystemSubscriptionFilterRequest) {
      this.teacherSystemSubscriptionFilterRequestModel.statusNum = TeacherSystemSubscriptionStatusEnum.Accept;
      this.teacherSystemSubscriptionFilterRequestModel = event;
      this.getTeacherSystemSubscription();
    }

    teacherSystemSubscriptionRejectedChangePage(event: ITeacherSystemSubscriptionFilterRequest) {
      this.teacherSystemSubscriptionFilterRequestModel.statusNum = TeacherSystemSubscriptionStatusEnum.Rejected;
      this.teacherSystemSubscriptionFilterRequestModel = event;
      this.getTeacherSystemSubscription();
    }

    filterByText(searchKey: string) {
      this.teacherSystemSubscriptionFilterRequestModel.name = searchKey;
      this.getTeacherSystemSubscription();
    }
}
