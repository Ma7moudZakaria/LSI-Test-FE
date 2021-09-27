import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LanguageEnum} from '../../../core/enums/language-enum.enum';
import {TranslateService} from '@ngx-translate/core';
import {TeacherAppointmentRequestsEnum} from '../../../core/enums/teacher-appointment-requests-enums/teacher-appointment-requests-enum.enum';
import {ITeachersAppointmentRequestsModel} from '../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-model';
import {ITeacherStudentViewModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-teacher-appointment-request-card',
  templateUrl: './teacher-appointment-request-card.component.html',
  styleUrls: ['./teacher-appointment-request-card.component.scss']
})
export class TeacherAppointmentRequestCardComponent implements OnInit {
  @Output() rejectTeacherAppointmentRequest = new EventEmitter<ITeachersAppointmentRequestsModel>();
  @Output() acceptTeacherAppointmentRequest = new EventEmitter<ITeachersAppointmentRequestsModel>();
  @Input() typeEnum: TeacherAppointmentRequestsEnum = TeacherAppointmentRequestsEnum.Pending;
  @Output() updateAllItemsChecked = new EventEmitter<boolean>();
  tabTypeSelected = TeacherAppointmentRequestsEnum;
  langEnum = LanguageEnum;

  @Input() teacherAppointmentModel: ITeachersAppointmentRequestsModel | undefined ;
  @Output() userIdEvent = new EventEmitter<ITeacherStudentViewModel>();

  constructor(public translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  rejectedTeacherAppointmentReq() {
    this.rejectTeacherAppointmentRequest.emit(this.teacherAppointmentModel);
  }

  acceptTeacherAppointmentReq() {
    this.acceptTeacherAppointmentRequest.emit(this.teacherAppointmentModel);
  }

  updateAllItemsCheckedCall() {
    this.updateAllItemsChecked.emit();
  }
  openDetails(id?: string) {
    let UserModel:ITeacherStudentViewModel ={usrId:id};
    this.userIdEvent.emit(UserModel);
  }
}
