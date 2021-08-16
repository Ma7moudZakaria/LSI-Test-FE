import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStudentDropOutRequestsFilterAdminViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-admin-view-request-model';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentDropOutRequestService } from 'src/app/core/services/student-drop-out-request-services/student-drop-out-request.service';

@Component({
  selector: 'app-student-drop-out-tab-request',
  templateUrl: './student-drop-out-tab-request.component.html',
  styleUrls: ['./student-drop-out-tab-request.component.scss']
})
export class StudentDropOutTabRequestComponent implements OnInit {

  @Output() rejectStudentDropOutRequest = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  @Output() advancedSearchEvent = new EventEmitter<IStudentDropOutRequestsFilterAdminViewRequestModel>();
  @Output() itemOfRejectStudentDropOutRequest = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  
  studentDropOutRequestList: IStudentDropOutRequestsFilterResponseModel[] = [];
  studentDropOutRequestFilterRequestModel: IStudentDropOutRequestsFilterAdminViewRequestModel = { statusNum: StudentDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  resultMessage: BaseMessageModel = {};;
  totalCount = 0;
  numberItemsPerRow = 3;
  ids?: string[] = [];
  typeEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  showTap: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  statusEnum = StudentDropOutRequestStatusEnum;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Admin;
  
  constructor(
    public translate: TranslateService,
    private studentDropOutRequestService: StudentDropOutRequestService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.studentDropOutRequestFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn'
    this.getStudentDropOutRequests();
  }

  searchByText(searchKey: string) {
    this.studentDropOutRequestFilterRequestModel.usrName = searchKey;
    this.getStudentDropOutRequests();
  }

  getStudentDropOutRequests() {
    this.studentDropOutRequestService.studentDropOutRequestAdvFilterAdminView(this.studentDropOutRequestFilterRequestModel).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.studentDropOutRequestList = res.data as IStudentDropOutRequestsFilterResponseModel[];
        this.totalCount = res.count ? res.count : 0;
        if (this.studentDropOutRequestFilterRequestModel.skip > 0 && (!this.studentDropOutRequestList || this.studentDropOutRequestList.length === 0)) {
          this.studentDropOutRequestFilterRequestModel.page -= 1;
          this.studentDropOutRequestFilterRequestModel.skip = (this.studentDropOutRequestFilterRequestModel.page - 1) * this.studentDropOutRequestFilterRequestModel.take;
          this.getStudentDropOutRequests();
        }
      }
      else {
        this.resultMessage  = {
          message: response.message,
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
    this.studentDropOutRequestFilterRequestModel = { usrName: '', statusNum: StudentDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = StudentDropOutRequestStatusEnum.Pending;
    this.closeAvancedSearch();
    this.getStudentDropOutRequests();
  }

  onAcceptChange() {
    this.studentDropOutRequestFilterRequestModel = { usrName: '', statusNum: StudentDropOutRequestStatusEnum.Accept, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = StudentDropOutRequestStatusEnum.Accept;
    this.closeAvancedSearch();
    this.getStudentDropOutRequests();
  }

  onRejectedChange() {
    this.studentDropOutRequestFilterRequestModel = { usrName: '', statusNum: StudentDropOutRequestStatusEnum.Rejected, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = StudentDropOutRequestStatusEnum.Rejected
    this.closeAvancedSearch();
    this.getStudentDropOutRequests();
  }

  closeAvancedSearch() {
    this.studentDropOutRequestFilterRequestModel.usrName = '';
    this.studentDropOutRequestFilterRequestModel.progId = '';
    this.studentDropOutRequestFilterRequestModel.numberRequest = undefined;
    this.studentDropOutRequestFilterRequestModel.fromDate = undefined;
    this.studentDropOutRequestFilterRequestModel.toDate = undefined;
    this.studentDropOutRequestFilterRequestModel.skip = 0;
    this.studentDropOutRequestFilterRequestModel.take= 9;
    this.studentDropOutRequestFilterRequestModel.sortField='';
    this.studentDropOutRequestFilterRequestModel.sortOrder= 1;
    this.studentDropOutRequestFilterRequestModel.page = 1;
  }

  acceptAllStudentDropOutRequestChecked() {
    this.ids = this.studentDropOutRequestList?.filter(i => i.checked).map(a => a.id || '')
    this.studentDropOutRequestService.studentDropOutRequestsAcceptance(this.ids).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.alertify.success(res.message || '');
        this.getStudentDropOutRequests();
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

  studentDropOutRequestPendingChangePage(event: IStudentDropOutRequestsFilterAdminViewRequestModel) {
    this.studentDropOutRequestFilterRequestModel.statusNum = StudentDropOutRequestStatusEnum.Pending;
    this.studentDropOutRequestFilterRequestModel = event;
    this.getStudentDropOutRequests();
  }

  studentDropOutRequestAcceptChangePage(event: IStudentDropOutRequestsFilterAdminViewRequestModel) {
    this.studentDropOutRequestFilterRequestModel.statusNum = StudentDropOutRequestStatusEnum.Accept;
    this.studentDropOutRequestFilterRequestModel = event;
    this.getStudentDropOutRequests();
  }

  studentDropOutRequestRejectChangePage(event: IStudentDropOutRequestsFilterAdminViewRequestModel) {
    this.studentDropOutRequestFilterRequestModel.statusNum = StudentDropOutRequestStatusEnum.Rejected;
    this.studentDropOutRequestFilterRequestModel = event;
    this.getStudentDropOutRequests();
  }
  
  rejectStudentDropOutRequestMethod(event: IStudentDropOutRequestsFilterResponseModel) {
    this.itemOfRejectStudentDropOutRequest.emit(event);
  }

  rejectStudentDropOutRequestEvent(teacherSubscripModel: IStudentDropOutRequestsFilterResponseModel) {
    this.rejectStudentDropOutRequest.emit(teacherSubscripModel);
  }

  acceptStudentDropOutRequest(teacherSubscripModel: IStudentDropOutRequestsFilterResponseModel) {
    this.ids?.push(teacherSubscripModel.id || '');
    this.studentDropOutRequestService.studentDropOutRequestsAcceptance(this.ids).subscribe(res => {
      if (res.isSuccess) {
        this.alertify.success(res.message || '');
        this.getStudentDropOutRequests();
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
    this.advancedSearchEvent.emit(this.studentDropOutRequestFilterRequestModel)
  }

}
