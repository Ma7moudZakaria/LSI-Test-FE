import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import { ITeacherDropOutRequestTeacherViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-teacher-view-model';

@Component({
  selector: 'app-teacher-drop-out-request-teacher-card',
  templateUrl: './teacher-drop-out-request-teacher-card.component.html',
  styleUrls: ['./teacher-drop-out-request-teacher-card.component.scss']
})
export class TeacherDropOutRequestTeacherCardComponent implements OnInit {

  @Output() rejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() acceptTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestModel>();
  @Output() cancelRequestOfTeacher = new EventEmitter<ITeacherDropOutRequestModel>();

  @Input() teacherDropOutRequestModel: ITeacherDropOutRequestModel = { totalRows: 0 };
  @Input() adminView: boolean = false;

  @Input() typeEnum: TeacherDropOutRequestStatusEnum = TeacherDropOutRequestStatusEnum.Pending;
  // typeDropOutRequestEnum = TeacherDropOutRequestStatusEnum;
  teacherDropOutRequestStatus = TeacherDropOutRequestStatusEnum;
  teacherDropOutRequestIds: string[] | undefined
  langEnum = LanguageEnum;
  requestDate: string | undefined;


  x = 1;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    console.log("teacherDropOutRequestModel" , this.teacherDropOutRequestModel)
    if (this.teacherDropOutRequestModel?.requestDate) {
      let requestDateValue = new Date(this.teacherDropOutRequestModel.requestDate || '');

      this.requestDate = new Date(requestDateValue.setDate(requestDateValue.getDate() + 1)).toISOString().slice(0, 10);
    }

    if (!this.teacherDropOutRequestModel?.avatarLink) {
      this.teacherDropOutRequestModel.avatarLink = '../../../../../assets/images/Profile.svg';
    }
    this.x += 1;
  }

  rejectTeacherDropOutRequestEvent(teacherDropOutRequestAdminViewModel: ITeacherDropOutRequestModel) {
    this.rejectTeacherDropOutRequest.emit(teacherDropOutRequestAdminViewModel);
  }

  acceptTeacherDropOutRequestEvent() {
    this.acceptTeacherDropOutRequest.emit(this.teacherDropOutRequestModel);
  }

  cancelRequestOfTeacherEvent() {
    this.cancelRequestOfTeacher.emit(this.teacherDropOutRequestModel);
  }
}
