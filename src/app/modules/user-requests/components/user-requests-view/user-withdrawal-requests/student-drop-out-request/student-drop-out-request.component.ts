import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ICrateStudentDropOutRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/icreate-student-drop-out-request-model';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { IStudentDropOutRequestsFilterStudentViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-request-model';
import { IStudentDropOutRequestsFilterStudentViewResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-response-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentDropOutRequestService } from 'src/app/core/services/student-drop-out-request-services/student-drop-out-request.service';
import { UserWithdrawalRequestsComponent } from '../user-withdrawal-requests.component';

@Component({
  selector: 'app-student-drop-out-request',
  templateUrl: './student-drop-out-request.component.html',
  styleUrls: ['./student-drop-out-request.component.scss']
})
export class StudentDropOutRequestComponent implements OnInit {


  @Output() itemStudentDropOutRequest = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Output() createDropOutOverlayEvent = new EventEmitter<ICrateStudentDropOutRequestModel>();

  studentDropOutRequestList: IStudentDropOutRequestsFilterStudentViewResponseModel[] = [];
  studentDropOutRequestFilterRequestModel: IStudentDropOutRequestsFilterStudentViewRequestModel = {  skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  resMessage: BaseMessageModel = {};
  totalCount = 0;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Student;
  currentUser: IUser | undefined;
  
  constructor(
    public translate: TranslateService,
    private studentDropOutRequestService: StudentDropOutRequestService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.studentDropOutRequestFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'studentNameAr' : 'StudentNameEn';
    this.getStudentDropOutRequests();
  }

  searchByText(searchKey: string) {
    this.studentDropOutRequestFilterRequestModel.progName = searchKey;
    this.getStudentDropOutRequests();
  }

  openCreateDropOutRequestOverlay() {
    this.createDropOutOverlayEvent.emit();
  }

  rejectStudentDropOutRequestRequestMethod(event: IStudentDropOutRequestsFilterStudentViewResponseModel) {
    this.itemStudentDropOutRequest.emit(event);
  }

  getStudentDropOutRequests() {
    this.studentDropOutRequestFilterRequestModel.usrId = this.currentUser?.id;
    this.studentDropOutRequestService.studentDropOutRequestAdvFilterStudentView(this.studentDropOutRequestFilterRequestModel).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.studentDropOutRequestList = res.data as IStudentDropOutRequestsFilterStudentViewResponseModel[];
        this.totalCount = res.count ? res.count : 0;
        if (this.studentDropOutRequestFilterRequestModel.skip > 0 && (!this.studentDropOutRequestList || this.studentDropOutRequestList.length === 0)) {
          this.studentDropOutRequestFilterRequestModel.page -= 1;
          this.studentDropOutRequestFilterRequestModel.skip = (this.studentDropOutRequestFilterRequestModel.page - 1) * this.studentDropOutRequestFilterRequestModel.take;
          this.getStudentDropOutRequests();
        }
      }
      else {
        this.resMessage = {
          message: response.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    },
      error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      });
  }

  studentDropOutRequestChangePage(event: IStudentDropOutRequestsFilterStudentViewRequestModel) {
    this.studentDropOutRequestFilterRequestModel = event;
    this.getStudentDropOutRequests();
  }

  cancelRequestOfStudent(teacherSubscripModel: IStudentDropOutRequestsFilterResponseModel) {
    this.studentDropOutRequestService.studentDropOutCancelRequest(teacherSubscripModel.id || '').subscribe(res => {
      if (res.isSuccess) {
      
        this.getStudentDropOutRequests();
      }
    },
      error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      });
  }
}
