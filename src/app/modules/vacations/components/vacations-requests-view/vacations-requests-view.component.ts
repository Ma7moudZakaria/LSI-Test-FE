import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IStudentPrograms} from '../../../../core/interfaces/student-program-vacation-interfaces/istudent-programs';
import {StudentProgramVacationRequestsComponent} from './student-program-vacation-requests/student-program-vacation-requests.component';
import {IStudentProgramVacationRequestModel} from '../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-request-model';
import {IAddNewStudentVacationRequest} from '../../../../core/interfaces/student-program-vacation-interfaces/iadd-new-student-vacation-request';

@Component({
  selector: 'app-vacations-requests-view',
  templateUrl: './vacations-requests-view.component.html',
  styleUrls: ['./vacations-requests-view.component.scss']
})
export class VacationsRequestsViewComponent implements OnInit {
  programModel : IStudentPrograms | undefined;
  @ViewChild(StudentProgramVacationRequestsComponent) studentProgramVacationRequests:StudentProgramVacationRequestsComponent | undefined;
 @Input() studentProgramVacationFilterRequestModel: IStudentProgramVacationRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  openStudentProgramVacation: boolean = false
  filter: IAddNewStudentVacationRequest = { }
  @ViewChild(StudentProgramVacationRequestsComponent) studentVacationRequests: StudentProgramVacationRequestsComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  selectedProgramCallBack(event:IStudentPrograms){
    this.programModel = event;
    if ( this.studentProgramVacationRequests
      && this.studentProgramVacationRequests.studentProgramVacationFilterRequestModel
      && this.studentProgramVacationRequests.studentProgramVacationFilterRequestModel.progId ) {
      this.studentProgramVacationRequests.studentProgramVacationFilterRequestModel.progId = this.programModel?.id

      this.studentProgramVacationRequests?.getStudentProgramVacationRequestsStudentView()
    }
  }

  closeAddStudentVacationRequest(event: IAddNewStudentVacationRequest) {
    this.openStudentProgramVacation = false;
    this.filter = event
    this.studentVacationRequests?.getStudentProgramVacationRequestsStudentView();
  }

  openStudentProgramVacationAddPopup(event: IAddNewStudentVacationRequest) {
    this.openStudentProgramVacation = true;
    this.filter = event

  }
}
