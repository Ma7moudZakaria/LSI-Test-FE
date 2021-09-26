import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseResponseModel } from '../../../../../core/ng-model/base-response-model';
import { TranslateService } from '@ngx-translate/core';
import { StudentProgramVacationServicesService } from '../../../../../core/services/student-program-vacation-services/student-program-vacation-services.service';
import { AlertifyService } from '../../../../../core/services/alertify-services/alertify.service';
import { IStudentProgramVacationRequestModel } from '../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-request-model';
import { IUser } from '../../../../../core/interfaces/auth-interfaces/iuser-model';
import { IStudentProgramVacationStudentViewModel } from '../../../../../core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-student-view-model';
import { IStudentPrograms } from '../../../../../core/interfaces/student-program-vacation-interfaces/istudent-programs';
import { IAddNewStudentVacationRequest } from '../../../../../core/interfaces/student-program-vacation-interfaces/iadd-new-student-vacation-request';
import { LanguageEnum } from '../../../../../core/enums/language-enum.enum';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../../../../shared/components/confirm-modal/confirm-modal.component';
import { BaseConstantModel } from '../../../../../core/ng-model/base-constant-model';
import { BaseMessageModel } from '../../../../../core/ng-model/base-message-model';
import { MatDialog } from '@angular/material/dialog';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';

@Component({
  selector: ' app-student-program-vacation-requests',
  templateUrl: './student-program-vacation-requests.component.html',
  styleUrls: ['./student-program-vacation-requests.component.scss']
})
export class StudentProgramVacationRequestsComponent implements OnInit {
  studentProgramVacationRequestsList: IStudentProgramVacationStudentViewModel[] = [];
  totalCount = 0;
  numberItemsPerRow = 3;
  currentUser: IUser | undefined;
  studentProgramVacationFilterRequestModel: IStudentProgramVacationRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  @Input() programModel: IStudentPrograms | undefined;
  userMode: DropOutRoleEnum = DropOutRoleEnum.Student;
  @Output() openStudentProgramVacationAddPopup = new EventEmitter<IAddNewStudentVacationRequest>();

  @Input() filter: IAddNewStudentVacationRequest = {}
  resMessage: BaseMessageModel = {};


  constructor(public translate: TranslateService,
    private programVacationServicesService: StudentProgramVacationServicesService,
    private alertify: AlertifyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.studentProgramVacationFilterRequestModel.stdId = this.currentUser.id;
    this.studentProgramVacationFilterRequestModel.progId = this.programModel?.id;
    this.getStudentProgramVacationRequestsStudentView();
  }
  getStudentProgramVacationRequestsStudentView() {
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
    },
      error => {
        console.log(error);
      });
  }
  searchByText(searchKey: string) {
    this.studentProgramVacationFilterRequestModel.usrName = searchKey;
    this.getStudentProgramVacationRequestsStudentView();
  }

  CancelStudentProgramVacation(studentProgramVacationStudentViewModel: IStudentProgramVacationStudentViewModel) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to Cancel this Vacation Request" : "هل متأكد من الغاء طلب الاجازة";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Cancel The Request' : 'الغاء الطلب ', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.programVacationServicesService.cancelStudentProgramVacation(studentProgramVacationStudentViewModel.id).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(res.message || '');
            this.getStudentProgramVacationRequestsStudentView();
          }
          else {
            this.alertify.error(res.message || '');
          }
        }, error => {
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        });
      }
    });
  }

  TerminateStudentProgramVacation(studentProgramVacationStudentViewModel: IStudentProgramVacationStudentViewModel) {
    this.programVacationServicesService.terminateStudentProgramVacation(studentProgramVacationStudentViewModel.id).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.alertify.success(res.message || '');
        this.getStudentProgramVacationRequestsStudentView();
      }
      else {
        this.alertify.error(res.message || '');
      }
    },
      error => {
        console.log(error);
      });
  }

  openAddStudentVacationNewRequest() {
    this.openStudentProgramVacationAddPopup.emit(this.filter)
  }

  StudentVacationChangePage(event: IStudentProgramVacationRequestModel) {
    this.studentProgramVacationFilterRequestModel = event;
    this.getStudentProgramVacationRequestsStudentView();
  }
}
