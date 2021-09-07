import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { BasicInformationComponent } from 'src/app/modules/program/components/program-details/programs-tabs/basic-information/basic-information.component';
import { AdminStudentBasicInfoComponent } from './admin-student-basic-info/admin-student-basic-info.component';
import { AdminStudentDropOutComponent } from './admin-student-drop-out/admin-student-drop-out.component';
import { AdminStudentJoinRequestComponent } from './admin-student-join-request/admin-student-join-request.component';
import { AdminStudentVacationRequestComponent } from './admin-student-vacation-request/admin-student-vacation-request.component';

@Component({
  selector: 'app-admin-student-tabs-details',
  templateUrl: './admin-student-tabs-details.component.html',
  styleUrls: ['./admin-student-tabs-details.component.scss']
})
export class AdminStudentTabsDetailsComponent implements OnInit {


  @Output() refreshProgListEvent = new EventEmitter();
  @ViewChild(AdminStudentBasicInfoComponent) adminStudentbasicInfoChild: AdminStudentBasicInfoComponent | undefined;
  @ViewChild(BasicInformationComponent) basicInfoCompChild: BasicInformationComponent | undefined;
  @ViewChild(AdminStudentDropOutComponent) dropOutChild: AdminStudentDropOutComponent | undefined;
  @ViewChild(AdminStudentJoinRequestComponent) joinRequestChild: AdminStudentJoinRequestComponent | undefined;

  @ViewChild(AdminStudentVacationRequestComponent) vacationtRequestChild: AdminStudentVacationRequestComponent | undefined;

  @Input() programModel: IprogramsModel | undefined;

  @Input() studentIdOutput: ITeacherStudentViewModel | undefined;
  @Output() dropOut = new EventEmitter<ITeacherStudentViewModel>();


  programDetails: IProgramDetails | undefined;
  resMessage: BaseMessageModel = {};
  showTap: string = 'BASEINFO';

  constructor(private progService: ProgramService) { }

  ngOnInit(): void {
    // this.getProgramDetails();
    // console.consolelog('teacherIdTabs',this.teacherIdOutput)
    console.log("details", this.studentIdOutput?.usrId)
  }

  ngOnChanges() {
    // this.getProgramDetails();
  }



  refreshProgList() {
    this.refreshProgListEvent.emit();
  }

  viewSwitching() {
    switch (this.showTap) {
      case 'BASEINFO':
        if (this.adminStudentbasicInfoChild) {
          this.adminStudentbasicInfoChild.studentIdOutput = this.studentIdOutput
          this.adminStudentbasicInfoChild.getBasicDetails();
        }
        break;
      case 'PROGRAM':
        break;
      case 'DROP_OUT':

        if (this.dropOutChild) {
          this.dropOutChild.studentIdOutput = this.studentIdOutput
          this.dropOutChild.getStudentDropOutRequests();
        }
        break;
      case 'JOIN':
        if (this.joinRequestChild) {
          this.joinRequestChild.studentIdOutput = this.studentIdOutput
          this.joinRequestChild.getStudentProgramSubscriptionsFilter();
        }
        break;
      case 'VACATION':
        if (this.vacationtRequestChild) {
          this.vacationtRequestChild.studentIdOutput = this.studentIdOutput
          this.vacationtRequestChild.getStudentProgramVacationRequestsStudentView();
        }
        break;
    }
  }


}
