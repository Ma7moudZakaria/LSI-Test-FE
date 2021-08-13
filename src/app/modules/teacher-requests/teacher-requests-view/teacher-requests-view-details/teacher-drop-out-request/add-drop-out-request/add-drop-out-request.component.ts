import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IProgramFilterAdvancedRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { ICrateTeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/icreate-teacher-drop-out-request-model';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-teacher-view-request-model';
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
  @Input() createDropOut = {} as ICrateTeacherDropOutRequestModel;
  resultMessage: BaseMessageModel = {};
  programsList: ITeacherMyProgramsListModel[] = [];
  programsbyAdvancedFilter: ITeacherMyProgramsRequestModel = {};
  currentUser: IUser | undefined;
  
  
  constructor(
    private programSubscriptionService: TeacherProgramSubscriptionServicesService, 
    private teacherDropOutRequestService: TeacherDropOutRequestService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.createDropOut = {}
    this.getAllProgram();
  }

  closeCreateTeacherDropOutRequest() {
    this.createDropOut.usrId = this.currentUser?.id;
    this.createDropOut.batId = undefined;
    this.createDropOut.rejectReason = undefined;
    this.closeCreateDropOutOverlay.emit();
  }

  sendDropOutRequest() {
    this.createDropOut.usrId = this.currentUser?.id;
    this.teacherDropOutRequestService.createTeacherDropOutRequest(this.createDropOut || {}).subscribe(res => {
      if (res.isSuccess) {
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

      console.log("res =====> ", res)
      if (res.isSuccess) {
        this.programsList = res.data;

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
