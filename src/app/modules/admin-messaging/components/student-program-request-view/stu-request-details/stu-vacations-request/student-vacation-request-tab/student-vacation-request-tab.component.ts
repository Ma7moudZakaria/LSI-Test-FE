import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AlertifyService} from '../../../../../../../core/services/alertify-services/alertify.service';
import {LanguageEnum} from '../../../../../../../core/enums/language-enum.enum';
import {BaseResponseModel} from '../../../../../../../core/ng-model/base-response-model';
import {IStudentProgramVacationModel} from '../../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {IStudentProgramVacationFilterRequestModel} from '../../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import {StudentProgramVacationStatusEnum} from '../../../../../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import {StudentProgramVacationServicesService} from '../../../../../../../core/services/student-program-vacation-services/student-program-vacation-services.service';
import {ITeacherStudentViewModel} from '../../../../../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-student-vacation-request-tab',
  templateUrl: './student-vacation-request-tab.component.html',
  styleUrls: ['./student-vacation-request-tab.component.scss']
})
export class StudentVacationRequestTabComponent implements OnInit {

  @Output() advancedSearchEvent = new EventEmitter<IStudentProgramVacationFilterRequestModel>();
  @Output() itemStuReq = new EventEmitter<IStudentProgramVacationModel>();
  studentDropIdInput :ITeacherStudentViewModel | undefined;
  studentProgramVacationRequestsList: IStudentProgramVacationModel[] = [];
  studentProgramVacationFilterRequestModel: IStudentProgramVacationFilterRequestModel = { statusNum: StudentProgramVacationStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  totalCount = 0;
  numberItemsPerRow = 3;
  ids?: string[] = [];
  typeEnum: StudentProgramVacationStatusEnum = StudentProgramVacationStatusEnum.Pending;
  showTap: StudentProgramVacationStatusEnum = StudentProgramVacationStatusEnum.Pending;
  statusEnum = StudentProgramVacationStatusEnum;
  showUserDetailsView:boolean = false;
  constructor(
    public translate: TranslateService,
    private programVacationServicesService: StudentProgramVacationServicesService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.studentProgramVacationFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn'
    this.getStudentProgramVacationRequests();
  }
  studentIdDrop(event:ITeacherStudentViewModel){
    this.showUserDetailsView =true;
    this.studentDropIdInput= event;
  }
  hideUserDetailsView(event: boolean){
    this.showUserDetailsView = event;
  }
  searchByText(searchKey: string) {
    this.studentProgramVacationFilterRequestModel.usrName = searchKey;
    this.getStudentProgramVacationRequests();
  }

  getStudentProgramVacationRequests() {
    this.programVacationServicesService.getStudentsProgramsVacationFilterAdminView(this.studentProgramVacationFilterRequestModel || {}).subscribe(res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {
          this.studentProgramVacationRequestsList = res.data as IStudentProgramVacationModel[];
          this.studentProgramVacationRequestsList?.forEach(function (item) {
          });
          this.totalCount = res.count ? res.count : 0;
          if (this.studentProgramVacationFilterRequestModel.skip > 0 && (!this.studentProgramVacationRequestsList || this.studentProgramVacationRequestsList.length === 0)) {
            this.studentProgramVacationFilterRequestModel.page -= 1;
            this.studentProgramVacationFilterRequestModel.skip = (this.studentProgramVacationFilterRequestModel.page - 1) * this.studentProgramVacationFilterRequestModel.take;
            this.getStudentProgramVacationRequests();
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  onPendingChange() {
    this.studentProgramVacationFilterRequestModel = { usrName: '', statusNum: StudentProgramVacationStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = StudentProgramVacationStatusEnum.Pending;
    this.closeAvancedSearch();
    this.getStudentProgramVacationRequests();
  }

  onAcceptChange() {
    this.studentProgramVacationFilterRequestModel = { usrName: '', statusNum: StudentProgramVacationStatusEnum.Accept, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = StudentProgramVacationStatusEnum.Accept;
    this.closeAvancedSearch();
    this.getStudentProgramVacationRequests();
  }
  onRejectedChange() {
    this.studentProgramVacationFilterRequestModel = { usrName: '', statusNum: StudentProgramVacationStatusEnum.Rejected, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.showTap = StudentProgramVacationStatusEnum.Rejected
    this.closeAvancedSearch();
    this.getStudentProgramVacationRequests();
  }

  rejectStuRequestMethod(event: IStudentProgramVacationModel) {
    this.itemStuReq.emit(event)

  }


  AcceptStudentProgramVacation(studentProgramVacationModel: IStudentProgramVacationModel) {
    this.ids?.push(studentProgramVacationModel.id || '');
    this.programVacationServicesService.studentProgramVacationAcceptance(this.ids).subscribe(res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {
          this.alertify.success(res.message || '');
          this.getStudentProgramVacationRequests();
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
    this.studentProgramVacationFilterRequestModel.usrName = '';
    this.studentProgramVacationFilterRequestModel.progId = '';
    this.studentProgramVacationFilterRequestModel.numberRequest = undefined;
    this.studentProgramVacationFilterRequestModel.fromDate = undefined;
    this.studentProgramVacationFilterRequestModel.toDate = undefined;
    this.studentProgramVacationFilterRequestModel.skip = 0;
    this.studentProgramVacationFilterRequestModel.take= 9;
    this.studentProgramVacationFilterRequestModel.sortField='';
    this.studentProgramVacationFilterRequestModel.sortOrder= 1;
    this.studentProgramVacationFilterRequestModel.page = 1;
    // this.closeAdvancedSearch.emit()
  }
  acceptAllStudentVacationRequestsChecked() {

    this.ids = this.studentProgramVacationRequestsList?.filter(i => i.checked).map(a => a.id || '')
    this.programVacationServicesService.studentProgramVacationAcceptance(this.ids).subscribe(res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {
          this.alertify.success(res.message || '');
          this.getStudentProgramVacationRequests();
        }
        else {
          this.alertify.error(res.message || '');
        }
      },
      error => {
        console.log(error);
      });

  }


  StudentProgramVacationPendingChangePage(event: IStudentProgramVacationFilterRequestModel) {
    this.studentProgramVacationFilterRequestModel.statusNum = StudentProgramVacationStatusEnum.Pending;
    this.studentProgramVacationFilterRequestModel = event;
    this.getStudentProgramVacationRequests();

  }
  StudentProgramVacationAcceptChangePage(event: IStudentProgramVacationFilterRequestModel) {
    this.studentProgramVacationFilterRequestModel.statusNum = StudentProgramVacationStatusEnum.Accept;
    this.studentProgramVacationFilterRequestModel = event;
    this.getStudentProgramVacationRequests();

  }
  StudentProgramVacationRejectedChangePage(event: IStudentProgramVacationFilterRequestModel) {
    this.studentProgramVacationFilterRequestModel.statusNum = StudentProgramVacationStatusEnum.Rejected;
    this.studentProgramVacationFilterRequestModel = event;
    this.getStudentProgramVacationRequests();

  }

  openAdvancedSearch() {
    this.advancedSearchEvent.emit(this.studentProgramVacationFilterRequestModel)
  }


  advancedSearch(model?: IStudentProgramVacationFilterRequestModel) {
    this.studentProgramVacationFilterRequestModel = model || { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
    this.getStudentProgramVacationRequests();
  }

}
