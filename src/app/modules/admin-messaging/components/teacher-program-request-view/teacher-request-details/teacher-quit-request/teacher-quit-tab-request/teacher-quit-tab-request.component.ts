import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherDropOutRequestAdminViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-admin-view-model';
import { ITeacherDropOutRequestAdvFilterAdminViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-adv-filter-admin-view-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';

@Component({
  selector: 'app-teacher-quit-tab-request',
  templateUrl: './teacher-quit-tab-request.component.html',
  styleUrls: ['./teacher-quit-tab-request.component.scss']
})
export class TeacherQuitTabRequestComponent implements OnInit {
  
  @Output() rejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestAdminViewModel>();
  @Output() advancedSearchEvent = new EventEmitter<ITeacherDropOutRequestAdvFilterAdminViewRequestModel>();
  @Output() itemTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestAdminViewModel>();
  // @Output() closeAdvancedSearch = new EventEmitter();
  teacherDropOutRequestList: ITeacherDropOutRequestAdminViewModel[] = [];
  teacherDropOutRequestFilterRequestModel: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  errorMessage?: string;
  totalCount = 0;
  numberItemsPerRow = 3;
  ids?: string[] = [];
  typeEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  showTap: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  statusEnum = TeacherDropOutRequestStatusEnum;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Admin;
  //teacherName:string='';
  constructor(
    public translate: TranslateService,
    private teacherDropOutRequestService: TeacherDropOutRequestService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.teacherDropOutRequestFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn'
    this.getTeacherDropOutRequests();
  }

  searchByText(searchKey: string) {
    this.teacherDropOutRequestFilterRequestModel.name = searchKey;
    this.getTeacherDropOutRequests();
  }

  getTeacherDropOutRequests() {
    this.teacherDropOutRequestService.teacherDropOutRequestAdvFilterAdminView(this.teacherDropOutRequestFilterRequestModel || {}).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.teacherDropOutRequestList = res.data as ITeacherDropOutRequestAdminViewModel[];
        this.teacherDropOutRequestList?.forEach(function (item) {
        });
        this.totalCount = res.count ? res.count : 0;
        if (this.teacherDropOutRequestFilterRequestModel.skip > 0 && (!this.teacherDropOutRequestList || this.teacherDropOutRequestList.length === 0)) {
          this.teacherDropOutRequestFilterRequestModel.page -= 1;
          this.teacherDropOutRequestFilterRequestModel.skip = (this.teacherDropOutRequestFilterRequestModel.page - 1) * this.teacherDropOutRequestFilterRequestModel.take;
          this.getTeacherDropOutRequests();
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
    this.teacherDropOutRequestFilterRequestModel = { name: '', statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = TeacherDropOutRequestStatusEnum.Pending;
    this.closeAvancedSearch();
    this.getTeacherDropOutRequests();
  }

  onAcceptChange() {
    this.teacherDropOutRequestFilterRequestModel = { name: '', statusNum: TeacherDropOutRequestStatusEnum.Accept, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = TeacherDropOutRequestStatusEnum.Accept;
    this.closeAvancedSearch();
    this.getTeacherDropOutRequests();
  }

  onRejectedChange() {
    this.teacherDropOutRequestFilterRequestModel = { name: '', statusNum: TeacherDropOutRequestStatusEnum.Rejected, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = TeacherDropOutRequestStatusEnum.Rejected
    this.closeAvancedSearch();
    this.getTeacherDropOutRequests();
  }

  closeAvancedSearch() {
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
    // this.closeAdvancedSearch.emit()
  }

  rejectTeacherTeacherDropOutRequest(event: ITeacherDropOutRequestAdminViewModel) {
    this.itemTeacherDropOutRequest.emit(event)
    this.getTeacherDropOutRequests();
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
        console.log(error);
      });

  }

  
  rejectTeacherTeacherDropOutRequestRequestMethod(event: ITeacherDropOutRequestAdminViewModel) {
    this.itemTeacherDropOutRequest.emit(event);
  }

  rejectTeacherDropOutRequestEvent(teacherSubscripModel: ITeacherDropOutRequestAdminViewModel) {
    this.rejectTeacherDropOutRequest.emit(teacherSubscripModel);
  }

  acceptTeacherDropOutRequest(teacherSubscripModel: ITeacherDropOutRequestAdminViewModel) {
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
        console.log(error);
      });
  }

  teacherPendingChangePage(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.teacherDropOutRequestFilterRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Pending;
    this.teacherDropOutRequestFilterRequestModel = event;
    this.getTeacherDropOutRequests();

  }

  teacherAcceptChangePage(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.teacherDropOutRequestFilterRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Accept;
    this.teacherDropOutRequestFilterRequestModel = event;
    this.getTeacherDropOutRequests();

  }

  teacherRejectedChangePage(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.teacherDropOutRequestFilterRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Rejected;
    this.teacherDropOutRequestFilterRequestModel = event;
    this.getTeacherDropOutRequests();

  }

  openAvancedSearch() {
    this.advancedSearchEvent.emit(this.teacherDropOutRequestFilterRequestModel)
  }

  advancedSearch(model?: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
    this.teacherDropOutRequestFilterRequestModel = model || { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.getTeacherDropOutRequests();
  }
}
