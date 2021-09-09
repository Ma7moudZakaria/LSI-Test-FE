import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStudentDropOutRequestsFilterResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-response-model';
import { IStudentDropOutRequestsFilterStudentViewResponseModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-student-view-response-model';

@Component({
  selector: 'app-student-drop-out-request-student-card',
  templateUrl: './student-drop-out-request-student-card.component.html',
  styleUrls: ['./student-drop-out-request-student-card.component.scss']
})
export class StudentDropOutRequestStudentCardComponent implements OnInit {

  @Output() rejectStudentDropOutStudentRequest = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Output() acceptStudentDropOutStudentRequest = new EventEmitter<IStudentDropOutRequestsFilterStudentViewResponseModel>();
  @Output() cancelRequestOfStudent = new EventEmitter<IStudentDropOutRequestsFilterResponseModel>();

  @Input() studentDropOutRequestFilterRequestStudentModel: IStudentDropOutRequestsFilterStudentViewResponseModel = { totalRows: 0 };
  @Input() typeEnum: StudentDropOutRequestStatusEnum = StudentDropOutRequestStatusEnum.Pending;
  @Input() adminView: boolean = false;
  typeDropOutRequestEnum = StudentDropOutRequestStatusEnum;
  StudentDropOutRequestIds: string[] | undefined
  langEnum = LanguageEnum;
  requestDate: string | undefined;
  StudentDropOutRequestStatus = StudentDropOutRequestStatusEnum;


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    if (this.studentDropOutRequestFilterRequestStudentModel?.requestDate) {
      let requestDateValue = new Date(this.studentDropOutRequestFilterRequestStudentModel.requestDate || '');

      this.requestDate = new Date(requestDateValue.setDate(requestDateValue.getDate() + 1)).toISOString().slice(0, 10);
    }
  }

  rejectTeacherDropOutRequestEvent(studentDropOutRequest: IStudentDropOutRequestsFilterStudentViewResponseModel) {
    this.rejectStudentDropOutStudentRequest.emit(studentDropOutRequest);
  }

  acceptTeacherDropOutRequestEvent() {
    this.acceptStudentDropOutStudentRequest.emit(this.studentDropOutRequestFilterRequestStudentModel);
  }

  cancelRequest() {
    // if(this.studentDropOutRequestFilterRequestStudentModel.drpStat != this.StudentDropOutRequestStatus.Accept &&
    //  this.studentDropOutRequestFilterRequestStudentModel.drpStat != this.StudentDropOutRequestStatus.Rejected)
    // {
    //   this.cancelRequestOfStudent.emit(this.studentDropOutRequestFilterRequestStudentModel);
    // }
    this.cancelRequestOfStudent.emit(this.studentDropOutRequestFilterRequestStudentModel);
  }
}
