import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ICrateStudentDropOutRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/icreate-student-drop-out-request-model';
import { IStudentDropOutRequestsFilterStudentViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-request-model';
import { IStudentDropOutRequestsFilterStudentViewResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-response-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { StudentDropOutRequestService } from 'src/app/core/services/student-drop-out-request-services/student-drop-out-request.service';
import { StudentDropOutRequestComponent } from './student-drop-out-request/student-drop-out-request.component';

@Component({
  selector: 'app-user-withdrawal-requests',
  templateUrl: './user-withdrawal-requests.component.html',
  styleUrls: ['./user-withdrawal-requests.component.scss']
})
export class UserWithdrawalRequestsComponent implements OnInit {
  

  showTap: string = 'new_request';
  @ViewChild(StudentDropOutRequestComponent) dropOutRequestGridComponent: StudentDropOutRequestComponent | undefined;
  
  createDropOut = {} as ICrateStudentDropOutRequestModel;
  itemStudentDropOutRequest: IStudentDropOutRequestsFilterStudentViewResponseModel = {};
  openStudentDropOutRequestCreateOverlay: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeCreateStudentDropOutRequestOverlay(event: ICrateStudentDropOutRequestModel) {
    this.openStudentDropOutRequestCreateOverlay = false;
    this.createDropOut = event
    this.dropOutRequestGridComponent?.getStudentDropOutRequests();
  }

  openStudentDropOutRequestCreatePopup(event: ICrateStudentDropOutRequestModel) {
    this.openStudentDropOutRequestCreateOverlay = true;
    this.createDropOut = event

  }
  
  // closeRejectedRequest() {
  //   this.dropOutRequestGridComponent?.getTeacherDropOutRequests();
  // }

  closeOverlay() {
    this.openStudentDropOutRequestCreateOverlay = false;
    this.dropOutRequestGridComponent?.getStudentDropOutRequests();
  }

}
