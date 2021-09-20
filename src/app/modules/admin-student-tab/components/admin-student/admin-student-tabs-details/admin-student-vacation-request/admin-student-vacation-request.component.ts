import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { IStudentProgramVacationStudentViewModel } from 'src/app/core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-student-view-model';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IStudentProgramVacationRequestModel } from 'src/app/core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-request-model';
import { IStudentPrograms } from 'src/app/core/interfaces/student-program-vacation-interfaces/istudent-programs';
import { IAddNewStudentVacationRequest } from 'src/app/core/interfaces/student-program-vacation-interfaces/iadd-new-student-vacation-request';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { StudentProgramVacationServicesService } from 'src/app/core/services/student-program-vacation-services/student-program-vacation-services.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { StudentProgramVacationStatusEnum } from 'src/app/core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
@Component({
  selector: 'app-admin-student-vacation-request',
  templateUrl: './admin-student-vacation-request.component.html',
  styleUrls: ['./admin-student-vacation-request.component.scss']
})
export class AdminStudentVacationRequestComponent implements OnInit {
  @Input() studentIdOutput: ITeacherStudentViewModel | undefined;

  studentProgramVacationRequestsList: IStudentProgramVacationStudentViewModel[] = [];
  totalCount = 0;
  numberItemsPerRow = 3;
  currentUser: IUser | undefined;
  studentProgramVacationFilterRequestModel: IStudentProgramVacationRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  @Input() programModel: IStudentPrograms | undefined;
  typeEnum: StudentProgramVacationStatusEnum = StudentProgramVacationStatusEnum.Empty;
  statusEnum = StudentProgramVacationStatusEnum;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Student;
  // @Output() openStudentProgramVacationAddPopup = new EventEmitter<IAddNewStudentVacationRequest>();

  @Input() filter: IAddNewStudentVacationRequest = {}
  resMessage: BaseMessageModel = {};


  constructor(public translate: TranslateService,
    private programVacationServicesService: StudentProgramVacationServicesService,
    private alertify: AlertifyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;

    this.getStudentProgramVacationRequestsStudentView();
  }

  getStudentProgramVacationRequestsStudentView() {
    this.studentProgramVacationFilterRequestModel.stdId = this.studentIdOutput?.usrId;
    this.studentProgramVacationFilterRequestModel.progId = this.programModel?.id;

    this.programVacationServicesService.getStudentsProgramsVacationFilterStudentView(this.studentProgramVacationFilterRequestModel || {}).subscribe(res => {
      if (res.isSuccess) {
        this.studentProgramVacationRequestsList = res.data as IStudentProgramVacationStudentViewModel[];
        this.studentProgramVacationRequestsList?.forEach(function (item) {
        });
        this.totalCount = res.count ? res.count : 0;
        if (this.studentProgramVacationFilterRequestModel.skip > 0 && (!this.studentProgramVacationRequestsList || this.studentProgramVacationRequestsList.length === 0)) {
          this.studentProgramVacationFilterRequestModel.page -= 1;
          this.studentProgramVacationFilterRequestModel.skip = (this.studentProgramVacationFilterRequestModel.page - 1) * this.studentProgramVacationFilterRequestModel.take;
          this.getStudentProgramVacationRequestsStudentView();
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
  // searchByText(searchKey: string) {
  //   this.studentProgramVacationFilterRequestModel.usrName = searchKey;
  //   this.getStudentProgramVacationRequestsStudentView();
  // }

  // CancelStudentProgramVacation(studentProgramVacationStudentViewModel: IStudentProgramVacationStudentViewModel) {
  //   const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to Cancel this Vacation Request" : "هل متأكد من الغاء طلب الاجازة";

  //   const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Cancel The Request' : 'الغاء الطلب ', message);

  //   const dialogRef = this.dialog.open(ConfirmModalComponent, {
  //     maxWidth: "400px",
  //     data: dialogData
  //   });
  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     if (dialogResult == true) {
  //       this.programVacationServicesService.cancelStudentProgramVacation(studentProgramVacationStudentViewModel.id).subscribe(res => {
  //         if (res.isSuccess) {
  //           this.alertify.success(res.message || '');
  //           this.getStudentProgramVacationRequestsStudentView();
  //         }
  //         else {
  //           this.alertify.error(res.message || '');
  //         }
  //       }, error => {
  //         this.resMessage = {
  //           message: error,
  //           type: BaseConstantModel.DANGER_TYPE
  //         }
  //       });
  //     }
  //   });
  // }

  // TerminateStudentProgramVacation(studentProgramVacationStudentViewModel: IStudentProgramVacationStudentViewModel) {
  //   this.programVacationServicesService.terminateStudentProgramVacation(studentProgramVacationStudentViewModel.id).subscribe(res => {
  //     var response = <BaseResponseModel>res;
  //     if (response.isSuccess) {
  //       this.alertify.success(res.message || '');
  //       this.getStudentProgramVacationRequestsStudentView();
  //     }
  //     else {
  //       this.alertify.error(res.message || '');
  //     }
  //   },
  //     error => {
  //       this.alertify.error(error || '');
  //     });
  // }

  // openAddStudentVacationNewRequest() {
  //   this.openStudentProgramVacationAddPopup.emit(this.filter)
  // }

  StudentVacationChangePage(event: IStudentProgramVacationRequestModel) {
    this.studentProgramVacationFilterRequestModel = event;
    this.getStudentProgramVacationRequestsStudentView();
  }
}
