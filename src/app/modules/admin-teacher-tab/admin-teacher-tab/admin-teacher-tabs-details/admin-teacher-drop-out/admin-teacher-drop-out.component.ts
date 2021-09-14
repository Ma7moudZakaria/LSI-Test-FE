import { TeacherDropOutRequestStatusEnum } from './../../../../../core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { IStudentDropOutRequestsFilterAdminViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-admin-view-request-model';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { ITeacherDropOutRequestAdvFilterAdminViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-admin-view-request-model';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-teacher-view-request-model';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentDropOutRequestService } from 'src/app/core/services/student-drop-out-request-services/student-drop-out-request.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';

@Component({
  selector: 'app-admin-teacher-drop-out',
  templateUrl: './admin-teacher-drop-out.component.html',
  styleUrls: ['./admin-teacher-drop-out.component.scss']
})
export class AdminTeacherDropOutComponent implements OnInit {
  @Input() teacherIdOutput: ITeacherStudentViewModel | undefined;


  // StudentDropIdInput: ITeacherStudentViewModel | undefined;
  teacherDropOutRequestList: ITeacherDropOutRequestModel[] = [];
  teacherDropOutRequestFilterRequestModel: ITeacherDropOutRequestAdvFilterTeacherViewRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  resMessage: BaseMessageModel = {};

  totalCount = 0;
  numberItemsPerRow = 3;
  ids?: string[] = [];
  typeEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Empty;
  // showTap: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  statusEnum = TeacherDropOutRequestStatusEnum;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Teacher;
  // userMode: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.teacher;
  showUserDetailsView: boolean = false;


  // teacher

  // teacherDropOutRequestFilterRequestModel: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  // teacherDropOutRequestList: ITeacherDropOutRequestModel[] = [];
  constructor(
    public translate: TranslateService,
    private teacherDropOutRequestService: TeacherDropOutRequestService,

    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.teacherDropOutRequestFilterRequestModel.sortField = 'requestdate';
    this.getTeacherDropOutRequests();
  }

  getTeacherDropOutRequests() {
    this.teacherDropOutRequestFilterRequestModel.teacherId = this.teacherIdOutput?.usrId;
    this.teacherDropOutRequestService.teacherDropOutRequestAdvFilterTeacherView(this.teacherDropOutRequestFilterRequestModel).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.teacherDropOutRequestList = res.data as ITeacherDropOutRequestModel[];
        this.totalCount = res.count ? res.count : 0;
        if (this.teacherDropOutRequestFilterRequestModel.skip > 0 && (!this.teacherDropOutRequestList || this.teacherDropOutRequestList.length === 0)) {
          this.teacherDropOutRequestFilterRequestModel.page -= 1;
          this.teacherDropOutRequestFilterRequestModel.skip = (this.teacherDropOutRequestFilterRequestModel.page - 1) * this.teacherDropOutRequestFilterRequestModel.take;
          this.getTeacherDropOutRequests();
        }
      }
      else {
        this.alertify.error(response.message || '');

      }
    },
      error => {
        this.alertify.error(error || '');

      });
  }

  teacherDropOutRequestChangePage(event: ITeacherDropOutRequestAdvFilterTeacherViewRequestModel) {
    this.teacherDropOutRequestFilterRequestModel = event;
    this.getTeacherDropOutRequests();
  }



}
