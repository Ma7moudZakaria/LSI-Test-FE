import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IProgramFilterAdvancedRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { ICrateTeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/create-teacher-drop-out-request-model';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-adv-filter-teacher-view-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';

@Component({
  selector: 'app-add-drop-out-request',
  templateUrl: './add-drop-out-request.component.html',
  styleUrls: ['./add-drop-out-request.component.scss']
})
export class AddDropOutRequestComponent implements OnInit {

  @Output() closeAdvancedSearch = new EventEmitter<ITeacherDropOutRequestAdvFilterTeacherViewRequestModel>();
  @Input() filter = {} as ICrateTeacherDropOutRequestModel;
  advancedSearchInputs = {} as ITeacherDropOutRequestAdvFilterTeacherViewRequestModel;
  resultMessage: BaseMessageModel = {};
  ProgramsList: IprogramsModel[] = [];
  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  currentUser: IUser | undefined;
  
  
  constructor(
    private programService: ProgramService, 
    private teacherDropOutRequestService: TeacherDropOutRequestService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.getAllProgram();
  }

  closeStuAdvancedSearch() {
    // this.filter.usrId = this.currentUser?.id;
    // this.filter.batId = '';
    // this.filter.requestNum = undefined
    // this.filter.from = undefined
    // this.filter.to = undefined
    // this.filter.skip = 0
    // this.filter.take = 9
    // this.filter.page = 1
    // this.filter.sortField = '';
    // this.closeAdvancedSearch.emit(this.filter)
  }

  sendDropOutRequest() {
    this.teacherDropOutRequestService.createTeacherDropOutRequest(this.filter || {}).subscribe(res => {

    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }



  getAllProgram() {
    this.programService.getProgramAdvancedFilter(this.programsbyAdvancedFilter || {}).subscribe(res => {

      if (res.isSuccess) {
        this.ProgramsList = res.data;
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
