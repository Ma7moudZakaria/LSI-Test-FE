import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ITeacherAppointmentFilterRequestModel} from '../../../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-filter-request-model';
import {ITeacherAppointmentModel} from '../../../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-model';
import {TranslateService} from '@ngx-translate/core';
import {AlertifyService} from '../../../../../../../core/services/alertify-services/alertify.service';
import {BaseResponseModel} from '../../../../../../../core/ng-model/base-response-model';
import {TeacherAppointmentRequestsEnum} from '../../../../../../../core/enums/teacher-appointment-requests-enums/teacher-appointment-requests-enum.enum';
import {TeacherAppointmentService} from '../../../../../../../core/services/teacher-appointment-services/teacher-appointment.service';

@Component({
  selector: 'app-appointment-requests-tab',
  templateUrl: './appointment-requests-tab.component.html',
  styleUrls: ['./appointment-requests-tab.component.scss']
})
export class AppointmentRequestsTabComponent implements OnInit {
  @Output() advancedSearchEvent = new EventEmitter<ITeacherAppointmentFilterRequestModel>();
  @Output() itemTeacherAppointmentReq = new EventEmitter<ITeacherAppointmentModel>();

  teacherAppointmentRequestsList: ITeacherAppointmentModel[] = [];
  teacherAppointmentFilterRequestModel: ITeacherAppointmentFilterRequestModel = {
    statusNum: TeacherAppointmentRequestsEnum.Pending,
    skip: 0,
    take: 9,
    sortField: '',
    sortOrder: 1,
    page: 1
  };
  totalCount = 0;
  numberItemsPerRow = 3;
  ids?: string[] = [];
  typeEnum: TeacherAppointmentRequestsEnum = TeacherAppointmentRequestsEnum.Pending;
  showTap: TeacherAppointmentRequestsEnum = TeacherAppointmentRequestsEnum.Pending;
  statusEnum = TeacherAppointmentRequestsEnum;

  constructor(
    public translate: TranslateService,
    private teacherAppointmentService: TeacherAppointmentService,
    private alertify: AlertifyService) {
  }

  ngOnInit(): void {
    this.teacherAppointmentFilterRequestModel.sortField === 'requestdate';
    this.getTeacherAppointmentRequests();
  }


  searchByText(searchKey: string) {
    this.teacherAppointmentFilterRequestModel.usrName = searchKey;
    this.getTeacherAppointmentRequests();
  }

  getTeacherAppointmentRequests() {
    this.teacherAppointmentService.getTeachersAppointmentRequestsFilterAdminViewWithAdvancedSearch(this.teacherAppointmentFilterRequestModel || {}).subscribe(res => {
        var response = <BaseResponseModel> res;
        if (response.isSuccess) {
          this.teacherAppointmentRequestsList = res.data as ITeacherAppointmentModel[];
          this.teacherAppointmentRequestsList?.forEach(function(item) {
          });
          this.totalCount = res.count ? res.count : 0;
          if (this.teacherAppointmentFilterRequestModel.skip > 0 && (!this.teacherAppointmentRequestsList || this.teacherAppointmentRequestsList.length === 0)) {
            this.teacherAppointmentFilterRequestModel.page -= 1;
            this.teacherAppointmentFilterRequestModel.skip = (this.teacherAppointmentFilterRequestModel.page - 1) * this.teacherAppointmentFilterRequestModel.take;
            this.getTeacherAppointmentRequests();
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  onPendingChange() {
    this.teacherAppointmentFilterRequestModel = {
      usrName: '',
      statusNum: TeacherAppointmentRequestsEnum.Pending,
      skip: 0,
      take: 9,
      sortField: '',
      sortOrder: 1,
      page: 1
    };
    this.showTap = TeacherAppointmentRequestsEnum.Pending;
    this.closeAvancedSearch();
    this.getTeacherAppointmentRequests();
  }

  onAcceptChange() {
    this.teacherAppointmentFilterRequestModel = {
      usrName: '',
      statusNum: TeacherAppointmentRequestsEnum.Accept,
      skip: 0,
      take: 9,
      sortField: '',
      sortOrder: 1,
      page: 1
    };
    this.showTap = TeacherAppointmentRequestsEnum.Accept;
    this.closeAvancedSearch();
    this.getTeacherAppointmentRequests();
  }

  onRejectedChange() {
    this.teacherAppointmentFilterRequestModel = {
      usrName: '',
      statusNum: TeacherAppointmentRequestsEnum.Rejected,
      skip: 0,
      take: 9,
      sortField: '',
      sortOrder: 1,
      page: 1
    };
    this.showTap = TeacherAppointmentRequestsEnum.Rejected;
    this.closeAvancedSearch();
    this.getTeacherAppointmentRequests();
  }

  rejectTeacherAppointmentRequestMethod(event: ITeacherAppointmentModel) {
    this.itemTeacherAppointmentReq.emit(event);

  }


  acceptTeacherAppointmentRequest(studentProgramVacationModel: ITeacherAppointmentModel) {
    this.ids?.push(studentProgramVacationModel.id || '');
    this.teacherAppointmentService.teacherAvailableTimeRequestAcceptance(this.ids).subscribe(res => {
        var response = <BaseResponseModel> res;
        if (response.isSuccess) {
          this.alertify.success(res.message || '');
          this.getTeacherAppointmentRequests();
        } else {
          this.alertify.error(res.message || '');
        }
      },
      error => {
        console.log(error);
      });
  }

  closeAvancedSearch() {
    this.teacherAppointmentFilterRequestModel.usrName = '';
    this.teacherAppointmentFilterRequestModel.numberRequest = undefined;
    this.teacherAppointmentFilterRequestModel.fromDate = undefined;
    this.teacherAppointmentFilterRequestModel.toDate = undefined;
    this.teacherAppointmentFilterRequestModel.skip = 0;
    this.teacherAppointmentFilterRequestModel.take = 9;
    this.teacherAppointmentFilterRequestModel.sortField = '';
    this.teacherAppointmentFilterRequestModel.sortOrder = 1;
    this.teacherAppointmentFilterRequestModel.page = 1;
  }

  acceptAllTeacherAppointmentRequestsChecked() {

    this.ids = this.teacherAppointmentRequestsList?.filter(i => i.checked).map(a => a.id || '');
    this.teacherAppointmentService.teacherAvailableTimeRequestAcceptance(this.ids).subscribe(res => {
        var response = <BaseResponseModel> res;
        if (response.isSuccess) {
          this.alertify.success(res.message || '');
          this.getTeacherAppointmentRequests();
        } else {
          this.alertify.error(res.message || '');
        }
      },
      error => {
        console.log(error);
      });

  }


  teacherAppointmentPendingChangePage(event: ITeacherAppointmentFilterRequestModel) {
    this.teacherAppointmentFilterRequestModel.statusNum = TeacherAppointmentRequestsEnum.Pending;
    this.teacherAppointmentFilterRequestModel = event;
    this.getTeacherAppointmentRequests();

  }

  teacherAppointmentAcceptChangePage(event: ITeacherAppointmentFilterRequestModel) {
    this.teacherAppointmentFilterRequestModel.statusNum = TeacherAppointmentRequestsEnum.Accept;
    this.teacherAppointmentFilterRequestModel = event;
    this.getTeacherAppointmentRequests();

  }

  teacherAppointmentRejectedChangePage(event: ITeacherAppointmentFilterRequestModel) {
    this.teacherAppointmentFilterRequestModel.statusNum = TeacherAppointmentRequestsEnum.Rejected;
    this.teacherAppointmentFilterRequestModel = event;
    this.getTeacherAppointmentRequests();

  }

  openAdvancedSearch() {
    this.advancedSearchEvent.emit(this.teacherAppointmentFilterRequestModel);
  }


  advancedSearch(model?: ITeacherAppointmentFilterRequestModel) {
    this.teacherAppointmentFilterRequestModel = model || {skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1};
    this.getTeacherAppointmentRequests();
  }

}
