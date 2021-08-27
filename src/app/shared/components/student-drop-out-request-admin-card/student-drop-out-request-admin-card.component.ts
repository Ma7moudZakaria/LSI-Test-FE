import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import {ITeacherStudentViewModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-student-drop-out-request-admin-card',
  templateUrl: './student-drop-out-request-admin-card.component.html',
  styleUrls: ['./student-drop-out-request-admin-card.component.scss']
})
export class StudentDropOutRequestAdminCardComponent implements OnInit {

  @Output() rejectStudentDropOutAdminRequest = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  @Output() acceptStudentDropOutAdminRequest = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();
  @Output() studentIdToGrid = new EventEmitter<ITeacherStudentViewModel>();
  @Output() updateAllItemsChecked = new EventEmitter<boolean>();

  @Input() studentDropOutRequestFilterRequestAdminModel: IStudentDropOutRequestsFilterResponseModel = { totalRows: 0 };
  @Input() typeEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  typeDropOutRequestEnum = StudentDropOutRequestStatusEnum;

  studentAdminDropOutRequestIds: string[] | undefined
  langEnum = LanguageEnum;
  requestDate: string | undefined;
  studentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum;


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    console.log("studentDropOutRequestFilterRequestAdminModel", this.studentDropOutRequestFilterRequestAdminModel)
    if (this.studentDropOutRequestFilterRequestAdminModel?.requestDate) {
      let requestDateValue = new Date(this.studentDropOutRequestFilterRequestAdminModel.requestDate || '');

      this.requestDate = new Date(requestDateValue.setDate(requestDateValue.getDate() + 1)).toISOString().slice(0, 10);
    }

    if (!this.studentDropOutRequestFilterRequestAdminModel?.avatarLink) {
      this.studentDropOutRequestFilterRequestAdminModel.avatarLink = '../../../../../assets/images/Profile.svg';
    }
  }

  studentDetails(id?: string,JoinedProgName?:string) {
    let UserModel:ITeacherStudentViewModel ={progName : JoinedProgName,usrId:id};
    this.studentIdToGrid.emit(UserModel);
  }
  rejectStudentAdminDropOutRequestEvent(studentAdminDropOutRequest: IStudentDropOutRequestsFilterResponseModel) {
    this.rejectStudentDropOutAdminRequest.emit(studentAdminDropOutRequest);
  }

  acceptStudentAdminDropOutRequestEvent() {
    this.acceptStudentDropOutAdminRequest.emit(this.studentDropOutRequestFilterRequestAdminModel);
  }
  updateAllItemsCheckedCall(){
    this.updateAllItemsChecked.emit(true);
  }
}
