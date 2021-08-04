import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { TeacherSystemSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum';
import { ITeacherSystemSubscriptionFilterRequest } from 'src/app/core/interfaces/teacher-interfaces/iteacher-system-subscription-filter-request';
import { ITeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/iteacher-systems-subscription';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { TeacherProfileService } from 'src/app/core/services/teacher-profile/teacher-profile.service';
import { TeacherSystemCardRequestComponent } from 'src/app/shared/components/teacher-system-card-request/teacher-system-card-request.component';

@Component({
  selector: 'app-teacher-join-tab-request',
  templateUrl: './teacher-join-tab-request.component.html',
  styleUrls: ['./teacher-join-tab-request.component.scss']
})
export class TeacherJionTabRequestComponent implements OnInit {
 
  @Output() itemTeacherSystemSubscriptionReq = new EventEmitter<ITeacherSystemSubscription>();
  @Output() openAdvancedSearch = new EventEmitter<ITeacherSystemSubscriptionFilterRequest>();

  @Output() closeAdvancedSearch = new EventEmitter<ITeacherSystemSubscriptionFilterRequest>();

  @Output() advancedSearchObject = new EventEmitter<ITeacherSystemSubscriptionFilterRequest>();
  @Input() teacherSystemSubscriptionFilterRequestModel: ITeacherSystemSubscriptionFilterRequest = { statusNum: TeacherSystemSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }

  typeEnum: TeacherSystemSubscriptionStatusEnum = TeacherSystemSubscriptionStatusEnum.Pending;

  showTap: TeacherSystemSubscriptionStatusEnum = TeacherSystemSubscriptionStatusEnum.Pending
  statusEnum = TeacherSystemSubscriptionStatusEnum;
  teacherSystemSubscription: ITeacherSystemSubscription[] = [];
  totalCount = 0;

  resMessage: BaseMessageModel = {};
  listOfIds: string[] | undefined;
  // teacherSystemFilter:ITeacherSystemSubscriptionFilterRequest | undefined;

  constructor(
    private teacherService: TeacherProfileService,
    public languageService: LanguageService,
    public translate: TranslateService,
    private alertify: AlertifyService) { }

    ngOnInit(): void {
      this.teacherSystemSubscriptionFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn'
      this.onPendingChange()
  
      this.setCurrentLang();
      this.getTeacherSystemSubscription();
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
    // this.teacherSystemFilter = {};
    this.teacherService.getTeacherSystemSubscriptionAdvancedFilter(this.teacherSystemSubscriptionFilterRequestModel).subscribe(res => {
      if (res.isSuccess) {
        this.teacherSystemSubscription = res.data as Array<ITeacherSystemSubscription>; 

       ;

        console.log("Teacher System Subscription :",this.teacherSystemSubscription);   
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

  
  // getStudentProgramSubscriptionsFilter() {
  //   this.progSubsService.getStudentsSubscriptionsFilter(this.filter).subscribe(res => {

  //     if (res.isSuccess) {
  //       this.studProgsSubsItems = res.data;
  //       console.log("studProgsSubsItem ", this.studProgsSubsItems)
  //       // this.studProgsSubsItems?.forEach(function (item) {
  //       //   item.requestDate = item.requestDate ? new Date(item.requestDate).toDateString(): '';
  //       // });
  //       this.totalCount = res.count ? res.count : 0;
  //       if (this.filter.skip > 0 && (!this.studProgsSubsItems || this.studProgsSubsItems.length === 0)) {
  //         this.filter.page -= 1;
  //         this.filter.skip = (this.filter.page - 1) * this.filter.take;
  //         this.getStudentProgramSubscriptionsFilter();
  //       }
  //     }
  //     else {

  //     }
  //   }, error => {
  //     this.resultMessage = {
  //       message: error,
  //       type: BaseConstantModel.DANGER_TYPE
  //     }
  //   })
  // }
  advancedSearchRequest() {
    this.advancedSearchObject.emit(this.teacherSystemSubscriptionFilterRequestModel)
  }

  onPendingChange() {
    this.showTap = TeacherSystemSubscriptionStatusEnum.Pending
    this.teacherSystemSubscriptionFilterRequestModel.statusNum = TeacherSystemSubscriptionStatusEnum.Pending;
    this.clearfilterByText();
    this.advancedSearchRequest()
    this.getTeacherSystemSubscription();
    this.closeAvancedSearch()

  }


  onAcceptChange() {
    this.showTap = TeacherSystemSubscriptionStatusEnum.Accept
    this.teacherSystemSubscriptionFilterRequestModel.statusNum = TeacherSystemSubscriptionStatusEnum.Accept
    this.clearfilterByText();
    this.advancedSearchRequest()
    this.getTeacherSystemSubscription();
    this.closeAvancedSearch()


  }
  onRejectedChange() {
    this.showTap = TeacherSystemSubscriptionStatusEnum.Rejected
    this.teacherSystemSubscriptionFilterRequestModel.statusNum = TeacherSystemSubscriptionStatusEnum.Rejected
    this.clearfilterByText();
    this.advancedSearchRequest()
    this.getTeacherSystemSubscription();
    this.closeAvancedSearch()

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
  clearfilterByText() {
    this.teacherSystemSubscriptionFilterRequestModel.name = '';
    this.filterByText(this.teacherSystemSubscriptionFilterRequestModel.name)
  }
  openAvancedSearch() {
    this.openAdvancedSearch.emit(this.teacherSystemSubscriptionFilterRequestModel)
  }
  closeAvancedSearch() {
    this.closeAdvancedSearch.emit(this.teacherSystemSubscriptionFilterRequestModel)
  }
}
