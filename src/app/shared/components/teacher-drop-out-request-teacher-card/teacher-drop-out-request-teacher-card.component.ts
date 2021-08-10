import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherDropOutRequestTeacherViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-teacher-view-model';

@Component({
  selector: 'app-teacher-drop-out-request-teacher-card',
  templateUrl: './teacher-drop-out-request-teacher-card.component.html',
  styleUrls: ['./teacher-drop-out-request-teacher-card.component.scss']
})
export class TeacherDropOutRequestTeacherCardComponent implements OnInit {

  @Output() rejectTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestTeacherViewModel>();
  @Output() acceptTeacherDropOutRequest = new EventEmitter<ITeacherDropOutRequestTeacherViewModel>();

  @Input() teacherDropOutRequestModel: ITeacherDropOutRequestTeacherViewModel = { totalRows : 0};

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
  } 

  rejectTeacherDropOutRequestEvent(teacherDropOutRequestAdminViewModel:ITeacherDropOutRequestTeacherViewModel){
    this.rejectTeacherDropOutRequest.emit(teacherDropOutRequestAdminViewModel);
  }
  
  acceptTeacherDropOutRequestEvent(){
    this.acceptTeacherDropOutRequest.emit(this.teacherDropOutRequestModel);
  }

}
