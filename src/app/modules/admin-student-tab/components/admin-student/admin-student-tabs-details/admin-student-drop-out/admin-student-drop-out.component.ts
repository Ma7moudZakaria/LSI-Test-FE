import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { IStudentDropOutRequestsFilterStudentViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-request-model';
import { IStudentDropOutRequestsFilterStudentViewResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-response-model';
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

  @Input() studentIdOutput: ITeacherStudentViewModel | undefined;

  StudentDropIdInput: ITeacherStudentViewModel | undefined;

  studentDropOutRequestList: IStudentDropOutRequestsFilterStudentViewResponseModel[] = [];
  studentDropOutRequestFilterRequestModel: IStudentDropOutRequestsFilterStudentViewRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  resMessage: BaseMessageModel = {};
  resultMessage: BaseMessageModel = {};
  totalCount = 0;
  numberItemsPerRow = 3;
  ids?: string[] = [];
  typeEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  statusEnum = StudentDropOutRequestStatusEnum;
  // userMode: DropOutRoleEnum = DropOutRoleEnum.Student;
  userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.student;
  showTap: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  showUserDetailsView: boolean = false;
  constructor(
    public translate: TranslateService,
    private studentDropOutRequestService: StudentDropOutRequestService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.studentDropOutRequestFilterRequestModel.sortField = 'requestdate'
    this.getStudentDropOutRequests();
  }




  getStudentDropOutRequests() {
    this.studentDropOutRequestFilterRequestModel.usrId = this.studentIdOutput?.usrId
    // console.log('idddd' + this.studentDropOutRequestFilterRequestModel.usrId);
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

        this.alertify.error(res.message || '');
      }
    },
      error => {
        this.alertify.error(error || '');
      });
  }


  studentDropOutRequestChangePage(event: IStudentDropOutRequestsFilterStudentViewRequestModel) {
    this.studentDropOutRequestFilterRequestModel = event;
    this.getStudentDropOutRequests();
  }

}
