import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropOutRoleEnum } from 'src/app/core/enums/drop-out-request-enums/drop-out-status.enum';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import {ITeacherStudentViewModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';


@Component({
  selector: 'app-teacher-drop-out-request-admin-card',
  templateUrl: './teacher-drop-out-request-admin-card.component.html',
  styleUrls: ['./teacher-drop-out-request-admin-card.component.scss']
})
export class TeacherDropOutRequestAdminCardComponent implements OnInit {

  @Output() rejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() acceptTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() userIdEvent = new EventEmitter<ITeacherStudentViewModel>();
  @Output() updateAllItemsChecked = new EventEmitter<boolean>();

  @Input() teacherDropOutRequestModel: ITeacherDropOutRequestModel = { totalRows: 0 };

  @Input() typeEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  typeDropOutRequestEnum = TeacherDropOutRequestStatusEnum;

  teacherDropOutRequestIds: string[] | undefined;
  langEnum = LanguageEnum;
  requestDate: string | undefined;
  teacherDropOutRequestStatus = TeacherDropOutRequestStatusEnum;


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    
    if (this.teacherDropOutRequestModel?.requestDate) {
      let requestDateValue = new Date(this.teacherDropOutRequestModel.requestDate || '');

      this.requestDate = new Date(requestDateValue.setDate(requestDateValue.getDate() + 1)).toISOString().slice(0, 10);
    }

    if (!this.teacherDropOutRequestModel?.avatarLink) {
      this.teacherDropOutRequestModel.avatarLink = '../../../../../assets/images/Profile.svg';
    }
  }


  openDetails(id?: string,JoinprogName?:string) {
    let UserModel:ITeacherStudentViewModel ={progName : JoinprogName,usrId:id};
    this.userIdEvent.emit(UserModel);
  }


  rejectTeacherDropOutRequestEvent(teacherDropOutRequestAdminViewModel: ITeacherDropOutRequestModel) {
    this.rejectTeacherDropOutRequest.emit(teacherDropOutRequestAdminViewModel);
  }

  acceptTeacherDropOutRequestEvent() {
    this.acceptTeacherDropOutRequest.emit(this.teacherDropOutRequestModel);
  }
  updateAllItemsCheckedCall(){
    this.updateAllItemsChecked.emit();
  }
}
