import { Component, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStudentDropOutRequestsFilterAdminViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-admin-view-request-model';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentDropOutRequestService } from 'src/app/core/services/student-drop-out-request-services/student-drop-out-request.service';

@Component({
  selector: 'app-admin-student-drop-out',
  templateUrl: './admin-student-drop-out.component.html',
  styleUrls: ['./admin-student-drop-out.component.scss']
})
export class AdminStudentDropOutComponent implements OnInit {


  StudentDropIdInput: ITeacherStudentViewModel | undefined;
  studentDropOutRequestList: IStudentDropOutRequestsFilterResponseModel[] = [];
  studentDropOutRequestFilterRequestModel: IStudentDropOutRequestsFilterAdminViewRequestModel = { statusNum: StudentDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  resultMessage: BaseMessageModel = {};
  totalCount = 0;
  numberItemsPerRow = 3;
  ids?: string[] = [];
  typeEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  showTap: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  statusEnum = StudentDropOutRequestStatusEnum;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Student;
  showUserDetailsView: boolean = false;
  constructor(
    public translate: TranslateService,
    private studentDropOutRequestService: StudentDropOutRequestService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.studentDropOutRequestFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn'
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
        this.resultMessage = {
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
}
