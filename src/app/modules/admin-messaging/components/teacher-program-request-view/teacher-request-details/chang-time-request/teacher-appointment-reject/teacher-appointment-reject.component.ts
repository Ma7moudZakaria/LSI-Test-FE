import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITeacherAppointmentModel} from '../../../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-model';
import {BaseMessageModel} from '../../../../../../../core/ng-model/base-message-model';
import {AlertifyService} from '../../../../../../../core/services/alertify-services/alertify.service';
import {TeacherAppointmentService} from '../../../../../../../core/services/teacher-appointment-services/teacher-appointment.service';
import {BaseConstantModel} from '../../../../../../../core/ng-model/base-constant-model';
import {IRejectTeacherAppointmentModel} from '../../../../../../../core/interfaces/teacher-appointment-requests-interfaces/ireject-teacher-appointment-model';

@Component({
  selector: 'app-teacher-appointment-reject',
  templateUrl: './teacher-appointment-reject.component.html',
  styleUrls: ['./teacher-appointment-reject.component.scss']
})
export class TeacherAppointmentRejectComponent implements OnInit {
  @Input() itemTeacherAppointmentReq: ITeacherAppointmentModel = {}
  @Output() closeRejectedRequest = new EventEmitter<ITeacherAppointmentModel>();
  resultMessage: BaseMessageModel = {};

  constructor(private alertify: AlertifyService , private teacherAppointmentService: TeacherAppointmentService) { }

  ngOnInit(): void {
  }
  closeRejectRequest() {
    this.closeRejectedRequest.emit();

  }
  saveRejectRequest() {
    let model: IRejectTeacherAppointmentModel = {
      id: this.itemTeacherAppointmentReq.id,
      reasonReject: this.itemTeacherAppointmentReq.rejReason
    }
    if (model.reasonReject) {
      this.teacherAppointmentService.rejectTeacherAvailableTimeRequest(model).subscribe(res => {

        if (res.isSuccess) {
          this.closeRejectRequest();
          this.alertify.success(res.message || '');

        }
        else {
          this.alertify.error(res.message || '');
        }
      }, error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
    }

  }

}
