import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherDropOutRequestAdvFilterAdminViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-admin-view-request-model';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';
import {ITeacherStudentViewModel} from '../../../../../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-teacher-drop-out-tab-request',
  templateUrl: './teacher-drop-out-tab-request.component.html',
  styleUrls: ['./teacher-drop-out-tab-request.component.scss']
})
export class TeacherDropOutTabRequestComponent implements OnInit {
  
  @Output() rejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() advancedSearchEvent = new EventEmitter<ITeacherDropOutRequestAdvFilterAdminViewRequestModel>();
  @Output() itemTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  
  teacherDropOutRequestList: ITeacherDropOutRequestModel[] = [];
  teacherDropOutRequestFilterRequestModel: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  resultMessage: BaseMessageModel = {};
  totalCount = 0;
  numberItemsPerRow = 3;
  ids?: string[] = [];
  typeEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  showTap: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  statusEnum = TeacherDropOutRequestStatusEnum;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Admin;
  sendUserID: ITeacherStudentViewModel | undefined;
  showUserDetailsView:boolean = false;

  constructor(
    public translate: TranslateService,
    private teacherDropOutRequestService: TeacherDropOutRequestService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.teacherDropOutRequestFilterRequestModel.sortField = 'requestdate';
    // this.teacherDropOutRequestFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn'
    this.getTeacherDropOutRequests();
  }

  sendUserIDEvent(event: ITeacherStudentViewModel){
    this.sendUserID =event;
    this.showUserDetailsView = true;
  }
  hideUserDetailsView(event: boolean){
    this.showUserDetailsView = event;
  }

  searchByText(searchKey: string) {
    this.teacherDropOutRequestFilterRequestModel.name = searchKey;
    this.getTeacherDropOutRequests();
  }

  getTeacherDropOutRequests() {
    this.teacherDropOutRequestService.teacherDropOutRequestAdvFilterAdminView(this.teacherDropOutRequestFilterRequestModel).subscribe(res => {
      if (res.isSuccess) {
        this.teacherDropOutRequestList = res.data as ITeacherDropOutRequestModel[];
        this.totalCount = res.count ? res.count : 0;
        if (this.teacherDropOutRequestFilterRequestModel.skip > 0 && (!this.teacherDropOutRequestList || this.teacherDropOutRequestList.length === 0)) {
          this.teacherDropOutRequestFilterRequestModel.page -= 1;
          this.teacherDropOutRequestFilterRequestModel.skip = (this.teacherDropOutRequestFilterRequestModel.page - 1) * this.teacherDropOutRequestFilterRequestModel.take;
          this.getTeacherDropOutRequests();
        }
      }
      else {
        this.resultMessage  = {
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

  onPendingChange() {
    this.teacherDropOutRequestFilterRequestModel = { name: '', statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = TeacherDropOutRequestStatusEnum.Pending;
    this.clearFilter();
    this.getTeacherDropOutRequests();
  }

  onAcceptChange() {
    this.teacherDropOutRequestFilterRequestModel = { name: '', statusNum: TeacherDropOutRequestStatusEnum.Accept, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = TeacherDropOutRequestStatusEnum.Accept;
    this.clearFilter();
    this.getTeacherDropOutRequests();
  }

  onRejectedChange() {
    this.teacherDropOutRequestFilterRequestModel = { name: '', statusNum: TeacherDropOutRequestStatusEnum.Rejected, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = TeacherDropOutRequestStatusEnum.Rejected
    this.clearFilter();
    this.getTeacherDropOutRequests();
  }

  clearFilter() {
    this.teacherDropOutRequestFilterRequestModel.name = '';
    this.teacherDropOutRequestFilterRequestModel.progId = '';
    this.teacherDropOutRequestFilterRequestModel.requestNum = undefined;
    this.teacherDropOutRequestFilterRequestModel.from = undefined;
    this.teacherDropOutRequestFilterRequestModel.to = undefined;
    this.teacherDropOutRequestFilterRequestModel.skip = 0;
    this.teacherDropOutRequestFilterRequestModel.take= 9;
    this.teacherDropOutRequestFilterRequestModel.sortField='';
    this.teacherDropOutRequestFilterRequestModel.sortOrder= 1;
    this.teacherDropOutRequestFilterRequestModel.page = 1;
  }

  acceptAllTeacherDropOutRequestChecked() {

    this.ids = this.teacherDropOutRequestList?.filter(i => i.checked).map(a => a.id || '')
    this.teacherDropOutRequestService.teacherDropOutRequestsAcceptance(this.ids).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.alertify.success(res.message || '');
        this.getTeacherDropOutRequests();
      }
      else {
        this.alertify.error(res.message || '');
      }
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      });

  }

  teacherDropOutRequestPendingChangePage(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.teacherDropOutRequestFilterRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Pending;
    this.teacherDropOutRequestFilterRequestModel = event;
    this.getTeacherDropOutRequests();
  }

  teacherDropOutRequestAcceptChangePage(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.teacherDropOutRequestFilterRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Accept;
    this.teacherDropOutRequestFilterRequestModel = event;
    this.getTeacherDropOutRequests();
  }

  teacherDropOutRequestRejectChangePage(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.teacherDropOutRequestFilterRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Rejected;
    this.teacherDropOutRequestFilterRequestModel = event;
    this.getTeacherDropOutRequests();
  }
  
  rejectTeacherDropOutRequestMethod(event: ITeacherDropOutRequestModel) {
    this.itemTeacherDropOutRequest.emit(event);
  }

  rejectTeacherDropOutRequestEvent(teacherSubscripModel: ITeacherDropOutRequestModel) {
    this.rejectTeacherDropOutRequest.emit(teacherSubscripModel);
  }

  acceptTeacherDropOutRequest(teacherSubscripModel: ITeacherDropOutRequestModel) {
    this.ids?.push(teacherSubscripModel.id || '');
    this.teacherDropOutRequestService.teacherDropOutRequestsAcceptance(this.ids).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.alertify.success(res.message || '');
        this.getTeacherDropOutRequests();
      }
      else {
        this.alertify.error(res.message || '');
      }
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      });
  }

  openAvancedSearch() {
    this.advancedSearchEvent.emit(this.teacherDropOutRequestFilterRequestModel)
  }
}
