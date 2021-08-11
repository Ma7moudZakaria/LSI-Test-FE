import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IProgramFilterAdvancedRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { ICrateTeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/create-teacher-drop-out-request-model';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-adv-filter-teacher-view-request-model';
import { ITeacherMyProgramsListModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-my-programs-list-model';
import { ITeacherMyProgramsRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-my-programs-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';

@Component({
  selector: 'app-add-drop-out-request',
  templateUrl: './add-drop-out-request.component.html',
  styleUrls: ['./add-drop-out-request.component.scss']
})
export class AddDropOutRequestComponent implements OnInit {

  @Output() closeCreateDropOutOverlay = new EventEmitter<ICrateTeacherDropOutRequestModel>();
  @Input() filter = {} as ICrateTeacherDropOutRequestModel;
  resultMessage: BaseMessageModel = {};
  ProgramsList: ITeacherMyProgramsListModel[] = [];
  programsbyAdvancedFilter: ITeacherMyProgramsRequestModel = {};
  currentUser: IUser | undefined;
  
  
  constructor(
    private programSubscriptionService: TeacherProgramSubscriptionServicesService, 
    private teacherDropOutRequestService: TeacherDropOutRequestService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.getAllProgram();
  }

  closeCreateTeacherDropOutRequest() {
    this.filter.usrId = this.currentUser?.id;
    this.filter.batId = undefined;
    this.filter.rejectReason = undefined;
    this.closeCreateDropOutOverlay.emit(this.filter);
  }

  sendDropOutRequest() {
    this.teacherDropOutRequestService.createTeacherDropOutRequest(this.filter || {}).subscribe(res => {
      if (res.isSuccess) {
       // this.closeCreateDropOutOverlay.emit();
        this.closeCreateTeacherDropOutRequest();
      }
      else{
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
      
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }



  getAllProgram() {
    this.programsbyAdvancedFilter = { teacherId : this.currentUser?.id };
    this.programSubscriptionService.getTeacherPrograms(this.programsbyAdvancedFilter || {}).subscribe(res => {

      if (res.isSuccess) {
        this.ProgramsList = res.data;

        console.log("this.ProgramsList =====> ", this.ProgramsList)
      }
      else {

      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }
}
