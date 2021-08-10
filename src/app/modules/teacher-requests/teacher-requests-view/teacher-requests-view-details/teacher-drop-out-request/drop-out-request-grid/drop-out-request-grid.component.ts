import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-adv-filter-teacher-view-request-model';
import { ITeacherDropOutRequestTeacherViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-teacher-view-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';

@Component({
  selector: 'app-drop-out-request-grid',
  templateUrl: './drop-out-request-grid.component.html',
  styleUrls: ['./drop-out-request-grid.component.scss']
})
export class DropOutRequestGridComponent implements OnInit {

  @Output() rejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestTeacherViewModel>();
  @Output() advancedSearchEvent = new EventEmitter<ITeacherDropOutRequestAdvFilterTeacherViewRequestModel>();
  // @Output() closeAdvancedSearch = new EventEmitter();
  teacherDropOutRequestList: ITeacherDropOutRequestTeacherViewModel[] = [];
  teacherDropOutRequestFilterRequestModel: ITeacherDropOutRequestAdvFilterTeacherViewRequestModel = { statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  errorMessage?: string;
  totalCount = 0;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Teacher;
  //teacherName:string='';
  constructor(
    public translate: TranslateService,
    private teacherDropOutRequestService: TeacherDropOutRequestService) { }

  ngOnInit(): void {
    this.teacherDropOutRequestFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'teacherNameAr' : 'TeacherNameEn'
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
        this.teacherDropOutRequestList = res.data as ITeacherDropOutRequestTeacherViewModel[];
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
}
