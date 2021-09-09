import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IProgramDetails } from '../../../../core/interfaces/programs-interfaces/iprogram-details';
import { IprogramsModel } from '../../../../core/interfaces/programs-interfaces/iprograms-model';
import { BaseMessageModel } from '../../../../core/ng-model/base-message-model';
import { ProgramService } from '../../../../core/services/program-services/program.service';
import { ITeacherStudentViewModel } from '../../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AdminTeacherBasicInfoComponent } from './admin-teacher-basic-info/admin-teacher-basic-info.component';
import { AdminTeacherDropOutComponent } from './admin-teacher-drop-out/admin-teacher-drop-out.component';
import { AdminTeacherJoinRequestComponent } from './admin-teacher-join-request/admin-teacher-join-request.component';
import { AdminTeacherProgramComponent } from './admin-teacher-program/admin-teacher-program.component';

@Component({
  selector: 'app-admin-teacher-tabs-details',
  templateUrl: './admin-teacher-tabs-details.component.html',
  styleUrls: ['./admin-teacher-tabs-details.component.scss']
})
export class AdminTeacherTabsDetailsComponent implements OnInit {

  
  @ViewChild(AdminTeacherBasicInfoComponent) adminTeacherbasicInfoChild: AdminTeacherBasicInfoComponent | undefined;
  @ViewChild(AdminTeacherDropOutComponent) dropOutChild: AdminTeacherDropOutComponent | undefined;
  @ViewChild(AdminTeacherJoinRequestComponent) joinRequestChild: AdminTeacherJoinRequestComponent | undefined;
  @ViewChild(AdminTeacherProgramComponent) adminTeacherProgChild: AdminTeacherProgramComponent | undefined;
  
  @Input() programModel: IprogramsModel | undefined;

  @Input() teacherIdOutput: ITeacherStudentViewModel | undefined;


  programDetails: IProgramDetails | undefined;
  resMessage: BaseMessageModel = {};
  showTap: string = 'BASEINFO';

  constructor(private progService: ProgramService) { }

  ngOnInit(): void {

  }

  ngOnChanges() {

  }

  // refreshProgList() {
  //   this.refreshProgListEvent.emit();
  // }

  viewSwitching() {
    switch (this.showTap) {
      case 'BASEINFO':
        if (this.adminTeacherbasicInfoChild) {
          this.adminTeacherbasicInfoChild.teacherIdOutput = this.teacherIdOutput
          this.adminTeacherbasicInfoChild.getBasicDetails();
        }
        break;
      case 'PROGRAM':
        if (this.adminTeacherProgChild && this.adminTeacherProgChild.adminTeacherProgramListComponent?.teacherInfoDetails){
          this.adminTeacherProgChild.teacherIdOutput = this.teacherIdOutput
          this.adminTeacherProgChild.adminTeacherProgramListComponent.teacherInfoDetails = this.teacherIdOutput;
          this.adminTeacherProgChild.adminTeacherProgramListComponent?.getTeacherPrograms();
        }
        break;
      case 'DROP_OUT':

        if (this.dropOutChild) {
          this.dropOutChild.teacherIdOutput = this.teacherIdOutput
          this.dropOutChild.getTeacherDropOutRequests();
        }
        break;
      case 'JOIN':
        if (this.joinRequestChild) {
          this.joinRequestChild.teacherIdOutput = this.teacherIdOutput
          this.joinRequestChild.getStudentProgramSubscriptionsFilter();
        }
        break;
    }
  }


  // getProgramDetails(){
  //   if (this.programModel && this.programModel.id){
  //     this.progService.getProgramDetails(this.programModel?.id || '').subscribe(res => {
  //       if (res.isSuccess) {
  //         this.programDetails = res.data as IProgramDetails;
  //         if (this.basicInfoCompChild && this.basicInfoCompChild.basicInfoDetails)
  //         {
  //           this.basicInfoCompChild.basicInfoDetails = this.programDetails.progBaseInfo;
  //         }
  //
  //         console.log("programTabs ===========>", this.programDetails);
  //       }
  //       else {
  //         this.resMessage =
  //           {
  //             message: res.message,
  //             type: BaseConstantModel.DANGER_TYPE
  //           }
  //       }
  //     }, (error: any) => {
  //       this.resMessage = {
  //         message: error,
  //         type: BaseConstantModel.DANGER_TYPE
  //       }
  //     });
  //   }
  // }

}
