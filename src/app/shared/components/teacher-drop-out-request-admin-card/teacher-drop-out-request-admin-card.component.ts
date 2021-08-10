import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherDropOutRequestAdminViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-admin-view-model';


@Component({
  selector: 'app-teacher-drop-out-request-admin-card',
  templateUrl: './teacher-drop-out-request-admin-card.component.html',
  styleUrls: ['./teacher-drop-out-request-admin-card.component.scss']
})
export class TeacherDropOutRequestAdminCardComponent implements OnInit {

  @Output() rejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestAdminViewModel>();
  @Output() acceptTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestAdminViewModel>();

  @Input() teacherDropOutRequestModel: ITeacherDropOutRequestAdminViewModel = { totalRows : 0};

  @Input() typeEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  typeDropOutRequestEnum = TeacherDropOutRequestStatusEnum;

  teacherDropOutRequestIds:string[] | undefined
  langEnum = LanguageEnum;
  requestDate:string | undefined;

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

  rejectTeacherDropOutRequestEvent(teacherDropOutRequestAdminViewModel:ITeacherDropOutRequestAdminViewModel){
    this.rejectTeacherDropOutRequest.emit(teacherDropOutRequestAdminViewModel);
  }
  
  acceptTeacherDropOutRequestEvent(){
    this.acceptTeacherDropOutRequest.emit(this.teacherDropOutRequestModel);
  }
}
