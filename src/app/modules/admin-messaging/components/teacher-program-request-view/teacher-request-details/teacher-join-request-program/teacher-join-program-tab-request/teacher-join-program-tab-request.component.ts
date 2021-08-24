import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TeacheProgramSubscriptionStatusEnum } from 'src/app/core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';

import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import {ITeacherStudentViewModel} from '../../../../../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-teacher-join-program-tab-request',
  templateUrl: './teacher-join-program-tab-request.component.html',
  styleUrls: ['./teacher-join-program-tab-request.component.scss']
})
export class TeacherJionProgramTabRequestComponent implements OnInit {

  @Output() rejectTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();
  @Output() advancedSearchEvent = new EventEmitter<ITeacherProgramSubscriptionFilterRequestModel>();
  // @Output() closeAdvancedSearch = new EventEmitter();
  teacherProgramSubscriptionList: ITeacherProgramSubscriptionModel[] = [];
  teacherProgramSubscriptionFilterRequestModel: ITeacherProgramSubscriptionFilterRequestModel = { statusNum: TeacheProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  errorMessage?: string;
  totalCount = 0;
  teacherCard: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.teacher;
  numberItemsPerRow = 3;
  ids?: string[] = [];
  typeEnum: TeacheProgramSubscriptionStatusEnum = TeacheProgramSubscriptionStatusEnum.Pending;
  showTap: TeacheProgramSubscriptionStatusEnum = TeacheProgramSubscriptionStatusEnum.Pending;
  statusEnum = TeacheProgramSubscriptionStatusEnum;
  sendUserID: ITeacherStudentViewModel | undefined;
  showUserDetailsView:boolean = false;
  //teacherName:string='';
  constructor(
    public translate: TranslateService,
    private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.teacherProgramSubscriptionFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn'
    this.getTeachersProgramsSubscriptions();
  }

  sendTeacherIDEvent(event: ITeacherStudentViewModel){
    this.sendUserID =event;
    this.showUserDetailsView = true;
  }
  hideUserDetailsView(event: boolean){
    this.showUserDetailsView = event;
  }
  searchByText(searchKey: string) {
    this.teacherProgramSubscriptionFilterRequestModel.usrName = searchKey;
    this.getTeachersProgramsSubscriptions();
  }

  getTeachersProgramsSubscriptions() {
    this.teacherProgramSubscriptionServicesService.getTeachersProgramsSubscriptionsFilter(this.teacherProgramSubscriptionFilterRequestModel || {}).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.teacherProgramSubscriptionList = res.data as ITeacherProgramSubscriptionModel[];
        // this.totalCount = this.teacherProgramSubscriptionList.length > 0 ? this.teacherProgramSubscriptionList[0].totalRows : 0;
        this.teacherProgramSubscriptionList?.forEach(function (item) {
          // item.requestDate = item.requestDate ? new Date(item.requestDate).toDateString(): '';
        });
        this.totalCount = res.count ? res.count : 0;
        if (this.teacherProgramSubscriptionFilterRequestModel.skip > 0 && (!this.teacherProgramSubscriptionList || this.teacherProgramSubscriptionList.length === 0)) {
          this.teacherProgramSubscriptionFilterRequestModel.page -= 1;
          this.teacherProgramSubscriptionFilterRequestModel.skip = (this.teacherProgramSubscriptionFilterRequestModel.page - 1) * this.teacherProgramSubscriptionFilterRequestModel.take;
          this.getTeachersProgramsSubscriptions();
        }
      }
      else {
        this.errorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      });
  }


  onPendingChange() {
    this.teacherProgramSubscriptionFilterRequestModel = { usrName: '', statusNum: TeacheProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = TeacheProgramSubscriptionStatusEnum.Pending;
    this.closeAvancedSearch();
    this.getTeachersProgramsSubscriptions();
  }

  onAcceptChange() {
    this.teacherProgramSubscriptionFilterRequestModel = { usrName: '', statusNum: TeacheProgramSubscriptionStatusEnum.Accept, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = TeacheProgramSubscriptionStatusEnum.Accept;
    this.closeAvancedSearch();
    this.getTeachersProgramsSubscriptions();
  }
  onRejectedChange() {
    this.teacherProgramSubscriptionFilterRequestModel = { usrName: '', statusNum: TeacheProgramSubscriptionStatusEnum.Rejected, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = TeacheProgramSubscriptionStatusEnum.Rejected
    this.closeAvancedSearch();
    this.getTeachersProgramsSubscriptions();
  }

  acceptTeacherProgramSubscription(teacherSubscripModel: ITeacherProgramSubscriptionModel) {
    this.ids?.push(teacherSubscripModel.id || '');
    this.teacherProgramSubscriptionServicesService.teacherProgramSubscriptionsAcceptance(this.ids).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.alertify.success(res.message || '');
        this.getTeachersProgramsSubscriptions();
      }
      else {
        this.alertify.error(res.message || '');
      }
    },
      error => {
        console.log(error);
      });
  }

  closeAvancedSearch() {
    this.teacherProgramSubscriptionFilterRequestModel.usrName = '';
    this.teacherProgramSubscriptionFilterRequestModel.progId = '';
    this.teacherProgramSubscriptionFilterRequestModel.numberRequest = undefined;
    this.teacherProgramSubscriptionFilterRequestModel.fromDate = undefined;
    this.teacherProgramSubscriptionFilterRequestModel.toDate = undefined;
    this.teacherProgramSubscriptionFilterRequestModel.skip = 0;
    this.teacherProgramSubscriptionFilterRequestModel.take= 9;
    this.teacherProgramSubscriptionFilterRequestModel.sortField='';
    this.teacherProgramSubscriptionFilterRequestModel.sortOrder= 1;
    this.teacherProgramSubscriptionFilterRequestModel.page = 1;
    // this.closeAdvancedSearch.emit()
  }
  acceptAllTeachersCheckedProgramSubscription() {

    this.ids = this.teacherProgramSubscriptionList?.filter(i => i.checked).map(a => a.id || '')
    this.teacherProgramSubscriptionServicesService.teacherProgramSubscriptionsAcceptance(this.ids).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.alertify.success(res.message || '');
        this.getTeachersProgramsSubscriptions();
      }
      else {
        this.alertify.error(res.message || '');
      }
    },
      error => {
        console.log(error);
      });

  }

  rejectTeacherProgramSubscriptionEvent(teacherSubscripModel: ITeacherProgramSubscriptionModel) {
    this.rejectTeacherProgramSubscription.emit(teacherSubscripModel);
  }

  teacherPendingChangePage(event: ITeacherProgramSubscriptionFilterRequestModel) {
    this.teacherProgramSubscriptionFilterRequestModel.statusNum = TeacheProgramSubscriptionStatusEnum.Pending;
    this.teacherProgramSubscriptionFilterRequestModel = event;
    this.getTeachersProgramsSubscriptions();

  }
  teacherAcceptChangePage(event: ITeacherProgramSubscriptionFilterRequestModel) {
    this.teacherProgramSubscriptionFilterRequestModel.statusNum = TeacheProgramSubscriptionStatusEnum.Accept;
    this.teacherProgramSubscriptionFilterRequestModel = event;
    this.getTeachersProgramsSubscriptions();

  }
  teacherRejectedChangePage(event: ITeacherProgramSubscriptionFilterRequestModel) {
    this.teacherProgramSubscriptionFilterRequestModel.statusNum = TeacheProgramSubscriptionStatusEnum.Rejected;
    this.teacherProgramSubscriptionFilterRequestModel = event;
    this.getTeachersProgramsSubscriptions();

  }

  openAvancedSearch() {
    this.advancedSearchEvent.emit(this.teacherProgramSubscriptionFilterRequestModel)
  }


  advancedSearch(model?: ITeacherProgramSubscriptionFilterRequestModel) {
    this.teacherProgramSubscriptionFilterRequestModel = model || { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.getTeachersProgramsSubscriptions();
  }

}
