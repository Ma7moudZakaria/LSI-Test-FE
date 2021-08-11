import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseResponseModel} from '../../../../../core/ng-model/base-response-model';
import {TranslateService} from '@ngx-translate/core';
import {StudentProgramVacationServicesService} from '../../../../../core/services/student-program-vacation-services/student-program-vacation-services.service';
import {AlertifyService} from '../../../../../core/services/alertify-services/alertify.service';
import {IStudentProgramVacationRequestModel} from '../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-request-model';
import {IUser} from '../../../../../core/interfaces/auth-interfaces/iuser-model';
import {IStudentProgramVacationStudentViewModel} from '../../../../../core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-student-view-model';
import {IprogramsModel} from '../../../../../core/interfaces/programs-interfaces/iprograms-model';
import {IStudentPrograms} from '../../../../../core/interfaces/student-program-vacation-interfaces/istudent-programs';
import {IStudentProgramVacationModel} from '../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';

@Component({
  selector: 'app-student-program-vacation-requests',
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
  @Output() refreshCardEvent = new EventEmitter<IStudentPrograms>();

  constructor( public translate: TranslateService,
               private programVacationServicesService: StudentProgramVacationServicesService,
               private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.studentProgramVacationFilterRequestModel.stdId = this.currentUser.id;
    this.studentProgramVacationFilterRequestModel.progId = this.programModel?.id;
    this.getStudentProgramVacationRequestsStudentView();
  }
  getStudentProgramVacationRequestsStudentView() {
    this.programVacationServicesService.getStudentsProgramsVacationFilterStudentView(this.studentProgramVacationFilterRequestModel || {}).subscribe(res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {
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
  refreshProgList(){
    this.refreshCardEvent.emit();
  }

}
