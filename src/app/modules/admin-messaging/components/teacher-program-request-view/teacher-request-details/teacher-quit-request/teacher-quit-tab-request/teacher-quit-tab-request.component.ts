import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherDropOutRequestAdvFilterAdminViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-adv-filter-admin-view-request-model';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';

@Component({
  selector: 'app-teacher-quit-tab-request',
  templateUrl: './teacher-quit-tab-request.component.html',
  styleUrls: ['./teacher-quit-tab-request.component.scss']
})
export class TeacherQuitTabRequestComponent implements OnInit {

  @Output() itemTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  @Input() teacherDropOutRequestAdvFilterAdminViewRequestModel: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }

  typeEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  showTap: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending
  statusEnum = TeacherDropOutRequestStatusEnum;
  teacherDropOutRequestAdvFilterAdminViewRequest: ITeacherDropOutRequestModel[] = [];
  totalCount = 0;
  resMessage: BaseMessageModel = {};
  listOfIds: string[] | undefined;

  constructor(
    private teacherDropOutRequestService: TeacherDropOutRequestService,
    public languageService: LanguageService,
    public translate: TranslateService,
    private alertify: AlertifyService) { }

    ngOnInit(): void {
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'userNameAr' : 'UserNameEn';    
      this.setCurrentLang();
      this.onPendingChange()
    }

    setCurrentLang() {
      this.emitHeaderTitle();
      this.languageService.currentLanguageEvent.subscribe(res => {
        this.emitHeaderTitle();
      });
    }

    emitHeaderTitle() {
      this.languageService.headerPageNameEvent.emit(this.translate.instant('UPDATE_TEACHER_PG.TITLE'));
    }

    getTeacherDropOutRequests() {
      this.teacherDropOutRequestService.teacherDropOutRequestAdvFilterAdminView(this.teacherDropOutRequestAdvFilterAdminViewRequestModel).subscribe(res => {
        if (res.isSuccess) {
          this.teacherDropOutRequestAdvFilterAdminViewRequest = res.data as Array<ITeacherDropOutRequestModel>; 

          this.totalCount = res.count ? res.count : 0;
          if (this.teacherDropOutRequestAdvFilterAdminViewRequestModel.skip > 0 && (!this.teacherDropOutRequestAdvFilterAdminViewRequest || this.teacherDropOutRequestAdvFilterAdminViewRequest.length === 0)) {
            this.teacherDropOutRequestAdvFilterAdminViewRequestModel.page -= 1;
            this.teacherDropOutRequestAdvFilterAdminViewRequestModel.skip = (this.teacherDropOutRequestAdvFilterAdminViewRequestModel.page - 1) * this.teacherDropOutRequestAdvFilterAdminViewRequestModel.take;
            this.getTeacherDropOutRequests();
          }
        }
        else {
          this.resMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      }, error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      });
    }

    onPendingChange() {
      this.showTap = TeacherDropOutRequestStatusEnum.Pending
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Pending;
      this.getTeacherDropOutRequests();
    }

    onAcceptChange() {
      this.showTap = TeacherDropOutRequestStatusEnum.Accept
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Accept;
      this.getTeacherDropOutRequests();
    }

    onRejectedChange() {
      this.showTap = TeacherDropOutRequestStatusEnum.Rejected
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Rejected;
      this.getTeacherDropOutRequests();
    }    

    teacherDropOutRequestsAcceptancePendingChangePage(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Pending;
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel = event;
      this.getTeacherDropOutRequests();
    }

    teacherDropOutRequestsAcceptanceAcceptChangePage(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Accept;
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel = event;
      this.getTeacherDropOutRequests();
    }

    teacherDropOutRequestsAcceptanceRejectedChangePage(event: ITeacherDropOutRequestAdvFilterAdminViewRequestModel) {
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel.statusNum = TeacherDropOutRequestStatusEnum.Rejected;
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel = event;
      this.getTeacherDropOutRequests();
    }

    rejectTeacherTeacherDropOutRequest(event: ITeacherDropOutRequestModel) {
      this.itemTeacherDropOutRequest.emit(event)
      this.getTeacherDropOutRequests();
    }

    ids?: string[] = [];
    acceptTeacherTeacherDropOutRequest(teacherDropOutRequestModel: ITeacherDropOutRequestModel) {
      this.ids?.push(teacherDropOutRequestModel.id || '');
      this.teacherDropOutRequestService.teacherDropOutRequestsAcceptance(this.ids || []).subscribe(res => {
        if (res.isSuccess) {
          this.alertify.success(res.message || '');
          this.getTeacherDropOutRequests();

        }
        else {
          this.alertify.error(res.message || '');
        }
      },
        error => {
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        });
    }

    acceptAllTeacherDropOutRequestsAcceptanceCheched() {
      this.ids = this.teacherDropOutRequestAdvFilterAdminViewRequest?.filter(i => i.checked).map(a => a.id || '')
      this.teacherDropOutRequestService.teacherDropOutRequestsAcceptance(this.ids).subscribe(res => {
        if (res.isSuccess) {
          this.alertify.success(res.message || '');
          this.getTeacherDropOutRequests();
        }
        else {
          this.alertify.error(res.message || '');
        }
      },
        error => {
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        });
    }

    filterByText(searchKey: string) {
      this.teacherDropOutRequestAdvFilterAdminViewRequestModel.name = searchKey;
      this.getTeacherDropOutRequests();
    }
}
