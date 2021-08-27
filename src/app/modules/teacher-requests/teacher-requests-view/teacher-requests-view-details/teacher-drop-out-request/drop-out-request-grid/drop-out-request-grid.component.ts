import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ICrateTeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/icreate-teacher-drop-out-request-model';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-teacher-view-request-model';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-drop-out-request-grid',
  templateUrl: './drop-out-request-grid.component.html',
  styleUrls: ['./drop-out-request-grid.component.scss']
})
export class DropOutRequestGridComponent implements OnInit {

  @Output() itemOfRejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() createDropOutOverlayEvent = new EventEmitter<ICrateTeacherDropOutRequestModel>();

  teacherDropOutRequestList: ITeacherDropOutRequestModel[] = [];
  teacherDropOutRequestFilterRequestModel: ITeacherDropOutRequestAdvFilterTeacherViewRequestModel = {  skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  resMessage: BaseMessageModel = {};
  totalCount = 0;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Teacher;
  currentUser: IUser | undefined;
  
  constructor(
    public translate: TranslateService,
    public dialog: MatDialog,
    private teacherDropOutRequestService: TeacherDropOutRequestService) { }

  ngOnInit(): void {
    this.teacherDropOutRequestFilterRequestModel.sortField = this.translate.currentLang === LanguageEnum.ar ? 'teacherNameAr' : 'TeacherNameEn';
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.getTeacherDropOutRequests();
  }

  searchByText(searchKey: string) {
    this.teacherDropOutRequestFilterRequestModel.name = searchKey;
    this.getTeacherDropOutRequests();
  }

  openCreateDropOutRequestOverlay() {
    this.createDropOutOverlayEvent.emit();
  }

  rejectTeacherTeacherDropOutRequestRequestMethod(event: ITeacherDropOutRequestModel) {
    this.itemOfRejectTeacherDropOutRequest.emit(event);
  }

  getTeacherDropOutRequests() {
    this.teacherDropOutRequestFilterRequestModel.teacherId = this.currentUser?.id;
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

  teacherDropOutRequestChangePage(event: ITeacherDropOutRequestAdvFilterTeacherViewRequestModel) {
    this.teacherDropOutRequestFilterRequestModel = event;
    this.getTeacherDropOutRequests();
  }

  cancelRequestOfTeacher(teacherSubscripModel: ITeacherDropOutRequestModel) {
    
      const message =this.translate.currentLang === LanguageEnum.en ?"Are you sure that you want to cancel request":"هل متأكد من إلغاء الطلب";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Cancel Request' : 'إلغاء الطلب', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        
        this.teacherDropOutRequestService.teacherDropOutCancelRequest(teacherSubscripModel.id || '').subscribe(res => {
          if (res.isSuccess) {
          
            this.getTeacherDropOutRequests();
          }
        },
          error => {
            this.resMessage = {
              message: error,
              type: BaseConstantModel.DANGER_TYPE
            }
          });
      }     
    });
  }
}
